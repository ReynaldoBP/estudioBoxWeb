import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/_services/usuario.service';
import { PuntosEstadisticaService } from 'app/_services/puntosEstadistica.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'app/_services/cliente.service';
import { ExcelService } from 'app/_services/excel.service';
import swal from 'sweetalert2';
@Component({
    selector: 'app-extended-table',
    templateUrl: './puntosEstadistica-list.component.html',
    styleUrls: ['./puntosEstadistica-list.component.scss']
})

export class PuntosEstadisticaListComponent implements OnInit {
    date: any = new Date();
    rows: any
    permisos: any
    acciones: any
    objUsuario: any
    intAnio: number = this.date.getFullYear()
    intMes: number = this.date.getMonth() + 1
    arrayMonthNames = [
        { anio: "Enero", numanio: 1 },
        { anio: "Febrero", numanio: 2 },
        { anio: "Marzo", numanio: 3 },
        { anio: "Abril", numanio: 4 },
        { anio: "Mayo", numanio: 5 },
        { anio: "Junio", numanio: 6 },
        { anio: "Julio", numanio: 7 },
        { anio: "Agosto", numanio: 8 },
        { anio: "Septiembre", numanio: 9 },
        { anio: "Octubre", numanio: 10 },
        { anio: "Noviembre", numanio: 11 },
        { anio: "Diciembre", numanio: 12 }
    ];
    objSelectSucursal: any
    objListSucursalUsuarioRes: any
    objListSucursalUsuarioAdmin
    constructor(private objPuntosEstadisticaService: PuntosEstadisticaService,
        private objSucursalService: SucursalService,
        private excelService: ExcelService,
        private toastr: ToastrService, private objCltService: ClienteService) {
        this.rows = []
        this.getPermisos("Reportes")
        this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
    }

    ngOnInit() {
        if (this.getAccion('VER')) {
            this.getPromocionesCanjeada()
        }
        if (this.objUsuario.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
            this.getSucursales()
        }
        else if (this.objUsuario.DESCRIPCION_TIPO_ROL == "RESTAURANTE" || this.objUsuario.DESCRIPCION_TIPO_ROL == "RESTAURANTE GERENCIA") {
            this.getSucursalesbyUsuario(this.objUsuario.ID_USUARIO)
        }
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }


    getPromocionesCanjeada() {
        let intMesFiltro = (this.intMes != undefined) ? this.intMes : (this.date.getMonth() + 1).toString()
        let intAnioFiltro = (this.intAnio != undefined) ? this.intAnio : this.date.getFullYear().toString()
        this.rows = null
        let intIdSucursal = (this.objSelectSucursal != undefined) ? this.objSelectSucursal : ""
        this.objCltService.getPromocionesCliente(null, null, 'COMPLETADO', intMesFiltro, intAnioFiltro, intIdSucursal,this.objUsuario.ID_USUARIO)
            .subscribe(
                data => {
                    let promociones = data['resultado']['resultados']
                    this.rows = promociones.map(item => {
                        let promocion = {
                            CLIENTE: item.CLIENTE,
                            CANTIDAD_PUNTOS: item.CANTIDAD_PUNTOS,
                            DESCRIPCION_TIPO_PROMOCION: item.DESCRIPCION_TIPO_PROMOCION,
                            FE_CREACION: item.FE_CREACION,
                            SUCURSAL: item.SUCURSAL
                        }
                        return promocion
                    })
                },
                error => {
                }
            )
    }

    getSucursales() {
        this.objSucursalService.getSucursalesActivas()
            .subscribe(
                data => {
                    this.objListSucursalUsuarioAdmin = data['resultado']['resultados']
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
    getSucursalesbyUsuario(idusuario: string) {
        this.objSucursalService.getSucursalesbyUsuario(idusuario)
            .subscribe(
                data => {
                    this.objListSucursalUsuarioRes = data['resultado']['resultados']
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
    exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.rows, 'EstadisticaPuntos');
    }

    exportAsPDF() {
        var cols = [
            { title: "CLIENTE", dataKey: "CLIENTE" },
            { title: "CANTIDAD_PUNTOS", dataKey: "CANTIDAD_PUNTOS" },
            { title: "PROMOCION", dataKey: "DESCRIPCION_TIPO_PROMOCION" },
            { title: "FE_CREACION", dataKey: "FE_CREACION" },
            { title: "SUCURSAL", dataKey: "SUCURSAL" }
            
        ]
        this.excelService.exportAsPdfFile(cols, this.rows, 'EstadisticaPuntos');
    }
}