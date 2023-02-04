import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/_services/usuario.service';
import { BannerService } from 'app/_services/banner.service';

@Component({
    selector: 'app-extended-table',
    templateUrl: './banner-list.component.html',
    styleUrls: ['./banner-list.component.scss']
})

export class BannerListComponent implements OnInit {

    rows: any
    permisos: any
    acciones: any
    objUsuario: any
    descripcionBanner: any
    constructor(private bannerService: BannerService) {
        this.rows = []
        this.getPermisos("Mant/Banner")
        this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
    }

    ngOnInit() {

        if (this.getAccion('VER')) {
            this.getBanner()
        }
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getBanner() {
        this.bannerService.getBanner(null, this.objUsuario.ID_USUARIO)
            .subscribe(
                data => {
                    this.rows = data['resultado']['resultados']
                },
                error => {
                }
            )
    }

}