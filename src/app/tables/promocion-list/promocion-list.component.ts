import { Component, OnInit } from '@angular/core';
import { PromocionService } from 'app/_services/promocion.service';
import { RestauranteService } from 'app/_services/restaurante.service';
@Component({
    selector: 'app-extended-table',
    templateUrl: './promocion-list.component.html',
    styleUrls: ['./promocion-list.component.scss']
})

export class PromocionListComponent implements OnInit {

    rows: any
    user: any
    permisos: any
    acciones: any
    descripcionFiltro: any
    listRestaurante: any
    arrayTipoPromocion: any
    strTipoPromocion: any
    constructor(private objPromocionService: PromocionService,
        private restauranteService: RestauranteService
    ) {
        this.strTipoPromocion = "Normal"
        this.rows = []
        this.user = JSON.parse(localStorage.getItem('usuario'))
        this.getPermisos("Mant/Promociones")
    }

    ngOnInit() {
        if (this.getAccion('VER')) {
            this.getTipoPromocion()
            if (this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
                this.getRestaurantes()
                this.getPromocion()
            } else {
                this.getPromocionByUsuario(this.user.ID_USUARIO)
            }
        }
    }
    getRestaurantes() {
        this.restauranteService.getRestaurantesACTIVOS()
            .subscribe(
                data => {
                    this.listRestaurante = data['resultado']['resultados']
                },
                error => {

                }
            )
    }
    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getPromocion() {
        this.objPromocionService.get()
            .subscribe(
                data => {
                    this.rows = data['resultado']['resultados']
                },
                error => {

                }
            )
    }

    getPromocionByRestaurante(intIdRestaurante) {
        intIdRestaurante = intIdRestaurante != null ? intIdRestaurante : ""
        this.objPromocionService.getPromocionByRestaurante(intIdRestaurante)
            .subscribe(
                data => {
                    this.rows = data['resultado']['resultados']
                },
                error => {

                }
            )
    }

    getPromocionByUsuario(idusuario: string) {
        this.objPromocionService.getByUsuario(idusuario)
            .subscribe(
                data => {
                    this.rows = data['resultado']['resultados']
                },
                error => {

                }
            )
    }

    getTipoPromocion() {
        this.objPromocionService.getTipoPromocion(this.user.ID_USUARIO)
            .subscribe(
                data => {
                    this.arrayTipoPromocion = data['resultado']['resultados']
                },
                error => {

                }
            )
    }

}