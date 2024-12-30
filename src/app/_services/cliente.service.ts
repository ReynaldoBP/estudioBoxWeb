import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class ClienteService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getClientesCupon(arrayParametros: any) {
        let datos = {
            data: {
                intIdEmpresa: arrayParametros.intIdEmpresa,
                strListarCltCupon: arrayParametros.strListarCltCupon,
                strCupoDisponible: 'SI',
                strEstado: ['ACTIVO', 'INACTIVO']
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getClienteCriterio', datos);
    }
    getPromocionesPendientesPorClt(arrayParametros: any) {
        let datos = {
            data: {
                intIdEmpresa: arrayParametros.intIdEmpresa,
                intIdCliente: arrayParametros.intIdCliente,
                strEstado: arrayParametros.strEstado,
                intIdUsuario: arrayParametros.intIdUsuario
            },
            op: 'getPromocionHistorial'
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getPromocionesPendientesPorClt', datos);
    }


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
                intIdCliente: objCliente.intIdCliente
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiMovil/getCliente', datos);
    }

    edit(objParametros: any) {
        let datos = {
            data: {
                arrayIdArea: objParametros.arrayIdArea,
                arrayIdSucursal: objParametros.arrayIdSucursal,
                intIdCliente: objParametros.intIdCliente,
                intIdEmpresa: objParametros.intIdEmpresa,
                strCorreo: objParametros.strCorreo,
                strEstado: objParametros.strEstado,
                strNombre: objParametros.strNombre,
                strUsuarioCreacion: objParametros.strUsuarioCreacion
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/editCliente', datos);
    }

    getClientesAdmin() {
        let datos = {
            data: {
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiMovil/getCliente', datos);
    }
    getTipoCliente() {
        let datos = {
            data: {
            },
            op: 'getTipoCliente'
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getTotalCliente(intIdUsuario: string) {
        let datos = {
            data: {
                strBanderaContador: "SI",
                intIdUsuario: intIdUsuario
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getClienteCriterio', datos);
    }
    getTotalClientePorEdad(intMes: string, intAnio: string, intIdUsuario: string, intIdEmpresa: string) {
        let datos = {
            data: {
                strBanderaEdad: "SI",
                intMes: intMes,
                intAnio: intAnio,
                intIdUsuario: intIdUsuario,
                intIdEmpresa: intIdEmpresa
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getClienteCriterio', datos);
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
