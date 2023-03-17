import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class ParamService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getParametro(strDescripcion: string) {
        let datos = {
            data: {
                strDescripcion: strDescripcion
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getParametros', datos);
    }
}
