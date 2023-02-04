import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class BitacoraService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getBitacoraDetalle(intIdBitacora: string) {
        let datos = {
            data: {
                intIdBitacora: intIdBitacora
            },
            op: 'getBitacoraDetalle'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
    getBitacora(strFechaIni:string,strFechaFin:string) {
        let datos = {
            data: {
                "strFechaIni":strFechaIni,
                "strFechaFin":strFechaFin,
            },
            op: 'getBitacora'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
}
