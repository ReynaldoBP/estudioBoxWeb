import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient, private globals: Globals) { }
    getLogin(login: any) {
        let datos = {
            data: {
                strCorreo: login.strCorreo,
                strContrasenia: login.strContrasenia
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getLogin', datos);
    }

}
