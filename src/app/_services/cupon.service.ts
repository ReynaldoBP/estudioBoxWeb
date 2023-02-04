import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class CuponService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getCupon(strIdCupon: string, strUsuarioCreacion: string) {
        let datos = {
            data: {
                strIdCupon: strIdCupon,
                strUsuarioCreacion: strUsuarioCreacion
            },
            op: 'getCupon'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getCuponPorTipo(strDescripcionTipo: string,strVerCuponAsignado: string, strUsuarioCreacion: string) {
        let datos = {
            data: {
                strDescripcionTipo: strDescripcionTipo,
                strVerCuponAsignado: strVerCuponAsignado,
                strUsuarioCreacion: strUsuarioCreacion
            },
            op: 'getCupon'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getTipoCupon() {
        let datos = {
            data: {
            },
            op: 'getTipoCupon'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    create(objCupon: any, strUsuarioCreacion: string) {
        let datos = {
            data: {
                strDescripcion: objCupon.strDescripcion,
                strEstado: objCupon.strEstado,
                strRestaurante: objCupon.strRestaurante,
                strTipoCupon: objCupon.strTipoCupon,
                strValor: objCupon.strValor,
                strPrecio: objCupon.strPrecio,
                strDiaVigente: objCupon.strDiaVigente,
                strImagen: objCupon.strImagen,
                strUsuarioCreacion: strUsuarioCreacion
            },
            op: 'createCupon'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    edit(objCupon: any, strUsuarioCreacion: string) {
        let datos = {
            data: {
                strIdcupon: objCupon.strIdcupon,
                strDescripcion: objCupon.strDescripcion,
                strEstado: objCupon.strEstado,
                strRestaurante: objCupon.strRestaurante,
                strTipoCupon: objCupon.strTipoCupon,
                strValor: objCupon.strValor,
                strPrecio: objCupon.strPrecio,
                strDiaVigente: objCupon.strDiaVigente,
                strImagen: objCupon.strImagen,
                strUsuarioCreacion: strUsuarioCreacion
            },
            op: 'editCupon'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
}
