import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getUsuarios() {
        return this.http.get(this.globals.host + this.globals.port + '/getUsuario');
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
        return this.http.get(this.globals.host + this.globals.port + '/getTipoRol?estado=ACTIVO');
    }

    getRolesById(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getTipoRol?estado=ACTIVO&idTipoRol=' + id);
    }

    createUsuario(usuario: any, usuarioCreacion: string) {
        return this.http.get(this.globals.host + this.globals.port + '/createUsuario?estado=ACTIVO' +
            '&idRol=' + usuario.idtiporol +
            '&identificacion=' + usuario.identificacion +
            '&nombres=' + usuario.nombres +
            '&apellidos=' + usuario.apellidos +
            //'&contrasenia='+ usuario.clave +
            '&correo=' + usuario.correo +
            '&estado=' + usuario.estado +
            '&usuarioCreacion=' + usuarioCreacion
        );
    }

    editUsuario(usuario: any, usuarioCreacion: string) {
        return this.http.get(this.globals.host + this.globals.port + '/editUsuario?' +
            'idUsuario=' + usuario.id +
            '&idRol=' + usuario.idtiporol +
            '&identificacion=' + usuario.identificacion +
            '&nombres=' + usuario.nombres +
            '&apellidos=' + usuario.apellidos +
            //'&contrasenia='+ usuario.clave +
            '&correo=' + usuario.correo +
            '&estado=' + usuario.estado +
            '&notificacion=' + usuario.notificacion +
            '&usuarioCreacion=' + usuarioCreacion
        );
    }

    cambiarPwd(id: any, clave: string) {
        return this.http.get(this.globals.host + this.globals.port + '/editUsuario?' +
            'idUsuario=' + id +
            '&contrasenia=' + clave +
            '&usuarioCreacion=' + id
        );
    }

    getPermisos() {
        return this.http.get(this.globals.host + this.globals.port + '/getPerfil?estado=ACTIVO');
    }

    getPermisosUsuariosRestaurante(idRestaurante: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPerfil?estado=ACTIVO&intIdRestaurante=' + idRestaurante);
    }

    getAcciones() {
        return this.http.get(this.globals.host + this.globals.port + '/getAccion?estado=ACTIVO');
    }

    getModuloAcciones() {
        return this.http.get(this.globals.host + this.globals.port + '/getModuloAccion');
    }

    getModulos() {
        return this.http.get(this.globals.host + this.globals.port + '/getModulo?estado=ACTIVO');
    }

    getPermisosByUsuario(idUsuario: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getPerfil?estado=ACTIVO&idUsuario=' + idUsuario);
    }

    createPermiso(permiso: any, usuario: string) {
        return this.http.get(this.globals.host + this.globals.port + '/createPerfil?' +
            'idModuloAccion=' + permiso.moduloaccion +
            '&idUsuario=' + permiso.usuario +
            '&estado=' + permiso.estado +
            '&descripcion=' + permiso.moduloaccion + "-" + permiso.usuario +
            '&usuarioCreacion=' + usuario
        );
    }

    deletePermiso(permiso: any, usuario: string) {
        return this.http.get(this.globals.host + this.globals.port + '/deletePerfil?' +
            'idModuloAccion=' + permiso.moduloaccion +
            '&idUsuario=' + permiso.usuario +
            '&estado=' + permiso.estado +
            '&descripcion=' + permiso.modulo + permiso.accion + permiso.usuario +
            '&usuarioCreacion=' + usuario
        );
    }
}
