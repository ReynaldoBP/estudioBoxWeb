import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class SucursalService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getSucursal(objParametros: any) {
        let datos = {
            data: {
                strEstado: objParametros.strEstado,
                strContador: objParametros.strContador,
                intIdUsuario: objParametros.intIdUsuario,
                intIdUsuarioEmpresa: objParametros.intIdUsuarioEmpresa,
                intIdClienteEmpresa:objParametros.intIdClienteEmpresa,
                intIdEmpresa: objParametros.intIdEmpresa
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getSucursal', datos);
    }

    getSucursales() {
        return this.http.get(this.globals.host + this.globals.port + '/getSucursal');
    }

    getSucursalesActivas() {
        return this.http.get(this.globals.host + this.globals.port + '/getSucursal?estadoFacturacion=ACTIVO');
    }

    getSucursalById(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getSucursal?idSucursal=' + id);
    }

    getSucursalesbyUsuario(idUsuario: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getSucursal?idUsuario=' + idUsuario);
    }

    getSucursalesbyEmpresa(idEmpresa: string) {
        return this.http.get(this.globals.host + this.globals.port + '/apiWeb/getSucursal?intIdEmpresa=' + idEmpresa);
    }

    getSucursalByIdRestaurante(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getSucursal?strIdRestaurante=' + id);
    }

    crearSucursal(sucursal: any) {
        return this.http.get(this.globals.host + this.globals.port + '/createSucursal' +
            '?strIdRestaurante=' + sucursal.id_restaurante +
            '&esMatriz=' + sucursal.esmatriz +
            '&descripcion=' + sucursal.nombre +
            '&direccion=' + sucursal.direccion +
            '&pais=' + sucursal.id_pais +
            '&provincia=' + sucursal.id_provincia +
            '&ciudad=' + sucursal.id_ciudad +
            '&parroquia=' + sucursal.id_parroquia +
            '&latitud=' + sucursal.lat +
            '&longitud=' + sucursal.lng +
            '&numeroContacto=' + sucursal.numero_contacto +
            '&estado=' + sucursal.estado +
            '&estadoFacturacion=' + sucursal.estado_fact +
            '&enCentroComercial=' + sucursal.escentrocomercial +
            '&intIdCentroComercial=' + sucursal.id_centro_comercial +
            '&usuarioCreacion=' + sucursal.usuario +
            '&usuarioModificacion=' + sucursal.usuario +
            '&horarioAtencionLunesIni=' + sucursal.horarioAtencionLunesIni +
            '&horarioAtencionLunesFin=' + sucursal.horarioAtencionLunesFin +
            '&horarioAtencionMartesIni=' + sucursal.horarioAtencionMartesIni +
            '&horarioAtencionMartesFin=' + sucursal.horarioAtencionMartesFin +
            '&horarioAtencionMiercolesIni=' + sucursal.horarioAtencionMiercolesIni +
            '&horarioAtencionMiercolesFin=' + sucursal.horarioAtencionMiercolesFin +
            '&horarioAtencionJuevesIni=' + sucursal.horarioAtencionJuevesIni +
            '&horarioAtencionJuevesFin=' + sucursal.horarioAtencionJuevesFin +
            '&horarioAtencionViernesIni=' + sucursal.horarioAtencionViernesIni +
            '&horarioAtencionViernesFin=' + sucursal.horarioAtencionViernesFin +
            '&horarioAtencionSabadoIni=' + sucursal.horarioAtencionSabadoIni +
            '&horarioAtencionSabadoFin=' + sucursal.horarioAtencionSabadoFin +
            '&horarioAtencionDomingoIni=' + sucursal.horarioAtencionDomingoIni +
            '&horarioAtencionDomingoFin=' + sucursal.horarioAtencionDomingoFin
        );
    }

    modificarSucursal(sucursal: any) {
        return this.http.get(this.globals.host + this.globals.port + '/editSucursal' +
            '?strIdRestaurante=' + sucursal.id_restaurante +
            '&idSucursal=' + sucursal.id +
            '&esMatriz=' + sucursal.esmatriz +
            '&enCentroComercial=' + sucursal.escentrocomercial +
            '&intIdCentroComercial=' + sucursal.id_centro_comercial +
            '&intIdCliente=' + sucursal.id_cliente +
            '&descripcion=' + sucursal.nombre +
            '&direccion=' + sucursal.direccion +
            '&pais=' + sucursal.id_pais +
            '&provincia=' + sucursal.id_provincia +
            '&ciudad=' + sucursal.id_ciudad +
            '&parroquia=' + sucursal.id_parroquia +
            '&latitud=' + sucursal.lat +
            '&longitud=' + sucursal.lng +
            '&numeroContacto=' + sucursal.numero_contacto +
            '&estado=' + sucursal.estado +
            '&estadoFacturacion=' + sucursal.estado_fact +
            '&usuarioModificacion=' + sucursal.usuario +
            '&horarioAtencionLunesIni=' + sucursal.horarioAtencionLunesIni +
            '&horarioAtencionLunesFin=' + sucursal.horarioAtencionLunesFin +
            '&horarioAtencionMartesIni=' + sucursal.horarioAtencionMartesIni +
            '&horarioAtencionMartesFin=' + sucursal.horarioAtencionMartesFin +
            '&horarioAtencionMiercolesIni=' + sucursal.horarioAtencionMiercolesIni +
            '&horarioAtencionMiercolesFin=' + sucursal.horarioAtencionMiercolesFin +
            '&horarioAtencionJuevesIni=' + sucursal.horarioAtencionJuevesIni +
            '&horarioAtencionJuevesFin=' + sucursal.horarioAtencionJuevesFin +
            '&horarioAtencionViernesIni=' + sucursal.horarioAtencionViernesIni +
            '&horarioAtencionViernesFin=' + sucursal.horarioAtencionViernesFin +
            '&horarioAtencionSabadoIni=' + sucursal.horarioAtencionSabadoIni +
            '&horarioAtencionSabadoFin=' + sucursal.horarioAtencionSabadoFin +
            '&horarioAtencionDomingoIni=' + sucursal.horarioAtencionDomingoIni +
            '&horarioAtencionDomingoFin=' + sucursal.horarioAtencionDomingoFin +
            '&eliminar=' + sucursal.eliminar
        );
    }
}
