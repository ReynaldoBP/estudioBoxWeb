import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class RestauranteService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getRestaurantes() {
        return this.http.get(this.globals.host + this.globals.port + '/getRestaurante?icono=SI');
    }

    getRestaurantesByUsuario(idusuario: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getRestaurante?icono=SI&idUsuario=' + idusuario);
    }

    getTotalRestaurantes() {
        return this.http.get(this.globals.host + this.globals.port + '/getRestaurante?strContador=SI');
    }

    getRestaurantesACTIVOS() {
        return this.http.get(this.globals.host + this.globals.port + '/getRestaurante?estado=ACTIVO');
    }

    getRestaurantesById(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getRestaurante?idRestaurante=' + id + "&imagen=SI&icono=SI");
    }
    getRestaurantesPorCiudad(intCiudad: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getRestaurante?intCiudad=' + intCiudad + "&icono=SI");
    }
    getCiudad() {
        return this.http.get(this.globals.host + this.globals.port + '/getCiudad');
    }
    /**
     * Documentación para la función 'getCiudadPorRestaurante'
     * Método encargado de obtener las ciudades de acuerdo a los restaurantes.
     * 
     * @author Kevin Baque
     * @version 1.0 18-06-2021
     */
    getCiudadPorRestaurante() {
        let datos = {
            data: {
                estado: 'ACTIVO'
            },
            op: 'getCiudadPorRestaurante'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
    /**
     * Documentación para la función 'crearRestaurante'
     * Método encargado de crear un restaurante según los parámetros recibidos.
     * 
     * @author Kevin Baque
     * @version 1.1 17-08-2020 - se agrega bandera de código
     * @ince 1.0
     */
    crearRestaurante(restaurante: any) {
        let datos = {
            data: {
                idUsuario: restaurante.usuario,
                arrayTipoComida: restaurante.arrayTipoComida,
                tipoIdentificacion: restaurante.tipo_id,
                identificacion: restaurante.identificacion,
                razonSocial: restaurante.razon_social,
                nombreComercial: restaurante.nombre_comercial,
                representanteLegal: restaurante.representante_legal,
                direcion: restaurante.direccion_tributaria,
                urlCatalogo: restaurante.url_catalogos,
                urlRedSocial: restaurante.url_redSocial,
                numeroContacto: restaurante.numero_contacto,
                estado: restaurante.estado,
                codigo: restaurante.codigo,
                esAfiliado: restaurante.esAfiliado,
                usuarioCreacion: restaurante.usuario,
                rutaIcono: restaurante.icono,
                rutaImagen: restaurante.imagen
            },
            op: 'createRestaurante',
            user: restaurante.usuario
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
    /**
     * Documentación para la función 'modificarRestaurante'
     * Método encargado de editar un restaurante según los parámetros recibidos.
     * 
     * @author Kevin Baque
     * @version 1.1 17-08-2020 - se agrega bandera de código
     * @ince 1.0
     */
    modificarRestaurante(restaurante: any) {
        let datos = {
            data: {
                idUsuario: restaurante.usuario,
                arrayTipoComida: restaurante.arrayTipoComida,
                tipoIdentificacion: restaurante.tipo_id,
                identificacion: restaurante.identificacion,
                razonSocial: restaurante.razon_social,
                nombreComercial: restaurante.nombre_comercial,
                representanteLegal: restaurante.representante_legal,
                direcion: restaurante.direccion_tributaria,
                urlCatalogo: restaurante.url_catalogos,
                urlRedSocial: restaurante.url_redSocial,
                numeroContacto: restaurante.numero_contacto,
                estado: restaurante.estado,
                codigo: restaurante.codigo,
                esAfiliado: restaurante.esAfiliado,
                usuarioCreacion: restaurante.usuario,
                rutaIcono: restaurante.icono,
                rutaImagen: restaurante.imagen,
                idRestaurante: restaurante.idRestaurante
            },
            op: 'editRestaurante',
            user: restaurante.usuario
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    createUsuarioRestaurante(idusuario, idRestaurante, idSucursal, idusuariocreacion) {
        return this.http.get(this.globals.host + this.globals.port + '/createUsuarioRes?' +
            'idRestaurante=' + idRestaurante +
            '&idSucursal=' + idSucursal +
            '&idUsuario=' + idusuario +
            '&usuarioCreacion=' + idusuariocreacion
        );
    }

    deleteUsuarioRestaurante(idusuario) {
        return this.http.get(this.globals.host + this.globals.port + '/deleteUsuarioRes?' +
            'idUsuario=' + idusuario
        );
    }

    getRestauranteUsuario(idusuario) {
        return this.http.get(this.globals.host + this.globals.port + '/getUsuarioRes?' +
            'idUsuario=' + idusuario
        );
    }
    getComidaRestaurante(arrayParametros: any) {
        let datos = {
            data: {
                intIdRestaurante: arrayParametros.intIdRestaurante,
                intIdTipoComida: arrayParametros.intIdTipoComida
            },
            op: 'getComidaRestaurante'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }


}
