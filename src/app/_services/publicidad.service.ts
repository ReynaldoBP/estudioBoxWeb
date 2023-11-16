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

    createPublicidad(publicidad: any, usuario: string) {
        const formData = new FormData();
        formData.append('titulo', publicidad.titulo);
        formData.append('descripcion', publicidad.descripcion);
        formData.append('empresa', publicidad.empresa);
        formData.append('sucursal', publicidad.sucursal);
        formData.append('area', publicidad.area);
        formData.append('encuesta', publicidad.encuesta);
        formData.append('tiempo', publicidad.tiempo);
          // Asegúrate de que 'archivo' sea un arreglo de archivos, no un solo archivo.
          for (let i = 0; i < publicidad.archivo.length; i++) {
            formData.append('archivo[]', publicidad.archivo[i]);
          }
        formData.append('usuario', usuario);
        return this.http.post(this.globals.host + this.globals.port + '/createPublicidad', formData);
    }
    deletePublicidad(id: number, usuarioCreacion: string){
        return this.http.get(this.globals.host + this.globals.port + '/deletePublicidad?idPublicidad=' + id +
        '&usuarioCreacion=' + usuarioCreacion );
    }
    getUser(idUsuario: number) {
        return this.http.get(this.globals.host + this.globals.port + '/getPublicidad?intIdUsuario=' + idUsuario);
    }
}
