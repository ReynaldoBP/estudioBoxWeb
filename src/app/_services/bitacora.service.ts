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
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getBitacoraDetalle', datos);
    }
    getBitacora(intIdUsuario,strFechaIni:string,strFechaFin:string) {
        let datos = {
            data: {
                "intIdUsuario":intIdUsuario,
                "strFechaIni":strFechaIni,
                "strFechaFin":strFechaFin,
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getBitacora', datos);
    }
}
