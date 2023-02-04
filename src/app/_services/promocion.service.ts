import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class PromocionService {
    constructor(private http: HttpClient, private globals: Globals) { }

    get() {
        return this.http.get(this.globals.host + this.globals.port + '/getPromocion');
    }

    getPromocionByRestaurante(intIdRestaurante: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPromocion?intIdRestaurante=' + intIdRestaurante);
    }

    getByUsuario(idUsuario: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPromocion?idUsuario=' + idUsuario);
    }

    getPromoPremio(anio: string, mes: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPromocion?strPromo=SI&strAnio=' + anio + '&strMes=' + mes);
    }

    getById(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPromocion?idPromocion=' + id + "&imagen=SI");
    }

    /**
     * Documentación para la función 'create'
     * Método encargado de crear una promoción según los parámetros recibidos.
     * 
     * @author Kevin Baque
     * @version 1.1 17-08-2020 - se agrega código y archivo excel
     * @ince 1.0
     */
    create(promocion: any, usuarioCreacion: string) {
        let datos = {
            data: {
                intIdRestaurante: promocion.idrestaurante,
                descrPromocion: promocion.descripcion,
                cantPuntos: promocion.puntos,
                aceptaGlobal: promocion.aceptaGlobal,
                estado: promocion.estado,
                codigo: promocion.codigo,
                excel: promocion.excel,
                usuarioCreacion: usuarioCreacion,
                rutaImagen: promocion.imagen,
                premio: promocion.tenedor,
                idTipoPromocion: promocion.idTipoPromocion,
                idCupon: promocion.idCupon,
                cantDiasVigencia: promocion.cantDiasVigencia
            },
            op: 'createPromocion',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
    /**
     * Documentación para la función 'edit'
     * Método encargado de editar una promoción según los parámetros recibidos.
     * 
     * @author Kevin Baque
     * @version 1.1 17-08-2020 - se agrega código y archivo excel
     * @ince 1.0
     */
    edit(promocion: any, usuarioCreacion: string) {
        let datos = {
            data: {
                idPromocion: promocion.id,
                intIdRestaurante: promocion.idrestaurante,
                descrPromocion: promocion.descripcion,
                cantPuntos: promocion.puntos,
                aceptaGlobal: promocion.aceptaGlobal,
                estado: promocion.estado,
                codigo: promocion.codigo,
                excel: promocion.excel,
                usuarioCreacion: usuarioCreacion,
                rutaImagen: promocion.imagen,
                premio: promocion.tenedor,
                eliminar: promocion.eliminar,
                idTipoPromocion: promocion.idTipoPromocion,
                idCupon: promocion.idCupon,
                cantDiasVigencia: promocion.cantDiasVigencia
            },
            op: 'editPromocion',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    /**
     * Documentación para la función 'getCodigoPromocion'
     * Método encargado de obtener los códigos de las promociones según los parámetros recibidos.
     * 
     * @author Kevin Baque
     * @version 1.0 17-08-2020
     *
     */
    getCodigoPromocion(promocion: any, usuarioCreacion: string) {
        let datos = {
            data: {
                idPromocion: promocion.id,
                intIdRestaurante: promocion.idrestaurante,
                usuarioCreacion: usuarioCreacion,
            },
            op: 'getCodigoPromocion',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    /**
     * Documentación para la función 'editCodigoPromocion'
     * Método encargado de editar los códigos de las promociones según los parámetros recibidos.
     * 
     * @author Kevin Baque
     * @version 1.0 17-08-2020
     *
     */
    editCodigoPromocion(intIdCodigoPromocion: string, strAccion: string, promocion: any, usuarioCreacion: string) {
        let datos = {
            data: {
                intIdCodigoPromocion: intIdCodigoPromocion,
                idPromocion: promocion.id,
                strAccion: strAccion,
                usuarioCreacion: usuarioCreacion,
            },
            op: 'editCodigoPromocion',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    updatePromoHistorial(idpromohistorial: string, usuarioCreacion: string) {
        let datos = {
            data: {
                idPromocionHist: idpromohistorial,
                usuarioCreacion: usuarioCreacion,
            },
            op: 'editPromocionHistorial',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    createPromoHistorial(idCliente: string, idPromo: string, usuarioCreacion: string) {
        let datos = {
            data: {
                idPromocion: idPromo,
                idCliente: idCliente,
                usuarioCreacion: usuarioCreacion,
            },
            op: 'createPromocionHistorial',
            user: usuarioCreacion
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
    getTipoPromocion(strUsuarioCreacion: string) {
        let datos = {
            data: {
                strUsuarioCreacion: strUsuarioCreacion
            },
            op: 'getTipoPromocion'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
}
