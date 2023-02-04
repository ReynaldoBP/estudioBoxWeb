import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class TipoComidaService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getTiposComida(estado: number) {
        switch (estado) {
            case 1:
                return this.http.get(this.globals.host + this.globals.port + '/getTipoComida?estado=ACTIVO');
                break;
            case 2:
                return this.http.get(this.globals.host + this.globals.port + '/getTipoComida?estado=INACTIVO');
                break;
            default:
                return this.http.get(this.globals.host + this.globals.port + '/getTipoComida');
                break;
        }
    }

    getTiposComidaById(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getTipoComida?idTipoComida=' + id);
    }

    create(tipoComida: any, usuarioCreacion: string) {
        return this.http.get(this.globals.host + this.globals.port + '/createTipoComida?' +
            'descripcion=' + tipoComida.descripcion +
            '&estado=' + tipoComida.estado +
            '&usuarioCreacion=' + usuarioCreacion
        );
    }

    edit(tipoComida: any, usuarioCreacion: string) {
        return this.http.get(this.globals.host + this.globals.port + '/editTipoComida?' +
            'idTipoComida=' + tipoComida.id +
            '&descripcion=' + tipoComida.descripcion +
            '&estado=' + tipoComida.estado +
            '&usuarioCreacion=' + usuarioCreacion
        );
    }
}
