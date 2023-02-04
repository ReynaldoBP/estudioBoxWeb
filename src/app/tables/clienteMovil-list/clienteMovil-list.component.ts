import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'app/_services/excel.service';
import { ClienteService } from 'app/_services/cliente.service';

@Component({
    selector: 'app-extended-table',
    templateUrl: './clienteMovil-list.component.html',
    styleUrls: ['./clienteMovil-list.component.scss']
})

export class ClienteMovilListComponent implements OnInit {
    arrayResultado: any
    strPermisos: any
    strAcciones: any
    objUsuario: any
    strNombre: any
    arrayEstados: any
    strEstadoFiltro: any
    arrayTipoCliente: any
    strTipoCltFiltro: any

    objArrayExcel: any
    constructor(private objClienteService: ClienteService,
        private objServiceExportData: ExcelService,) {
        this.arrayResultado = []
        this.arrayTipoCliente = []
        this.strTipoCltFiltro = "CLIENTE"
        this.getPermisos("Mant/UsuarioMovil")
        this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
        this.arrayEstados = ["ACTIVO", "INACTIVO"]
        this.strEstadoFiltro = "ACTIVO"
    }

    ngOnInit() {

        if (this.getAccion('VER')) {
            this.getTipoCliente()
            this.get()
        }
    }

    getPermisos(strDescModulo: string) {
        this.strPermisos = JSON.parse(localStorage.getItem('permisos'))
        this.strAcciones = this.strPermisos.filter(item => item['DESCRIPCION_MODULO'] == strDescModulo)
    }

    getAccion(strDescAccion: string) {
        return (this.strAcciones.find(item => item['DESCRIPCION_ACCION'] == strDescAccion) != undefined)
    }

    get() {
        this.objClienteService.getClientesAdmin()
            .subscribe(
                data => {
                    this.arrayResultado = data['resultado']['resultados']
                    this.objArrayExcel = this.arrayResultado.map(item => {
                        let arrayItem = {
                            NOMBRE: item.NOMBRE_COMPLETO,
                            CORREO: item.CORREO,
                            TIPO_CLIENTE: item.TIPO_CLIENTE,
                            ESTADO: item.ESTADO
                        }
                        return arrayItem
                    })
                },
                error => {

                }
            )
    }

    getTipoCliente() {
        this.objClienteService.getTipoCliente()
            .subscribe(
                data => {
                    this.arrayTipoCliente = data['resultado']['tipoCliente']
                },
                error => {

                }
            )
    }


    exportAsXLSX() {
        this.objServiceExportData.exportAsExcelFile(this.objArrayExcel, 'centro_comerciales_bitte');
    }

    exportAsPDF() {
        var cols = [
            { title: "NOMBRE_COMPLETO", dataKey: "NOMBRE_COMPLETO" },
            { title: "CORREO", dataKey: "CORREO" },
            { title: "TIPO_CLIENTE", dataKey: "TIPO_CLIENTE" },
            { title: "ESTADO", dataKey: "ESTADO" }
        ]
        this.objServiceExportData.exportAsPdfFile(cols, this.arrayResultado, 'centro_comerciales_bitte');
    }
}