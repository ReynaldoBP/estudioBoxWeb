import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class AreaService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getArea(objParametros: any) {
        let datos = {
            data: {
                strEstado: objParametros.strEstado,
                strContador: objParametros.strContador,
                intIdUsuario: objParametros.intIdUsuario,
                intIdSucursal: objParametros.intIdSucursal,
                arrayIdSucursal: objParametros.arrayIdSucursal,
                boolAgrupar:objParametros.boolAgrupar
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getArea', datos);
    }

}
