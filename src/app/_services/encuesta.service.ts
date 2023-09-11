import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class EncuestaService {
    constructor(private http: HttpClient, private globals: Globals) { }

    editEncuestasRealizadas(arrayParametros: any) {
        let datos = {
            data: {
                intIdCltEncuesta: arrayParametros.intIdCltEncuesta,
                intIdUsuario: arrayParametros.intIdUsuario,
                strEstado: arrayParametros.strEstado
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/editEncuestasRealizadas', datos);
    }
    getPregunta(arrayParametros: any) {
        let datos = {
            data: {
                intIdEncuesta: arrayParametros.intIdEncuesta,
                strEncuesta: arrayParametros.strEncuesta,
                boolAgrupar: arrayParametros.boolAgrupar
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiMovil/getPregunta', datos);
    }
    createRespuesta(arrayParametros: any) {
        let datos = {
            data: {
                intIdEncuesta: arrayParametros.intIdEncuesta,
                arrayPregunta: arrayParametros.arrayPregunta,
                strUsrSesion: arrayParametros.strUsrSesion,
                strCorreo: arrayParametros.strCorreo,
                strGenero: arrayParametros.strGenero,
                strEdad: arrayParametros.strEdad
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiMovil/createRespuesta', datos);
    }
    getEncuesta(arrayParametros: any) {
        let datos = {
            data: {
                intIdUsuario: arrayParametros.intIdUsuario,
                intIdSucursal: arrayParametros.intIdSucursal,
                arrayIdSucursal: arrayParametros.arrayIdSucursal,
                intIdArea: arrayParametros.intIdArea,
                strArea: arrayParametros.strArea,
                boolAgrupar: arrayParametros.boolAgrupar
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiMovil/getEncuesta', datos);
    }

    getEncuestas(estado: number) {
        switch (estado) {
            case 1:
                return this.http.get(this.globals.host + this.globals.port + '/getEncuesta?estado=ACTIVO');
                break;
            case 2:
                return this.http.get(this.globals.host + this.globals.port + '/getEncuesta?estado=INACTIVO');
                break;
            default:
                return this.http.get(this.globals.host + this.globals.port + '/getEncuesta');
                break;
        }
    }

    getEncuestasById(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getEncuesta?idEncuesta=' + id);
    }

    createEncuesta(encuesta: any, usuarioCreacion: string) {
        return this.http.get(this.globals.host + this.globals.port + '/createEncuesta?' +
            'descripcion=' + encuesta.descripcion +
            '&titulo=' + encuesta.titulo +
            '&estado=' + encuesta.estado +
            '&idRestaurante=' + encuesta.idrestaurante +
            '&usuarioCreacion=' + usuarioCreacion
        );
    }

    editEncuesta(encuesta: any, usuarioCreacion: string) {
        return this.http.get(this.globals.host + this.globals.port + '/editEncuesta?' +
            'idEncuesta=' + encuesta.id +
            '&descripcion=' + encuesta.descripcion +
            '&titulo=' + encuesta.titulo +
            '&estado=' + encuesta.estado +
            '&idRestaurante=' + encuesta.idrestaurante +
            '&usuarioCreacion=' + usuarioCreacion
        );
    }

    createPregunta(pregunta: any, idencuesta: string, usuarioCreacion: string) {
        return this.http.get(this.globals.host + this.globals.port + '/createPregunta?' +
            'descripcion=' + pregunta.pregunta +
            '&obligatoria=' + pregunta.obligatoria +
            '&idOpcionRespuesta=' + pregunta.opciones +
            '&estado=ACTIVO' +
            '&idEncuesta=' + idencuesta +
            '&usuarioCreacion=' + usuarioCreacion +
            '&centroComercial=' + pregunta.cc
        );
    }

    editPregunta(pregunta: any, idencuesta: string, usuarioCreacion: string) {
        return this.http.get(this.globals.host + this.globals.port + '/editPregunta?' +
            'idPregunta=' + pregunta.idpregunta +
            '&descripcion=' + pregunta.pregunta +
            '&obligatoria=' + pregunta.obligatoria +
            '&idOpcionRespuesta=' + pregunta.opciones +
            '&estado=' + pregunta.estado +
            '&idEncuesta=' + idencuesta +
            '&usuarioCreacion=' + usuarioCreacion +
            '&centroComercial=' + pregunta.cc
        );
    }

    getOpciones() {
        return this.http.get(this.globals.host + this.globals.port + '/getOpcionRespuesta?estado=ACTIVO');
    }

    getTotalEncuestaMensual(intMes: string, intAnio: string, intIdUsuario: string, intIdEmpresa: string) {
        let datos = {
            data: {
                intMes: intMes,
                intAnio: intAnio,
                strEstado: 'ACTIVO',
                strBanderaMensual: "SI",
                intIdUsuario: intIdUsuario,
                intIdEmpresa: intIdEmpresa
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getTotalEncuesta', datos);
    }

    getDataEncuesta(arrayParametros: any) {
        let datos = {
            data: {
                intMes: arrayParametros.intMes,
                intAnio: arrayParametros.intAnio,
                intIdUsuario: arrayParametros.intIdUsuario,
                intIdSucursal: arrayParametros.intIdSucursal,
                intIdArea: arrayParametros.intIdArea
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getDataEncuesta', datos);
    }

    getReporteDataEncuesta(arrayParametros: any) {
        let datos = {
            data: {
                intMes: arrayParametros.intMes,
                intAnio: arrayParametros.intAnio,
                intIdUsuario: arrayParametros.intIdUsuario,
                strTitulo: arrayParametros.strTitulo
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getReporteDataEncuesta', datos);
    }

    getReporteEstPorSucursal(arrayParametros: any) {
        let datos = {
            data: {
                strEncuesta: arrayParametros.strEncuesta,
                arrayMes: arrayParametros.arrayMes,
                arraySucursal: arrayParametros.arrayIdSucursal,
                strPregunta: arrayParametros.strPregunta,
                intIdUsuario: arrayParametros.intIdUsuario,
                strGenero: arrayParametros.strGenero,
                strHorario: arrayParametros.strHorario,
                strEdad: arrayParametros.strEdad
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getReporteEstPorSucursal', datos);
    }

    getRespuesta(arrayParametros: any) {
        let datos = {
            data: {
                intIdCltEncuesta: arrayParametros.intIdCltEncuesta,
                intIdUsuario: arrayParametros.intIdUsuario
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getRespuesta', datos);
    }
    getRespuestas(id: string, usuarioCreacion: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getRespuesta?idCltEncuesta=' + id + '&usuarioCreacion=' + usuarioCreacion);
    }

    editSucursalEncuestasRealizadas(intIdClienteEncuesta: string, intIdSucursal: string, usuarioCreacion: string) {
        let datos = {
            data: {
                intIdClienteEncuesta: intIdClienteEncuesta,
                intIdSucursal: intIdSucursal,
                usuarioCreacion: usuarioCreacion
            },
            op: 'editSucursalEncuestasRealizadas'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    editEstadoEncuestasRealizadas(intIdClienteEncuesta: string, usuarioCreacion: string) {
        let datos = {
            data: {
                intIdClienteEncuesta: intIdClienteEncuesta,
                usuarioCreacion: usuarioCreacion
            },
            op: 'editEstadoEncuestasRealizadas'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getTotalEncuestaSemestral(intIdUsuario: string, intIdEmpresa: string) {
        let datos = {
            data: {
                strLimite: "6",
                strEstado: "ACTIVO",
                strBanderaSemestral: "SI",
                intIdUsuario: intIdUsuario,
                intIdEmpresa: intIdEmpresa
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getTotalEncuesta', datos);
    }

    getTotalEncuestaSemanal(intIdUsuario: string, intIdEmpresa: string) {
        let datos = {
            data: {
                intLimite: "2",
                strEstado: "ACTIVO",
                strBanderaSemanal: "SI",
                intIdUsuario: intIdUsuario,
                intIdEmpresa: intIdEmpresa
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getTotalEncuesta', datos);
    }

    getPromedioClteGenero(intMes: string, intAnio: string, intIdUsuario: string, intIdEmpresa: string) {
        let datos = {
            data: {
                intMes: intMes,
                intAnio: intAnio,
                intIdUsuario: intIdUsuario,
                intIdEmpresa: intIdEmpresa
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getPromedioClteGenero', datos);
    }
    getResumenCliente(intIdCltEncuesta: string, strUsuarioCreacion: string) {
        let datos = {
            data: {
                intIdCltEncuesta: intIdCltEncuesta,
                strUsuarioCreacion: strUsuarioCreacion
            },
            op: 'getResumenCliente'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
}
