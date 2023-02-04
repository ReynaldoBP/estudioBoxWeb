import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class EncuestaService {
    constructor(private http: HttpClient, private globals: Globals) { }

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

    getPreguntas(idEncuesta: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPregunta?idEncuesta=' + idEncuesta);
    }

    getOpciones() {
        return this.http.get(this.globals.host + this.globals.port + '/getOpcionRespuesta?estado=ACTIVO');
    }

    getTotalEncuestaActiva(mes: string, anio: string, intIdUsuario: string, intIdRestaurante: string) {
        let datos = {
            data: {
                strMes: mes,
                strAnio: anio,
                strEstado: 'ACTIVO',
                intIdUsuario: intIdUsuario,
                intIdRestaurante: intIdRestaurante
            },
            op: 'getClienteEncuesta'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getRespuestasPublicaciones(mes: string, anio: string, idusuario: string,intIdSucursal: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getRespuestaDashboard?strAnio=' + anio + '&strMes=' + mes + '&conImagen=NO&id_usuario=' + idusuario+ '&intIdSucursal=' + intIdSucursal);
    }

    getRespuestasPublicacionesById(id: string, mes: string, anio: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getRespuestaDashboard?intIdCltEncuesta=' + id + '&conImagen=SI&strAnio=' + anio + '&strMes=' + mes);
    }

    getRespuestas(id: string, usuarioCreacion: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getRespuesta?idCltEncuesta=' + id +'&usuarioCreacion=' +usuarioCreacion);
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

    editSucursalEncuestasRealizadas(intIdClienteEncuesta: string,intIdSucursal: string, usuarioCreacion: string) {
        let datos = {
            data: {
                intIdClienteEncuesta: intIdClienteEncuesta,
                intIdSucursal:intIdSucursal,
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

    getTotalEncuestaMensual(intIdUsuario: string, intIdRestaurante: string) {
        let datos = {
            data: {
                strLimite: "6",
                strEstado: "ACTIVO",
                intIdUsuario: intIdUsuario,
                intIdRestaurante: intIdRestaurante
            },
            op: 'getClienteEncuestaSemestral',
            user: ''
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getTotalEncuestaSemanal(intIdUsuario: string, intIdRestaurante: string) {
        let datos = {
            data: {
                strLimite: "2",
                strEstado: "ACTIVO",
                intIdUsuario: intIdUsuario,
                intIdRestaurante: intIdRestaurante
            },
            op: 'getClienteEncuestaSemanal'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getRedesSocialMensual(strMes: string, strAnio: string, intIdUsuario: string, intIdRestaurante: string) {
        let datos = {
            data: {
                strMes: strMes,
                strAnio: strAnio,
                intIdUsuario: intIdUsuario,
                intIdRestaurante: intIdRestaurante
            },
            op: 'getRedesSocialMensual'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getClienteGenero(mes: string, anio: string, intIdUsuario: string, intIdRestaurante: string) {
        let datos = {
            data: {
                strMes: mes,
                strAnio: anio,
                intIdUsuario: intIdUsuario,
                intIdRestaurante: intIdRestaurante
            },
            op: 'getClienteGenero'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getClienteEdad(mes: string, anio: string, intIdUsuario: string, intIdRestaurante: string) {
        let datos = {
            data: {
                strMes: mes,
                strAnio: anio,
                intIdUsuario: intIdUsuario,
                intIdRestaurante: intIdRestaurante
            },
            op: 'getClienteEdad'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
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
