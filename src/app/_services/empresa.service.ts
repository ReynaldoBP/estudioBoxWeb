import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class EmpresaService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getEmpresa(objParametrosEmpresa: any) {
        let datos = {
            data: {
                strEstado: objParametrosEmpresa.strEstado,
                strContador: objParametrosEmpresa.strContador,
                intIdCltMovil: objParametrosEmpresa.intIdCltMovil,
                intIdUsuario: objParametrosEmpresa.intIdUsuario
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getEmpresa', datos);
    }
}
