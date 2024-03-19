import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'app/_services/restaurante.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { AreaService } from 'app/_services/area.service';
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
    objLoading: any = false;
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
    intPagina: number = 1;
    intLimiteRegistros: number = 10;
    intTotalRegistros: number = 0;
    user: any
    permisos: any
    acciones: any
    descripcionOrigin: string
    descripcion: string
    objSelectSucursal: any = null
    objSelectArea: any = null
    objListSucursal: any
    arraySucursal
    arrayArea
    estados: any
    estadoFiltro: any
    arrayParametrosSucursal: any = {
        strEstado: "ACTIVO",
        intIdUsuario: ""
    }
    arrayParametrosArea: any = {
        strEstado: "ACTIVO",
        intIdUsuario: "",
        intIdSucursal: ""
    }
    objSelectPregunta: any = null
    arrayEncuestas
    objSelectEncuesta: any = null
    arraySelectSucursal: any[] = []
    arrayParametrosEncuestas: any = {
        intIdSucursal: '',
        arrayIdSucursal: [],
        intIdArea: "",
        strArea: "",
        intIdUsuario: '',
        intLimite: '',
        arrayPregunta: '',
        intIdPregunta: '',
        strPregunta: '',
        strEdad: '',
        strGenero: '',
        strHorario: '',
        intIdEncuesta: '',
        strEncuesta: '',
        boolAgrupar: "NO",
        strEstadistica: ""
    }
    arrayParametrosPreguntas: any = {
        intIdEncuesta: "",
        strEncuesta: "",
        boolAgrupar: "NO"
    }
    arrayPreguntas: any
    strBuscarRespuesta: any
    arrayParametrosDataEncuesta: any = {
        intMes: "",
        intAnio: "",
        intIdSucursal: "",
        intIdArea: "",
        intIdUsuario: "",
        intPagActual: "",
        intLimitePag: "",
        strBuscarRespuesta: ""
    }
    arrayParametrosRespuestas: any = {
        intIdCltEncuesta: "",
        intIdUsuario: ""
    }
    arrayParametrosDescargarRespuestas: any = {
        intIdCltEncuesta: "",
        intIdUsuario: ""
    }
    arrayParametrosEstadoDataEncuesta: any = {
        intIdCltEncuesta: "",
        strEstado: "ACTIVO",
        intIdUsuario: ""
    }
    constructor(private objEncuestaService: EncuestaService,
        private objExportarDataService: ExcelService,
        private toastr: ToastrService,
        private objSucursalService: SucursalService,
        private objAreaService: AreaService) {
        this.rows = []
        toastr.toastrConfig.timeOut = 3000
        this.anioEncuestas = this.date.getFullYear()
        this.mesEncuestas = (this.date.getMonth() + 1)
        this.user = JSON.parse(localStorage.getItem('usuario'))
        this.getPermisos("Data")
        this.descripcionOrigin = "Esta sección le permite ver respuestas individuales que sus clientes captaron en el proceso de calificación."
        this.descripcion = "Esta sección le permite ver respuestas individuales que sus clientes captaron en el proceso de calificación."
        this.estados = ["ACTIVO", "ELIMINADO"]
        this.estadoFiltro = "ACTIVO"
    }

    ngOnInit() {
        if (this.getAccion('VER')) {
            //this.getDataEncuesta()
            this.getSucursales()
            this.getArea()
        }
        this.arrayParametrosEncuestas.intIdUsuario = this.user.intIdUsuario
    }

    vermas() {
        if (this.descripcion == this.descripcionOrigin) {
            this.descripcion = "Esta sección le permite ver respuestas"
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
        this.objLoading = true
        this.rows = []
        if (this.arraySucursal != undefined) {
            this.arrayParametrosDataEncuesta.intIdSucursal = this.objSelectSucursal
        }
        if (this.arrayArea != undefined) {
            this.arrayParametrosDataEncuesta.intIdArea = this.objSelectArea
        }
        this.arrayParametrosDataEncuesta.intIdUsuario = this.user.intIdUsuario
        this.arrayParametrosDataEncuesta.intMes = this.mesEncuestas.toString()
        this.arrayParametrosDataEncuesta.intAnio = this.anioEncuestas.toString()
        this.arrayParametrosDataEncuesta.intPagActual = this.intPagina
        this.arrayParametrosDataEncuesta.intLimitePag = this.intLimiteRegistros
        if (this.arrayArea != "") {
            this.arrayParametrosDataEncuesta.strRespuesta = this.strBuscarRespuesta
            this.arrayParametrosDataEncuesta.strPregunta = this.objSelectPregunta
        }
        this.objEncuestaService.getDataEncuesta(this.arrayParametrosDataEncuesta)
            .subscribe(
                data => {
                    this.objLoading = false
                    if (data["intStatus"] == 200) {
                        let datos = data["arrayData"]["resultados"]
                        this.intTotalRegistros = data["arrayData"]["totalResultado"]
                        this.rows = datos.map(item => {
                            let obj = {
                                strFeCreacion: item.strFeCreacion,
                                intIdCliente: item.intIdCliente,
                                strNombreClt: item.strNombreClt,
                                strCorreoClt: item.strCorreoClt,
                                strSucursal: item.strSucursal,
                                strArea: item.strArea,
                                strTitulo: item.strTitulo,
                                strPermiteFirma: item.strPermiteFirma,
                                intIdCltEncuesta: item.intIdCltEncuesta,
                                strEstado: item.strEstado,
                                strPromedio: item.strPromedio,
                                strComentario: item.strComentario != null ? item.strComentario : '',
                                strVisto: '0',
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
                    this.objLoading = false
                }
            )
    }
    descargarRespuestas(objCltEncuesta: any) {
        this.objLoading = true
        this.arrayParametrosDescargarRespuestas.intIdCltEncuesta = objCltEncuesta.intIdCltEncuesta
        this.arrayParametrosDescargarRespuestas.intIdUsuario = this.user.intIdUsuario
        this.objEncuestaService.descargarRespuesta(this.arrayParametrosDescargarRespuestas)
            .subscribe(
                data => {
                    this.objLoading = false
                    if (data['intStatus'] != 200) {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    } else {
                        this.objExportarDataService.convertirHtmlaPdf(data["arrayData"])
                    }
                },
                error => {
                    this.objLoading = false
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
    getRespuesta(objCltEncuesta: any) {
        this.objLoading = true
        this.arrayParametrosRespuestas.intIdCltEncuesta = objCltEncuesta.intIdCltEncuesta
        this.arrayParametrosRespuestas.intIdUsuario = this.user.intIdUsuario
        this.objEncuestaService.getRespuesta(this.arrayParametrosRespuestas)
            .subscribe(
                data => {
                    this.objLoading = false
                    if (data['intStatus'] != 200) {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    } else {
                        let listpreg = data["arrayData"]["resultados"]
                        let list = document.createElement('UL');
                        let tablehtml = "<table class='table table-responsive-md text-center'><tbody>"
                            + "<div class='col-md-12' align='left'><strong>Correo del cliente: "
                            + "<a href=\"mailto:" + objCltEncuesta.strCorreoClt + "\">" + objCltEncuesta.strCorreoClt + "</a></strong></div>"
                        let tr = ""
                        listpreg.forEach(element => {
                            const listItem = document.createElement('div');
                            listItem.className = "row"

                            let icons = ''
                            if (element["TIPO_RESPUESTA"] == "CERRADA" && element['VALOR'] != null) {
                                for (let index = 0; index < element['RESPUESTA']; index++) {
                                    console.log(element['RESPUESTA'])
                                    icons += "<i class='fa fa-star font-medium-3 mr-2'></i>"
                                }
                                for (let index = 0; index < element['VALOR'] - element['RESPUESTA']; index++) {
                                    icons += "<i class='fa fa-star-o font-medium-3 mr-2'></i>"
                                }
                            }
                            listItem.innerHTML = ("<div class='col-md-1'><strong>" +
                                //(listpreg.indexOf(element) + 1) +
                                "</strong></div>" +
                                "<div class='col-md-7'align='left'>" +
                                element['DESCRIPCION_PREGUNTA'] +
                                "</div>" +
                                "<div class='col-md-4'>" +
                                icons +
                                "</div>");
                            tr += "<tr>" +
                                // "<td>" + (listpreg.indexOf(element) + 1) + "</td>" +
                                "<td align='left'>" + element['DESCRIPCION_PREGUNTA'] + "</td>" +
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
                        //this.getDataEncuesta()
                    }
                },
                error => {
                    this.objLoading = false
                }
            )
    }

    getResumenCliente(encuesta: any) {
        this.objLoading = true
        this.objEncuestaService.getResumenCliente(encuesta.ID_CLT_ENCUESTA, this.user.intIdUsuario)
            .subscribe(
                data => {
                    this.objLoading = false
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
                    this.objLoading = false
                }
            )
    }
    getSucursales() {
        this.objLoading = true
        this.arrayParametrosSucursal.intIdUsuario = this.user.intIdUsuario
        this.objSucursalService.getSucursal(this.arrayParametrosSucursal)
            .subscribe(
                data => {
                    this.objLoading = false
                    this.arraySucursal = data["arraySucursal"]
                },
                error => {
                    this.objLoading = false
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
    getArea() {
        this.objLoading = true
        if (this.arraySucursal != undefined) {
            this.arrayParametrosArea.intIdSucursal = this.objSelectSucursal
        }
        this.arrayParametrosArea.intIdUsuario = this.user.intIdUsuario
        this.objAreaService.getArea(this.arrayParametrosArea)
            .subscribe(
                data => {
                    this.objLoading = false
                    this.arrayArea = data["arrayArea"]
                },
                error => {
                    this.objLoading = false
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
    getEncuesta() {
        this.objLoading = true
        this.objSelectEncuesta = null
        this.arrayParametrosEncuestas.arrayIdSucursal = []
        this.arrayParametrosEncuestas.intIdArea = ''
        if (this.arraySelectSucursal != undefined) {
            this.arrayParametrosEncuestas.arrayIdSucursal = this.objSelectSucursal
            this.arrayParametrosEncuestas.boolAgrupar = "SI"
        }
        if (this.objSelectArea != undefined) {
            this.arrayParametrosEncuestas.intIdArea = this.objSelectArea
        }
        this.objEncuestaService.getEncuesta(this.arrayParametrosEncuestas).subscribe(
            data => {
                this.objLoading = false
                if (data["intStatus"] == 200) {
                    this.arrayEncuestas = data['arrayEncuesta']
                } else {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            },
            error => {
                this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
            });
    }
    getPregunta() {
        this.objLoading = true
        this.objSelectPregunta = null
        if (this.objSelectEncuesta != undefined) {
            this.arrayParametrosPreguntas.strEncuesta = this.objSelectEncuesta
            this.arrayParametrosPreguntas.boolAgrupar = "SI"
        }
        if (this.arrayParametrosPreguntas.strEncuesta != undefined) {
            this.objEncuestaService.getPregunta(this.arrayParametrosPreguntas).subscribe(
                data => {
                    this.objLoading = false
                    if (data["intStatus"] == 200) {
                        console.log(data['arrayPregunta'])
                        //this.arrayPreguntas = data['arrayPregunta'].filter(item => item.strTipoOpcionRespuesta == "DESPLEGABLE")
                        this.arrayPreguntas = data['arrayPregunta']
                    } else {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {
                    this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
                });
        }
    }
    declinar() {
        if (this.rows.filter(item => item.CHECKED).length == 0) {
            this.toastr.warning("No ha seleccionado items", "Datos insuficientes")
            return
        }
        let boolValidacionEstado = false
        this.rows.filter(item => item.CHECKED).forEach(element => {
            if (element.ESTADO == "ELIMINADO") {
                boolValidacionEstado = true
            }
        });
        if (boolValidacionEstado) {
            this.toastr.warning("Almenos un registro seleccionado se encuentra en estado ELIMINADO.", 'Error')
            return
        }
        swal({
            title: "Eliminar Data Encuesta",
            text: "¿Está seguro que desea eliminar los registros seleccionados?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No, cancelar",
            type: "question"
        }).then(result => {
            if (result.value) {
                this.quitarPuntos()
            }
        })
    }

    quitarPuntos() {
        let arrayOfData = [];
        this.rows.filter(item => item.CHECKED).forEach(element => {
            this.arrayParametrosEstadoDataEncuesta.intIdCltEncuesta = element.intIdCltEncuesta
            this.arrayParametrosEstadoDataEncuesta.intIdUsuario = element.intIdUsuario
            this.arrayParametrosEstadoDataEncuesta.strEstado = "ELIMINADO"
            arrayOfData.push(this.objEncuestaService.editEncuestasRealizadas(this.arrayParametrosEstadoDataEncuesta))
        });
        forkJoin(arrayOfData).subscribe(response => {
            swal({ title: "Encuestas", text: "Se han eliminado las encuestas exitosamente!", type: "success", showConfirmButton: true })
                .then((result) => {
                    if (result.value)
                        this.getDataEncuesta()
                });
        }, error => {
            this.toastr.warning(error, "Error")
        });
    }
    getExportarCsv() {
        this.objLoading = true
        let arrayParametrosEncuestas = {
            "intIdUsuario": this.user.intIdUsuario,
            "boolAgrupar": "SI",
            "intIdSucursal": this.objSelectSucursal,
            "intIdArea": this.objSelectArea
        }
        if(this.objSelectSucursal == null && this.user.strTipoRol == "ADMINISTRADOR")
        {
            this.toastr.warning("Estimado Usuario por favor su ayuda seleccioanndo una sucursal")
            this.objLoading = false
            return
        }
        let arrayEncuestas = []
        this.objEncuestaService.getEncuesta(arrayParametrosEncuestas).subscribe(
            data => {
                if (data["intStatus"] == 200) {
                    arrayEncuestas = data['arrayEncuesta']
                    if (arrayEncuestas.length > 0) {
                        arrayEncuestas.forEach(arrayItem => {
                            let arrayParametrosReporteEncuesta = {
                                "intIdUsuario": this.user.intIdUsuario,
                                "strTitulo": arrayItem.strTitulo,
                                "intMes": this.mesEncuestas.toString(),
                                "intAnio": this.anioEncuestas.toString(),
                                "intIdSucursal": this.objSelectSucursal,
                                "intIdArea": this.objSelectArea
                            }
                            this.objEncuestaService.getReporteDataEncuesta(arrayParametrosReporteEncuesta).subscribe(objReporteData => {
                                this.objLoading = false
                                if (objReporteData["intStatus"] == 200) {
                                    this.objExportarDataService.exportAsExcelFile(objReporteData["arrayData"].resultados, arrayItem.strTitulo)
                                }
                                else {
                                    this.toastr.warning("Error al Generar Reportes")
                                }
                            },
                                error => {
                                    this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
                                })
                        })
                    }
                    else {
                        this.toastr.warning('No existen encuesta para la empresa en sesión', 'Error')
                    }
                } else {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            },
            error => {
                this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
            });
    }
    onPageChange(event: number): void {
        this.intPagina = event;
        this.getDataEncuesta()
    }
}