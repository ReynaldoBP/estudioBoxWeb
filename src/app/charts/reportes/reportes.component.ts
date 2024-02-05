import { Component, OnInit } from '@angular/core';
import { PublicidadService } from 'app/_services/publicidad.service';
import { ReporteService } from 'app/_services/reporte.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-extended-table',
    templateUrl: './reportes.component.html',
    styleUrls: ['./reportes.component.scss']
})

export class ChartReportesComponent implements OnInit {

    rows: any
    permisos: any
    acciones: any
    estados: any
    estadoFiltro: any
    descripcionFiltro: any
    user: any
    constructor(
        private toastr: ToastrService,
        private reporteService: ReporteService) {
        this.getPermisos("Mant/Reporte")
        this.rows = []
        this.estados = ["ACTIVO", "INACTIVO"]
        this.estadoFiltro = "ACTIVO"
    }
    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('usuario'))
        if (this.getAccion('VER')) {
            this.getReporte()
        }
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'));
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
        //return true;
    }
    getReporte() {
        let arrayParametrosReporte = {
            "intIdUsuario": this.user.intIdUsuario,
        }
        this.reporteService.getReporte(arrayParametrosReporte)
            .subscribe(
                data => {
                    this.rows = data['resultado']['resultados']
                },
                error => {

                }
            )
    }

    eliminarReporte(id: number) {
        this.reporteService.deleteReporte(id)
            .subscribe(
                data => {
                    if (data['status'] == 404) {
                        this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
                    } else {
                        this.toastr.success('Reporte Eliminado con éxito', 'Eliminado')
                        this.getReporte()
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
                }
            )
    }
    descargarReporte(url: string) {
        window.open(url, '_blank');
    }
}