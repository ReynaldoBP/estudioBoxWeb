import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class CentroComercialService {
    constructor(private http: HttpClient, private globals: Globals) { }

    get(objCentroComercial: any) {
        let datos = {
            data: {
                intIdCC: objCentroComercial.intIdCC,
                strUsuarioCreacion: objCentroComercial.strUsuarioCreacion
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/getCentroComercial', datos);
    }

    create(objCentroComercial: any) {
        let datos = {
            data: {
                strNombre: objCentroComercial.strNombre,
                strDireccion: objCentroComercial.strDireccion,
                strEstado: objCentroComercial.strEstado,
                strUsuarioCreacion: objCentroComercial.strUsuarioCreacion
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/createCentroComercial', datos);
    }

    edit(objCentroComercial: any) {
        let datos = {
            data: {
                intIdCC: objCentroComercial.intIdCC,
                strNombre: objCentroComercial.strNombre,
                strDireccion: objCentroComercial.strDireccion,
                strEstado: objCentroComercial.strEstado,
                strUsuarioCreacion: objCentroComercial.strUsuarioCreacion
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/editCentroComercial', datos);
    }
}
