import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class ClienteService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getClientes(idrestaurante: string) {
        let datos = {
            data: {
                idRestaurante: idrestaurante,
                strCupoDisponible: 'SI',
                strEstado: 'ACTIVO'
            },
            op: 'getCliente'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    get(objCliente: any) {
        let datos = {
            data: {
                idCliente: objCliente.intIdCliente
            },
            op: 'getCliente'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    edit(objCliente: any) {
        let datos = {
            data: {
                idCliente: objCliente.intIdCliente,
                nombre: objCliente.strNombre,
                apellido: objCliente.strApellido,
                idTipoCLiente: objCliente.intIdTipo,
                estado: objCliente.strEstado,
            },
            op: 'editCliente'
        }
        return this.http.post(this.globals.host + this.globals.port + '/movilBitte/procesar', datos);
    }

    getClientesAdmin() {
        let datos = {
            data: {
                strCupoDisponible: 'SI',
                strEstado: ['ACTIVO', 'INACTIVO']
            },
            op: 'getCliente'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
    getClientesCupon(arrayParametro: any) {
        let datos = {
            data: {
                idRestaurante: arrayParametro.intIdRestaurante,
                strListarCltCupon: arrayParametro.strListarCltCupon,
                strCupoDisponible: 'SI',
                strEstado: ['ACTIVO', 'INACTIVO']
            },
            op: 'getCliente'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
    getTipoCliente() {
        let datos = {
            data: {
            },
            op: 'getTipoCliente'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getTotalClientes(idusuario: string) {
        let datos = {
            data: {
                strContador: 'SI',
                id_usuario: idusuario
            },
            op: 'getCliente'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getInfluencers() {
        let datos = {
            data: {
                imagen: 'SI'
            },
            op: 'getCltInfluencer'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    crearInfluencer(influencer: any) {
        let datos = {
            data: {
                idCliente: influencer.id_cliente,
                usuarioCreacion: influencer.usuario,
                rutaImagen: influencer.icono,
                estado: influencer.estado
            },
            op: 'createCltInfluencer',
            user: influencer.usuario
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    modificaInfluencer(influencer: any) {
        let datos = {
            data: {
                idCltInfluencer: influencer.id,
                idCliente: influencer.id_cliente,
                usuarioCreacion: influencer.usuario,
                rutaImagen: influencer.icono,
                estado: influencer.estado
            },
            op: 'editCltInfluencer',
            user: influencer.usuario
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getInfluencerById(id: string) {
        let datos = {
            data: {
                idCltInfluencer: id,
                imagen: 'SI'
            },
            op: 'getCltInfluencer'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getPromocionesCliente(idCliente: string, idRestaurante: string, strEstado: string, strMes: string, strAnio: string, intIdSucursal: string, intIdUsuario: string) {
        let datos = {
            data: {
                idRestaurante: idRestaurante,
                idCliente: idCliente,
                estado: strEstado,
                strMes: strMes,
                strAnio: strAnio,
                intIdSucursal: intIdSucursal,
                intIdUsuario: intIdUsuario
            },
            op: 'getPromocionHistorial'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }
    getRegistrosClientes(objParametros: any, intIdusuario: string) {
        let datos = {
            data: {
                strEstado: objParametros.strEstado,
                strMes: objParametros.strMes,
                strAnio: objParametros.strAnio,
                intIdusuario: intIdusuario
            },
            op: 'getRegistrosClientes'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

}
