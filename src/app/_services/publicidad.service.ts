import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class PublicidadService {
    constructor(private http: HttpClient, private globals: Globals) { }

    get() {
        return this.http.get(this.globals.host + this.globals.port + '/getPublicidad');
    }

    getById(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPublicidad?idPublicidad=' + id + "&imagen=SI");
    }

    create(publicidad: any, usuarioCreacion: string) {
        let datos = {
            data: {
                descrPublicidad: publicidad.descripcion,
                edadMaxima: publicidad.edadmaxima,
                edadMinima: publicidad.edadminima,
                genero: publicidad.genero,
                pais: publicidad.idpais,
                provincia: publicidad.idprovincia,
                ciudad: publicidad.idciudad,
                parroquia: publicidad.idparroquia,
                estado: publicidad.estado,
                usuarioCreacion: usuarioCreacion,
                rutaImagen: publicidad.imagen,
                orientacion: publicidad.orientacion
            },
            op: 'createPublicidad',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    edit(publicidad: any, usuarioCreacion: string) {
        let datos = {
            data: {
                idPublicidad: publicidad.id,
                descrPublicidad: publicidad.descripcion,
                edadMaxima: publicidad.edadmaxima,
                edadMinima: publicidad.edadminima,
                genero: publicidad.genero,
                pais: publicidad.idpais,
                provincia: publicidad.idprovincia,
                ciudad: publicidad.idciudad,
                parroquia: publicidad.idparroquia,
                estado: publicidad.estado,
                usuarioCreacion: usuarioCreacion,
                rutaImagen: publicidad.imagen,
                orientacion: publicidad.orientacion,
                eliminar: publicidad.eliminar
            },
            op: 'editPublicidad',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getTiposComidaByPublicidad(idPublicidad: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPublicidadComida?idPublicidad=' + idPublicidad);
    }

    deletePublicidadComida(idPublicidad: string) {
        return this.http.get(this.globals.host + this.globals.port + '/deletePublicidadComida?idPublicidad=' + idPublicidad);
    }

    createPublicidadComida(idPublicidad: string, idTipoComida: string, usuario: string) {
        return this.http.get(this.globals.host + this.globals.port + '/createPublicidadComida?' +
            'idPublicidad=' + idPublicidad +
            '&idTipoComida=' + idTipoComida +
            '&usuarioCreacion=' + usuario
        );
    }
}
