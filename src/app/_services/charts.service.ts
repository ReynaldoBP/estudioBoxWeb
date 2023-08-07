import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class ChartsService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getPreguntasEncuestaActiva(arrayParametros: any) {
        let datos = {
            data: {
                strFechaIni: arrayParametros.strFechaInicio,
                strFechaFin: arrayParametros.strFechaFin,
                strGenero: arrayParametros.strGenero,
                strHorario: arrayParametros.strHorario,
                strEdad: arrayParametros.strEdad,
                intIdUsuario: arrayParametros.intIdUsuario,
                intIdSucursal: arrayParametros.intIdSucursal,
                intIdArea: arrayParametros.intIdArea
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getResultadoProEncuesta', datos);
    }

    getResultadoProPregunta(arrayParametros: any) {
        let datos = {
            data: {
                strGenero: arrayParametros.strGenero,
                strHorario: arrayParametros.strHorario,
                strEdad: arrayParametros.strEdad,
                intLimite: arrayParametros.intLimite,
                arrayPregunta: arrayParametros.arrayPregunta,
                intIdPregunta: arrayParametros.intIdPregunta,
                intIdUsuario: arrayParametros.intIdUsuario,
                intIdSucursal: arrayParametros.intIdSucursal,
                intIdArea:arrayParametros.intIdArea,
                intIdEncuesta:arrayParametros.intIdEncuesta,
                arrayMes:arrayParametros.arrayMes
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getResultadoProPregunta', datos);
    }

    getResultadoProIPN(arrayParametros: any) {
        let datos = {
            data: {
                strFechaInicio: arrayParametros.strFechaInicio,
                strFechaFin: arrayParametros.strFechaFin,
                strGenero: arrayParametros.strGenero,
                strHorario: arrayParametros.strHorario,
                strEdad: arrayParametros.strEdad,
                intIdUsuario: arrayParametros.intIdUsuario,
                intIdEmpresa: arrayParametros.intIdEmpresa,
                intIdSucursal: arrayParametros.intIdSucursal,
                intIdArea:arrayParametros.intIdArea
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getResultadoProIPN', datos);
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
