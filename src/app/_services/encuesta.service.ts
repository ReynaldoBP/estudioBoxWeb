import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class EncuestaService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getPregunta(arrayParametros: any) {
        let datos = {
            data: {
                intIdEncuesta: arrayParametros.intIdEncuesta
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiMovil/getPregunta', datos);
    }

    getEncuesta(arrayParametros: any) {
        let datos = {
            data: {
                intIdUsuario: arrayParametros.intIdUsuario,
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
                intIdSucursal: arrayParametros.intIdSucursal
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getDataEncuesta', datos);
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

    editEncuestasRealizadas(idRespuestaCab: string, usuarioCreacion: string) {
        let datos = {
            data: {
                idClienteEncuesta: idRespuestaCab,
                usuarioCreacion: usuarioCreacion
            },
            op: 'editClienteEncuesta',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
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
