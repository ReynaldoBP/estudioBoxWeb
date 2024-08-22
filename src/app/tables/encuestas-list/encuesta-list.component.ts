import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'app/_services/encuesta.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-extended-table',
    templateUrl: './encuesta-list.component.html',
    styleUrls: ['./encuesta-list.component.scss']
})

export class EncuestaListComponent implements OnInit {
    objLoading: any = false;
    user: any
    rows: any
    permisos: any
    acciones: any
    arrayEncuestas: any
    descripcionEncuesta: any
    arrayParametrosEncuestas: any = {
        intIdUsuario: '',
        boolAgrupar: "NO",
    }
    arrayParametrosPreguntas: any = {
        intIdUsuario: '',
        intIdEncuesta: '',
    }
    constructor(private encuestaService: EncuestaService,
        private toastr: ToastrService
    ) {
        this.rows = []
        this.getPermisos("Mant/Encuesta")
        this.user = JSON.parse(localStorage.getItem('usuario'))
    }

    ngOnInit() {
        if (this.getAccion('VER')) {
            this.getEncuesta()
        }
    }

    getEncuesta() {
        this.objLoading = true
        this.arrayParametrosEncuestas.intIdUsuario = this.user.intIdUsuario
        this.encuestaService.getEncuesta(this.arrayParametrosEncuestas)
            .subscribe(
                data => {
                    this.objLoading = false
                    if (data['intStatus'] != 200) {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    } else {
                        this.arrayEncuestas = data["arrayEncuesta"]
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    verPreguntas(objEncuesta: any) {
        this.objLoading = true
        this.arrayParametrosEncuestas.intIdUsuario = this.user.intIdUsuario
        this.arrayParametrosPreguntas.intIdEncuesta = objEncuesta['intIdEncuesta']
        this.encuestaService.getPregunta(this.arrayParametrosPreguntas)
            .subscribe(
                data => {
                    this.objLoading = false
                    let listpreg = data['arrayPregunta']
                    let list = document.createElement('UL');
                    let tablehtml = "<table class='table table-responsive-md text-center'><tbody>"
                    let tr = ""
                    let trTemp = "<td></td>"
                    listpreg.forEach(element => {
                        const listItem = document.createElement('div');
                        listItem.className = "row"

                        let icons = ''
                        for (let index = 0; index < element['intCantidadEstrellas']; index++) {
                            icons += "<i class='ft-star font-medium-3 mr-2'></i>"
                        }
                        if (element['strTipoOpcionRespuesta'] == 'CERRADA') {
                            trTemp = "<td>" + icons + "</td>"
                        }
                        else if (element['strTipoOpcionRespuesta'] == 'ABIERTA') {
                            trTemp = "<td>Comentario</td>"
                        }
                        else if (element['strTipoOpcionRespuesta'] == 'DESPLEGABLE') {
                            trTemp = "<td>" + element['strValorDesplegable'].replaceAll("|", "<br>") + "</td>"
                        }
                        else if (element['strTipoOpcionRespuesta'] == 'CAJA') {
                            trTemp = "<td>" + element['strValorDesplegable'].replaceAll("|", "<br>") + "</td>"
                        }
                        else {
                            trTemp = "<td></td>"
                        }
                        listItem.innerHTML = ("<div class='col-md-8'>" +
                            element['strPregunta'] +
                            "</div>" +
                            "<div class='col-md-4'>" +
                            //element['VALOR_OPCION_RESPUESTA'] + 
                            icons +
                            "</div>");
                        tr += "<tr>" +
                            "<td>" + element['strPregunta'] + "</td>" +
                            trTemp +
                            "</tr>"
                        list.appendChild(listItem);
                    });
                    //"<td>" + (element['intCantidadEstrellas'] == null ? element['strTipoOpcionRespuesta'] : icons) + "</td>" +
                    tablehtml += (tr + "</table>")
                    swal(
                        {
                            title: objEncuesta['strTitulo'],
                            html: tablehtml,
                            showConfirmButton: true,
                            width: 900
                        })
                },
                error => {

                }
            )
    }


}