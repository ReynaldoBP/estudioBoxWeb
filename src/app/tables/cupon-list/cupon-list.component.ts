import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/_services/usuario.service';
import { ExcelService } from 'app/_services/excel.service';
import { CuponService } from 'app/_services/cupon.service';

@Component({
    selector: 'app-extended-table',
    templateUrl: './cupon-list.component.html',
    styleUrls: ['./cupon-list.component.scss']
})

export class CuponListComponent implements OnInit {

    arrayResultado: any
    strPermisos: any
    strAcciones: any
    objUsuario: any
    strFiltroDescripcion: any
    arrayEstados: any
    strEstadoFiltro: any
    objArrayExcel: any
    strDescripcionOrigin: string
    strDescripcion: string
    constructor(private objCuponService: CuponService,
        private objServiceExportData: ExcelService,) {
        this.arrayResultado = []
        this.getPermisos("Mant/Cupon")
        this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
        this.arrayEstados = ["ACTIVO","CANJEADO", "INACTIVO"]
        this.strEstadoFiltro = "ACTIVO"
    }

    ngOnInit() {

        if (this.getAccion('VER')) {
            this.getCupon()
        }
        this.strDescripcionOrigin = ""
        this.strDescripcion = "Listado de cupones que permite canjear diferentes premios de acuerdo al tipo de cupón, para saber más sobre los tipos de cupones, dar click en: "
    }

    getPermisos(strDescModulo: string) {
        this.strPermisos = JSON.parse(localStorage.getItem('permisos'))
        this.strAcciones = this.strPermisos.filter(item => item['DESCRIPCION_MODULO'] == strDescModulo)
    }

    getAccion(strDescAccion: string) {
        return (this.strAcciones.find(item => item['DESCRIPCION_ACCION'] == strDescAccion) != undefined)
    }

    getCupon() {
        this.objCuponService.getCupon(null, this.objUsuario.ID_USUARIO)
            .subscribe(
                data => {
                    this.arrayResultado = data['resultado']['resultados']
                    this.objArrayExcel = this.arrayResultado.map(item => {
                        let arrayItem = {
                            DESCRIPCION: item.strDescripcion,
                            TIPO_CUPON: item.strTipoCupon,
                            VALOR: item.strValor,
                            ESTADO: item.strEstado,
                            RESTAURANTE: item.strRestaurante,
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
        this.objServiceExportData.exportAsExcelFile(this.objArrayExcel, 'cupones_bitte');
    }

    exportAsPDF() {
        var cols = [
            { title: "DESCRIPCION", dataKey: "strDescripcion" },
            { title: "TIPO", dataKey: "strTipoCupon" },
            { title: "VALOR", dataKey: "strValor" },
            { title: "ESTADO", dataKey: "strEstado" },
            { title: "RESTAURANTE", dataKey: "strRestaurante" },
            { title: "FECHA", dataKey: "strFeCreacion" }
        ]
        this.objServiceExportData.exportAsPdfFile(cols, this.arrayResultado, 'cupones_bitte');
    }
    vermas() {
        if (this.strDescripcion == this.strDescripcionOrigin) {
          this.strDescripcion = "Listado de cupones que permite canjear diferentes premios de acuerdo al tipo de cupón, para saber más sobre los tipos de cupones, dar click en: "
        } else {
          this.strDescripcion = this.strDescripcionOrigin
        }
      }
}