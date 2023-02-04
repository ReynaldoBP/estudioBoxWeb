import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class BannerService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getBanner(strIdBanner: string, usuarioCreacion: string) {
        let datos = {
            data: {
                strIdBanner: strIdBanner,
                usuarioCreacion: usuarioCreacion
            },
            op: 'getBanner'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    create(objBanner: any, usuarioCreacion: string) {
        let datos = {
            data: {
                strDescripcion: objBanner.strDescripcion,
                strEstado: objBanner.strEstado,
                strImagen: objBanner.strImagen,
                usuarioCreacion: usuarioCreacion
            },
            op: 'createBanner',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    edit(objBanner: any, usuarioCreacion: string) {
        let datos = {
            data: {
                strIdBanner: objBanner.id,
                strDescripcion: objBanner.strDescripcion,
                strEstado: objBanner.strEstado,
                strImagen: objBanner.strImagen
            },
            op: 'editBanner',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
}
