import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getUsuarios() {
        let datos = {
            data: {
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getUsuario', datos);
    }
    getUsuariosCriterio(objParametros: any) {
        let datos = {
            data: {
                intIdEmpresaPorUsuario: objParametros.intIdEmpresaPorUsuario,
                intIdUsuario: objParametros.intIdUsuario

            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getUsuario', datos);
    }
    getModulos() {
        let datos = {
            data: {
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getModulos', datos);
    }

    getAcciones() {
        let datos = {
            data: {
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getAcciones', datos);
    }

    getPerfil() {
        return this.http.get(this.globals.host + this.globals.port + '/getPerfil?estado=ACTIVO');
    }
    getUsuariosByRestaurante(idRestaurante: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getUsuario?intIdRestaurante=' + idRestaurante);
    }

    getUsuarioById(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getUsuario?idUsuario=' + id);
    }

    generarPass(correo: string) {
        let datos = {
            data: {
                strCorreo: correo,
            },
            op: 'generarPass',
            user: ''
        }
        return this.http.post(this.globals.host + this.globals.port + '/webBitte/procesar', datos);
    }

    getRoles() {
        let datos = {
            data: {
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getRoles', datos);
    }

    getRolesById(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getTipoRol?estado=ACTIVO&idTipoRol=' + id);
    }

    createUsuario(objParametros: any) {
        let datos = {
            data: {
                strIdentificacion: objParametros.strIdentificacion,
                strNombre: objParametros.strNombre,
                strApellido: objParametros.strApellido,
                strCorreo: objParametros.strCorreo,
                intIdTipoRol: objParametros.intIdTipoRol,
                intIdEmpresa: objParametros.intIdEmpresa,
                intIdSucursal: objParametros.intIdSucursal,
                arrayIdSucursal: objParametros.arrayIdSucursal,
                arrayIdArea: objParametros.arrayIdArea,
                strEstado: objParametros.strEstado,
                strUsrSesion: objParametros.strUsrSesion
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/createUsuario', datos);
    }
    editUsuario(objParametros: any) {
        let datos = {
            data: {
                intIdUsuario: objParametros.intIdUsuario,
                strIdentificacion: objParametros.strIdentificacion,
                strNombre: objParametros.strNombre,
                strApellido: objParametros.strApellido,
                strCorreo: objParametros.strCorreo,
                intIdTipoRol: objParametros.intIdTipoRol,
                intIdEmpresa: objParametros.intIdEmpresa,
                intIdSucursal: objParametros.intIdSucursal,
                arrayIdSucursal: objParametros.arrayIdSucursal,
                arrayIdArea: objParametros.arrayIdArea,
                strEstado: objParametros.strEstado,
                strUsrSesion: objParametros.strUsrSesion
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/editUsuario', datos);
    }

    cambiarPwd(id: any, clave: string) {
        return this.http.get(this.globals.host + this.globals.port + '/editUsuario?' +
            'idUsuario=' + id +
            '&contrasenia=' + clave +
            '&usuarioCreacion=' + id
        );
    }

    getPermisosUsuariosRestaurante(idRestaurante: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPerfil?estado=ACTIVO&intIdRestaurante=' + idRestaurante);
    }

    getModuloAcciones() {
        return this.http.get(this.globals.host + this.globals.port + '/getModuloAccion');
    }


    getPermisosByUsuario(idUsuario: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPerfil?estado=ACTIVO&idUsuario=' + idUsuario);
    }

    createPermiso(permiso: any, intIdUsuario: string) {
        return this.http.get(this.globals.host + this.globals.port + '/createPerfil?' +
            'idModuloAccion=' + permiso.moduloaccion +
            '&idUsuario=' + permiso.usuario +
            '&estado=' + permiso.estado +
            '&descripcion=' + permiso.moduloaccion + "-" + permiso.usuario +
            '&intIdUsuario=' + intIdUsuario
        );
    }

    deletePermiso(permiso: any, intIdUsuario: string) {
        return this.http.get(this.globals.host + this.globals.port + '/deletePerfil?' +
            'idModuloAccion=' + permiso.moduloaccion +
            '&idUsuario=' + permiso.usuario +
            '&estado=' + permiso.estado +
            '&descripcion=' + permiso.modulo + permiso.accion + permiso.usuario +
            '&intIdUsuario=' + intIdUsuario
        );
    }
}
