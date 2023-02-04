import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class ParamService {
    constructor(private http: HttpClient,private globals: Globals) { }

    getPais() {
        return this.http.get(this.globals.host + this.globals.port +'/getPais');
    }

    getProvincia(idPais:string) {
        return this.http.get(this.globals.host + this.globals.port +'/getProvincia?idPais' + idPais);
    }

    getCiudad(idProvincia:string) {
        return this.http.get(this.globals.host + this.globals.port +'/getCiudad?idProvincia=' + idProvincia);
    }

    getParroquia(idCiudad:string) {
        return this.http.get(this.globals.host + this.globals.port +'/getParroquia?idCiudad=' + idCiudad);
    }

    getParametro(key:string){
        let datos = {
            data:{
                strDescripcion:key
            },
            op:'getParametro',
            user:''
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar',datos);
    }

    /*egresoBodegaSysproLotes(usuario:string,requisicion:string,lotes:string){
        return this.http.post(this.globals.host + ':' + this.globals.port +'/ProyWH_Req/rest/RequisicionService/egresoSyspro/Lotes/' + usuario + '/' + requisicion,lotes);
    }*/
}
