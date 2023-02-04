import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'app/_services/excel.service';
import { CentroComercialService } from 'app/_services/centroComercial.service';

@Component({
    selector: 'app-extended-table',
    templateUrl: './centroComercial-list.component.html',
    styleUrls: ['./centroComercial-list.component.scss']
})

export class CentroComercialListComponent implements OnInit {
    objCentroComercial: any =
        {
            intIdCC: null,
            strNombre: '',
            strDireccion: '',
            strEstado: true,
            strUsuarioCreacion: ''
        }
    arrayResultado: any
    strPermisos: any
    strAcciones: any
    objUsuario: any
    strNombre: any
    arrayEstados: any
    strEstadoFiltro: any
    objArrayExcel: any
    constructor(private objCentroComercialService: CentroComercialService,
        private objServiceExportData: ExcelService,) {
        this.arrayResultado = []
        this.getPermisos("Mant/CentroComercial")
        this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
        this.arrayEstados = ["ACTIVO", "INACTIVO"]
        this.strEstadoFiltro = "ACTIVO"
    }

    ngOnInit() {

        if (this.getAccion('VER')) {
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
        this.objCentroComercial.strUsuarioCreacion = this.objUsuario.ID_USUARIO;
        this.objCentroComercialService.get(this.objCentroComercial)
            .subscribe(
                data => {
                    this.arrayResultado = data['resultado']['resultados']
                    this.objArrayExcel = this.arrayResultado.map(item => {
                        let arrayItem = {
                            NOMBRE: item.strNombre,
                            DIRECCION: item.strDireccion,
                            ESTADO: item.strEstado,
                            FE_CREACION: item.strFeCreacion
                        }
                        return arrayItem
                    })
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
            { title: "NOMBRE", dataKey: "strNombre" },
            { title: "DIRECCION", dataKey: "strDireccion" },
            { title: "ESTADO", dataKey: "strEstado" },
            { title: "FECHA", dataKey: "strFeCreacion" }
        ]
        this.objServiceExportData.exportAsPdfFile(cols, this.arrayResultado, 'centro_comerciales_bitte');
    }
}