import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'app/_services/restaurante.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { ExcelService } from 'app/_services/excel.service';
import swal from 'sweetalert2';
import { EncuestaService } from 'app/_services/encuesta.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-extended-table',
    templateUrl: './publicaciones-list.component.html',
    styleUrls: ['./publicaciones-list.component.scss']
})

export class PublicacionesListComponent implements OnInit {
    date = new Date();
    rows: any
    anioEncuestas: number
    mesEncuestas: number
    monthNames = [
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
    p: number = 1;
    user: any
    permisos: any
    acciones: any
    descripcionOrigin: string
    descripcion: string
    objSelectSucursal: any = null
    objListSucursal: any
    objSelectSucursalUsuarioRes: any
    objListSucursalUsuarioRes: any
    objSelectSucursalUsuarioAdmin: any
    arraySucursal
    estados: any
    estadoFiltro: any
    arrayParametrosSucursal: any = {
        strEstado: "ACTIVO",
        intIdUsuario: ""
    }
    arrayParametrosDataEncuesta: any = {
        intMes: "",
        intAnio: "",
        intIdSucursal: "",
        intIdUsuario: ""
    }
    arrayParametrosRespuestas: any = {
        intIdCltEncuesta: "",
        intIdUsuario: ""
    }
    constructor(private objEncuestaService: EncuestaService,
        private excelService: ExcelService,
        private toastr: ToastrService,
        private objSucursalService: SucursalService) {
        this.rows = []
        toastr.toastrConfig.timeOut = 3000
        this.anioEncuestas = this.date.getFullYear()
        this.mesEncuestas = (this.date.getMonth() + 1)
        this.user = JSON.parse(localStorage.getItem('usuario'))
        this.getPermisos("Data")
        this.descripcionOrigin = "Esta sección le permite ver respuestas individuales así como cada una de las fotos de los platos que sus clientes captaron en el proceso de calificación. Usted como restaurante debe confirmar que el plato o bebida pertenece a su menu. Caso contrario usted tiene la potestad de eliminar esta entrada. Al realizar esto, se elimina la data de encuesta para los cálculos estadísticos y además se eliminan los puntos que el cliente ganó por esta calificación y/o publicación en redes sociales. En caso de eliminar puntos, el cliente recibirá un correo electrónico dando a conocer la eliminación de puntos."
        this.descripcion = "Esta sección le permite ver respuestas individuales así como cada una de las fotos de los platos que sus clientes captaron en el proceso de calificación."
        this.estados = ["ACTIVO", "PENDIENTE", "ELIMINADO"]
        this.estadoFiltro = "ACTIVO"
    }

    ngOnInit() {
        if (this.getAccion('VER')) {
            this.getDataEncuesta()
            this.getSucursales()
        }
    }

    vermas() {
        if (this.descripcion == this.descripcionOrigin) {
            this.descripcion = "Esta sección le permite ver respuestas individuales así como cada una de las fotos de los platos que sus clientes captaron en el proceso de calificación."
        } else {
            this.descripcion = this.descripcionOrigin
        }
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getDataEncuesta() {
        this.rows = []
        if (this.arraySucursal != undefined) {
            this.arrayParametrosDataEncuesta.intIdSucursal = this.objSelectSucursal
        }
        this.arrayParametrosDataEncuesta.intIdUsuario = this.user.intIdUsuario
        this.arrayParametrosDataEncuesta.intMes = this.mesEncuestas.toString()
        this.arrayParametrosDataEncuesta.intAnio = this.anioEncuestas.toString()
        this.objEncuestaService.getDataEncuesta(this.arrayParametrosDataEncuesta)
            .subscribe(
                data => {
                    if (data["intStatus"] == 200) {
                        let datos = data["arrayData"]["resultados"]
                        this.rows = datos.map(item => {
                            let obj = {
                                strFeCreacion: item.strFeCreacion,
                                intIdCliente: item.intIdCliente,
                                strNombreClt: item.strNombreClt,
                                strSucursal: item.strSucursal,
                                strTitulo: item.strTitulo,
                                intIdCltEncuesta: item.intIdCltEncuesta,
                                strEstado: item.strEstado,
                                strPromedio: item.strPromedio,
                                strComentario: item.strComentario,
                                strVisto: 1,
                                strEsmenor3: item.strEsmenor3
                            }
                            return obj
                        })
                    }
                    else {
                        this.toastr.warning(data["strMensaje"], 'Error')
                    }
                },
                error => {

                }
            )
    }

    verPreguntas(objCltEncuesta: any) {
        this.arrayParametrosRespuestas.intIdCltEncuesta = objCltEncuesta.intIdCltEncuesta
        this.arrayParametrosRespuestas.intIdUsuario = this.user.intIdUsuario
        this.objEncuestaService.getRespuesta(this.arrayParametrosRespuestas)
            .subscribe(
                data => {
                    if (data['intStatus'] != 200) {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    } else {
                        let listpreg = data["arrayData"]["resultados"]
                        let list = document.createElement('UL');
                        let tablehtml = "<table class='table table-responsive-md text-center'><tbody>"
                        let tr = ""
                        listpreg.forEach(element => {
                            const listItem = document.createElement('div');
                            listItem.className = "row"

                            let icons = ''
                            for (let index = 0; index < element['RESPUESTA']; index++) {
                                icons += "<i class='fa fa-star font-medium-3 mr-2'></i>"
                            }
                            for (let index = 0; index < element['VALOR'] - element['RESPUESTA']; index++) {
                                icons += "<i class='fa fa-star-o font-medium-3 mr-2'></i>"
                            }
                            listItem.innerHTML = ("<div class='col-md-1'><strong>" +
                                (listpreg.indexOf(element) + 1) +
                                "</strong></div>" +
                                "<div class='col-md-7'>" +
                                element['DESCRIPCION_PREGUNTA'] +
                                "</div>" +
                                "<div class='col-md-4'>" +
                                icons +
                                "</div>");
                            tr += "<tr>" +
                                "<td>" + (listpreg.indexOf(element) + 1) + "</td>" +
                                "<td>" + element['DESCRIPCION_PREGUNTA'] + "</td>" +
                                "<td>" + (element['VALOR'] == null ? '<p style="font-size:12px">' + element['RESPUESTA'] + '</p>' : icons) + "</td>" +
                                "</tr>"
                            list.appendChild(listItem);
                        });
                        tablehtml += (tr + "</table>")
                        swal(
                            {
                                title: objCltEncuesta.strTitulo,
                                html: tablehtml,
                                showConfirmButton: true,
                                width: 900
                            })
                        this.getDataEncuesta()
                    }
                },
                error => {

                }
            )
    }

    getResumenCliente(encuesta: any) {
        this.objEncuestaService.getResumenCliente(encuesta.ID_CLT_ENCUESTA, this.user.intIdUsuario)
            .subscribe(
                data => {
                    let arrayResultado = data['resultado']
                    let objUl = document.createElement('UL');
                    let objTable = "<table class='table table-responsive-md text-center'><tbody>"
                    let tr = ""
                    let strTrEncuesta = ""
                    const objDivClt = document.createElement('div');
                    objDivClt.className = "row"
                    objDivClt.innerHTML = ("<div class='col-md-1'></div>");
                    tr += "<tr>" +
                        "<td><strong><b>Nombres</b></strong></td>" +
                        "<td>" + arrayResultado['CLIENTE'] + "</td>" +
                        "</tr>"
                    tr += "<tr>" +
                        "<td><strong><b>Correo</b></strong></td>" +
                        "<td>" + arrayResultado['CORREO'] + "</td>" +
                        "</tr>"
                    tr += "<tr>" +
                        "<td><strong><b>Edad</b></strong></td>" +
                        "<td>" + arrayResultado['EDAD'] + "</td>" +
                        "</tr>"
                    tr += "<tr>" +
                        "<td><strong><b>Género</b></strong></td>" +
                        "<td>" + arrayResultado['GENERO'] + "</td>" +
                        "</tr>"
                    tr += "<tr>" +
                        "<td><strong><b>Fecha de registro</b></strong></td>" +
                        "<td>" + arrayResultado['FE_REGISTRO'] + "</td>" +
                        "</tr>"
                    tr += "<tr>" +
                        "<td><strong><b>Cant. de encuestas</b></strong></td>" +
                        "<td>" + arrayResultado['NUM_ENCUESTA'] + "</td>" +
                        "</tr>"
                    objUl.appendChild(objDivClt);
                    objTable += (tr + "</table>")
                    objTable += "<table class='table table-responsive-md text-center'><tbody>"
                    strTrEncuesta +=
                        "<tr>" +
                        "<td colspan='4'><strong><b>Historial de calificaciones</b></strong></td>" +
                        "</tr>" +
                        "<tr>" +
                        "<td><strong><b>Sucursal</b></strong></td>" +
                        "<td><strong><b>Fecha</b></strong></td>" +
                        "<td><strong><b>Estado</b></strong></td>" +
                        "<td><strong><b>Promedio</b></strong></td>" +
                        "</tr>"
                    arrayResultado["arrayEncuestas"].forEach(element => {
                        const objDiv = document.createElement('div');
                        objDiv.className = "row"
                        objDiv.innerHTML = ("<div class='col-md-1'></div>");
                        strTrEncuesta += "<tr>" +
                            "<td>" + element['SUCURSAL'] + "</td>" +
                            "<td>" + element['FE_CREACION'] + "</td>" +
                            "<td>" + element['ESTADO'] + "</td>" +
                            "<td>" + element['PROMEDIO'] + "</td>" +
                            "</tr>"
                        objUl.appendChild(objDiv);

                    });
                    objTable += (strTrEncuesta + "</table>")
                    swal(
                        {
                            title: "Información del Cliente",
                            html: objTable,
                            showConfirmButton: true,
                            width: 900
                        })
                    this.getDataEncuesta()
                },
                error => {

                }
            )
    }
    getSucursales() {
        this.arrayParametrosSucursal.intIdUsuario = this.user.intIdUsuario
        this.objSucursalService.getSucursal(this.arrayParametrosSucursal)
            .subscribe(
                data => {
                    this.arraySucursal = data["arraySucursal"]
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
}