import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'app/_services/sucursal.service';
import { ExcelService } from 'app/_services/excel.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-extended-table',
    templateUrl: './sucursal-list.component.html',
    styleUrls: ['./sucursal-list.component.scss']
})

export class SucursalListComponent implements OnInit {
    p: number = 1;
    rows: any
    buscaSucursal: any
    user: any
    permisos: any
    acciones: any
    estados: any
    estadoFiltro: any
    constructor(private sucursalService: SucursalService,
        private excelService: ExcelService,
        private toastr: ToastrService) {
        this.rows = []
        this.user = JSON.parse(localStorage.getItem('usuario'))
        this.getPermisos("Mant/Sucursales")
        this.estados = ["ACTIVO", "INACTIVO"]
        this.estadoFiltro = "ACTIVO"
    }

    ngOnInit() {
        if (this.getAccion('VER')) {
            if (this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
                this.getSucursales()
            } else {
                this.getSucursalesporUsuario(this.user.ID_USUARIO)
            }
        }
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getSucursales() {
        this.sucursalService.getSucursales()
            .subscribe(
                data => {
                    if (data['status'] == 204) {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    } else {
                        this.rows = data['resultado']['resultados']
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getSucursalesporUsuario(idusuario: string) {
        this.sucursalService.getSucursalesbyUsuario(idusuario)
            .subscribe(
                data => {
                    if (data['status'] == 204) {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    } else {
                        this.rows = data['resultado']['resultados']
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.rows, 'sucursales_bitte');
    }

    exportAsPDF() {
        var cols = [
            { title: "RESTAURANTE", dataKey: "RAZON_SOCIAL" },
            { title: "SUCURSAL", dataKey: "DESCRIPCION" },
            { title: "CÓDIGO", dataKey: "CODIGO_DIARIO" },
            { title: "NUM. CONTACTO", dataKey: "NUMERO_CONTACTO" },
            { title: "ES MATRIZ", dataKey: "ES_MATRIZ" },
            { title: "ESTADO", dataKey: "ESTADO" }
        ]
        this.excelService.exportAsPdfFile(cols, this.rows, 'sucursales_bitte');
    }


}