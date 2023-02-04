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
    objListSucursalUsuarioAdmin
    estados: any
    estadoFiltro: any
    constructor(private encuestaService: EncuestaService,
        private excelService: ExcelService,
        private toastr: ToastrService,
        private sucursalService: SucursalService) {
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
            this.getRepuestasPublicaciones()
            if (this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
                this.getSucursales()
            }
            else if (this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE" || this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE GERENCIA") {
                this.getSucursalesbyUsuario(this.user.ID_USUARIO)
            }
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

    getRepuestasPublicaciones() {
        this.rows = []
        let intIdSucursal = ""
        if (this.objSelectSucursalUsuarioAdmin != undefined && this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
            intIdSucursal = this.objSelectSucursalUsuarioAdmin
        }
        if (this.objSelectSucursalUsuarioRes != undefined && (this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE" || this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE GERENCIA")) {
            intIdSucursal = this.objSelectSucursalUsuarioRes
        }
        this.encuestaService.getRespuestasPublicaciones(this.mesEncuestas.toString(), this.anioEncuestas.toString(), this.user.ID_USUARIO, intIdSucursal)
            .subscribe(
                data => {
                    let datos = data['resultado']['resultados']
                    this.rows = datos.map(item => {
                        let obj = {
                            RED_SOCIAL: item.RED_SOCIAL,
                            FE_CREACION: item.FE_CREACION,
                            CLIENTE_ID: item.CLIENTE_ID,
                            NOMBRE_CLIENTE: item.NOMBRE_CLIENTE,
                            DESCRIPCION: item.DESCRIPCION,
                            TITULO: item.TITULO,
                            IMAGEN: item.IMAGEN,
                            CHECKED: false,
                            ID_CLT_ENCUESTA: item.ID_CLT_ENCUESTA,
                            ESTADO: item.ESTADO,
                            PROMEDIO: item.PROMEDIO,
                            COMENTARIO: item.COMENTARIO,
                            VISTO: item.VISTO,
                            ES_MENOR_3: item.ES_MENOR_3
                        }
                        return obj
                    })
                },
                error => {

                }
            )
    }

    verImagen(item: any) {
        this.encuestaService.getRespuestasPublicacionesById(item.ID_CLT_ENCUESTA, this.mesEncuestas.toString(), this.anioEncuestas.toString())
            .subscribe(
                data => {
                    let datos = data['resultado']['resultados']
                    let src = ''
                    if (datos != null) {
                        src = datos[0].IMAGEN
                        swal({
                            imageUrl: src,
                            width: 900,
                            showConfirmButton: false,
                        });
                    } else {
                        this.toastr.warning("No hay imagen para ese registro")
                    }
                },
                error => {

                }
            )
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
            title: "Quitar Puntos",
            text: "¿Está seguro que desea eliminar los puntos de los registros seleccionados?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar puntos",
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
            arrayOfData.push(this.encuestaService.editEncuestasRealizadas(element.ID_CLT_ENCUESTA, this.user.ID_USUARIO))
        });
        forkJoin(arrayOfData).subscribe(response => {
            swal({ title: "Encuestas", text: "Se han eliminado las encuestas exitosamente!", type: "success", showConfirmButton: true })
                .then((result) => {
                    if (result.value)
                        this.getRepuestasPublicaciones()
                });
        }, error => {
            this.toastr.warning(error, "Error")
        });
    }

    verPreguntas(encuesta: any) {
        this.encuestaService.getRespuestas(encuesta.ID_CLT_ENCUESTA, this.user.ID_USUARIO)
            .subscribe(
                data => {
                    let listpreg = data['resultado']['resultados']
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
                            title: encuesta.TITULO,
                            html: tablehtml,
                            showConfirmButton: true,
                            width: 900
                        })
                    this.getRepuestasPublicaciones()
                },
                error => {

                }
            )
    }
    getResumenCliente(encuesta: any) {
        this.encuestaService.getResumenCliente(encuesta.ID_CLT_ENCUESTA, this.user.ID_USUARIO)
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
                    this.getRepuestasPublicaciones()
                },
                error => {

                }
            )
    }
    getSucursales() {
        this.sucursalService.getSucursalesActivas()
            .subscribe(
                data => {
                    this.objListSucursal = data['resultado']['resultados']
                    this.objListSucursalUsuarioAdmin = data['resultado']['resultados']
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
    getSucursalesbyUsuario(idusuario: string) {
        this.sucursalService.getSucursalesbyUsuario(idusuario)
            .subscribe(
                data => {
                    this.objListSucursalUsuarioRes = data['resultado']['resultados']
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    cambiarSucursal() {
        if (this.objSelectSucursal == null) {
            this.toastr.warning("No ha seleccionado una sucursal", "Datos insuficientes")
            return
        }
        if (this.rows.filter(item => item.CHECKED).length == 0) {
            this.toastr.warning("No ha seleccionado items", "Datos insuficientes")
            return
        }
        let boolValidacionEstado = false
        this.rows.filter(item => item.CHECKED).forEach(element => {
            if (element.ESTADO != "PENDIENTE") {
                boolValidacionEstado = true
            }
        });
        if (boolValidacionEstado) {
            this.toastr.warning("Almenos un registro seleccionado se encuentra en estado Activo o Eliminado.", 'Error')
            return
        }

        swal({
            title: "Cambiar Sucursal",
            text: "¿Está seguro que desea cambiar la sucursal de los registros seleccionados?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sí, cambiar sucursal",
            cancelButtonText: "No, cancelar",
            type: "question"
        }).then(result => {
            if (result.value) {
                this.editSucursal()
            }
        })
    }

    editSucursal() {
        let arrayOfData = [];
        this.rows.filter(item => item.CHECKED).forEach(element => {
            arrayOfData.push(this.encuestaService.editSucursalEncuestasRealizadas(element.ID_CLT_ENCUESTA, this.objSelectSucursal, this.user.ID_USUARIO))
        });
        forkJoin(arrayOfData).subscribe(response => {
            swal({ title: "Encuestas", text: "Se a cambiado la sucursal de las encuestas exitosamente!", type: "success", showConfirmButton: true })
                .then((result) => {
                    if (result.value)
                        this.getRepuestasPublicaciones()
                });
        }, error => {
            this.toastr.warning(error, "Error")
        });
    }

    editarEstadoPunto() {
        if (this.rows.filter(item => item.CHECKED).length == 0) {
            this.toastr.warning("No ha seleccionado items", "Datos insuficientes")
            return
        }
        let boolValidacionEstado = false
        this.rows.filter(item => item.CHECKED).forEach(element => {
            if (element.ESTADO != "ELIMINADO") {
                boolValidacionEstado = true
            }
        });
        if (boolValidacionEstado) {
            this.toastr.warning("Almenos un registro seleccionado se encuentra en estado Activo o Pendiente.", 'Error')
            return
        }
        swal({
            title: "Editar Puntos",
            text: "¿Está seguro que desea editar el estado de los puntos en los registros seleccionados?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sí, editar puntos",
            cancelButtonText: "No, cancelar",
            type: "question"
        }).then(result => {
            if (result.value) {
                let arrayOfData = [];
                this.rows.filter(item => item.CHECKED).forEach(element => {
                    arrayOfData.push(this.encuestaService.editEstadoEncuestasRealizadas(element.ID_CLT_ENCUESTA, this.user.ID_USUARIO))
                });
                forkJoin(arrayOfData).subscribe(response => {
                    swal({ title: "Encuestas", text: "Se a editado el estado de los puntos en las encuestas exitosamente!", type: "success", showConfirmButton: true })
                        .then((result) => {
                            if (result.value)
                                this.getRepuestasPublicaciones()
                        });
                }, error => {
                    this.toastr.warning(error, "Error")
                });
            }
        })
    }
}