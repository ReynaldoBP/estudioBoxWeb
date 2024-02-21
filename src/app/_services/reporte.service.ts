import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from './global.service';

@Injectable()
export class ReporteService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getReporte(arrayParametros: any) {
        let datos = {
            data: {
                intIdUsuario: arrayParametros.intIdUsuario,
            }
        }
        return this.http.post(this.globals.host + this.globals.port + '/apiWeb/getReporte', datos);
    }
    getById(id: string) {
        return this.http.get(this.globals.host + this.globals.port + '/getReporte?idReporte=' + id);
    }

    createReporte(reporte: any, usuario: string) {
        const formData = new FormData();
        formData.append('titulo', reporte.titulo);
        formData.append('descripcion', reporte.descripcion);
        formData.append('empresa', reporte.empresa);
        formData.append('sucursal', reporte.sucursal);
        formData.append('archivo', reporte.archivo);
        formData.append('usuario', usuario);
        return this.http.post(this.globals.host + this.globals.port + '/createReporte', formData);
    }

    deleteReporte(id: number) {
        return this.http.get(this.globals.host + this.globals.port + '/deleteReporte?idReporte=' + id);
    }
}