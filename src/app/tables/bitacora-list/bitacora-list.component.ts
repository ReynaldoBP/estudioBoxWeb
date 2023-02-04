import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/_services/usuario.service';
import { BitacoraService } from 'app/_services/bitacora.service';
import swal from 'sweetalert2';
@Component({
    selector: 'app-extended-table',
    templateUrl: './bitacora-list.component.html',
    styleUrls: ['./bitacora-list.component.scss']
})

export class BitacoraListComponent implements OnInit {

    rows: any
    permisos: any
    acciones: any
    objUsuario: any
    descripcionBitacora: any
    strFechaIni: any
    strFechaFin: any
    constructor(private bitacoraService: BitacoraService) {
        this.rows = []
        this.getPermisos("Mant/Bitacora")
        this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
    }

    ngOnInit() {

        if (this.getAccion('VER')) {
            this.getBitacora()
        }
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getBitacora() {
        this.bitacoraService.getBitacora(this.strFechaIni, this.strFechaFin)
            .subscribe(
                data => {
                    this.rows = data['resultado']['resultados']
                },
                error => {
                }
            )
    }
    verDetalle(intIdBitacora: any, strReferencia: any) {
        this.bitacoraService.getBitacoraDetalle(intIdBitacora)
            .subscribe(
                data => {
                    let arrayDetalleBitacora = data['resultado']['resultados']
                    let tablehtml = "<table class='table table-responsive-md text-left'><tbody>"
                    let tr = ""
                    let trCab = "<tr>" +
                        "<td><strong>Referencia</strong></td>" +
                        "<td colspan = \"2\"><strong>" + strReferencia + "</strong></td>" +
                        "</tr>";
                    trCab += "<tr>" +
                        "<td><strong>Campo</strong></td>" +
                        "<td><strong>Valor Anterior</strong></td>" +
                        "<td><strong>Valor Actual</strong></td>" +
                        "</tr>";
                    arrayDetalleBitacora.forEach(arrayItem => {
                        const listItem = document.createElement('div');
                        listItem.className = "row"
                        if (arrayItem["CAMPO"] == "Foto") {
                            tr += "<tr>" +
                                "<td>" + arrayItem["CAMPO"] + "</td>" +
                                "<td><img src=" + arrayItem["VALOR_ANTERIOR"] + " width= \"150\"></td>" +
                                "<td>" + arrayItem["VALOR_ACTUAL"] + "</td>" +
                                "</tr>";
                        }
                        else {
                            tr += "<tr>" +
                                "<td>" + arrayItem["CAMPO"] + "</td>" +
                                "<td>" + arrayItem["VALOR_ANTERIOR"] + "</td>" +
                                "<td>" + arrayItem["VALOR_ACTUAL"] + "</td>" +
                                "</tr>";
                        }
                    });
                    tablehtml += (trCab + tr + "</table>")
                    swal(
                        {
                            title: "Historial de cambios",
                            html: tablehtml,
                            width: 900
                        })
                },
                error => {

                })
    }
}