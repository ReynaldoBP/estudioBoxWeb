import { Component, OnInit } from '@angular/core';
import { PublicidadService } from 'app/_services/publicidad.service';
import { ReporteService } from 'app/_services/reporte.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-extended-table',
    templateUrl: './publicidad.component.html',
    styleUrls: ['./publicidad.component.scss']
})

export class ChartPublicidadComponent implements OnInit {

    user: any
    rows: any
    permisos: any
    acciones: any
    estados: any
    estadoFiltro: any
    descripcionFiltro: any
    constructor(
        private toastr: ToastrService,
        private publicidadService: PublicidadService) {
        this.user = JSON.parse(localStorage.getItem('usuario'))
        this.getPermisos("Mant/Publicidad")
        this.rows = []
        this.estados = ["ACTIVO", "INACTIVO"]
        this.estadoFiltro = "ACTIVO"
    }
    ngOnInit() {
        if (this.getAccion('VER')) {
            this.getPublicidad()
        }
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'));
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }
    getPublicidad() {
        this.publicidadService.getUser(this.user.intIdUsuario)
            .subscribe(
                data => {
                    this.rows = data['resultado']['resultados']
                },
                error => {

                }
            )
    }

    eliminarPublicidad(id: number) {
        this.publicidadService.deletePublicidad(id, this.user.intIdUsuario)
            .subscribe(
                data => {
                    if (data['status'] == 404) {
                        this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
                    } else {
                        this.toastr.success('Publicidad eliminada con éxito', 'Eliminado')
                    }
                    this.getPublicidad()
                },
                error => {
                    this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
                }
            )
    }

}