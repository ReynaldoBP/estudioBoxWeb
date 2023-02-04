import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class ChartsService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getPreguntasEncuestaActiva(params: any, idusuario: string) {
        let datos = {
            data: {
                strFechaIni: params.fechaInicio,
                strFechaFin: params.fechaFin,
                strGenero: params.genero,
                strHorario: params.horario,
                strEdad: params.edad,
                strPais: params.pais,
                strCiudad: params.ciudad,
                strProvincia: params.provincia,
                strParroquia: params.parroquia,
                id_usuario: idusuario,
                intIdSucursal: params.intIdSucursal
            },
            op: 'getResultadoProEncuesta',
            user: ''
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getPreguntasPromedio(params: any, idusuario: string) {
        let datos = {
            data: {
                strGenero: params.genero,
                strHorario: params.horario,
                strEdad: params.edad,
                strPais: params.pais,
                strCiudad: params.ciudad,
                strProvincia: params.provincia,
                strParroquia: params.parroquia,
                intLimite: params.limite,
                intIdPregunta: params.pregunta.ID_PREGUNTA,
                id_usuario: idusuario,
                intIdSucursal: params.intIdSucursal
            },
            op: 'getResultadoProPregunta',
            user: ''
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getPublicacionesPromedio(params: any, idusuario: string) {
        let datos = {
            data: {
                strGenero: params.genero,
                strHorario: params.horario,
                strEdad: params.edad,
                strPais: params.pais,
                strCiudad: params.ciudad,
                strProvincia: params.provincia,
                strParroquia: params.parroquia,
                intLimite: params.limite,
                id_usuario: idusuario
            },
            op: 'getResultadoProPublicaciones',
            user: ''
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getIPN(params: any, idusuario: string) {
        let datos = {
            data: {
                strFechaIni: params.fechaInicio,
                strFechaFin: params.fechaFin,
                strGenero: params.genero,
                strHorario: params.horario,
                strEdad: params.edad,
                strPais: params.pais,
                strCiudad: params.ciudad,
                strProvincia: params.provincia,
                strParroquia: params.parroquia,
                id_usuario: idusuario,
                intIdRestaurante: params.restaurante,
                intIdSucursal: params.intIdSucursal
            },
            op: 'getResultadosProIPN',
            user: ''
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getPromedioClt(objParametros: any, intIdusuario: string) {
        let datos = {
            data: {
                strEstado: objParametros.strEstado,
                strMes: objParametros.strMes,
                strAnio: objParametros.strAnio,
                intIdusuario: intIdusuario
            },
            op: 'getPromedioRegistrosClt'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getComparativosRestaurantes(params: any) {
        let datos = {
            data: {
                intIdRestaurante: params.idrestaurante,
                intIdTipoComida: params.idtipocomida,
                strPais: params.pais,
                strCiudad: params.ciudad,
                strProvincia: params.provincia,
                strParroquia: params.parroquia,
                intLimite: params.limite
            },
            op: 'getComparativosRestaurantes',
            user: ''
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getVistasPublicidades(params: any, idusuario: string) {
        let datos = {
            data: {
                strFechaIni: params.fechaInicio,
                strFechaFin: params.fechaFin,
                strGenero: params.criterio == 'GENERO' ? 'SI' : '',
                strEdad: params.criterio == 'EDAD' ? 'SI' : '',
                strGlobal: params.criterio == 'GLOBAL' ? 'SI' : '',
                id_usuario: idusuario
            },
            op: 'getVistasPublicidades',
            user: ''
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
}
