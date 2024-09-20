import { Component, OnInit } from '@angular/core';
import { PublicidadService } from 'app/_services/publicidad.service';
import { ReporteService } from 'app/_services/reporte.service';
import { ToastrService } from 'ngx-toastr';
import { EncuestaService } from 'app/_services/encuesta.service';
import { ExcelService } from 'app/_services/excel.service';

@Component({
    selector: 'app-extended-table',
    templateUrl: './reportes.component.html',
    styleUrls: ['./reportes.component.scss']
})

export class ChartReportesComponent implements OnInit {
    objLoading: any = false;
    rows: any
    permisos: any
    acciones: any
    estados: any
    estadoFiltro: any
    descripcionFiltro: any
    user: any
    intSucursal: any
    mesActual: any
    anioActual: any
    constructor(
        private objExportarDataService: ExcelService,
        private objEncuestaService: EncuestaService,
        private toastr: ToastrService,
        private reporteService: ReporteService) {
        this.getPermisos("Mant/Reporte")
        this.rows = []
        this.estados = ["ACTIVO", "INACTIVO"]
        this.estadoFiltro = "ACTIVO"
        const fechaActual = new Date();
        this.mesActual = fechaActual.getMonth() + 1; // Obtiene el mes actual (0 = Enero, por eso se suma 1)
        this.anioActual = fechaActual.getFullYear();
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

    getExportarCsv() {
        this.objLoading = true

        let arrayParametrosReporteEncuesta = {
            "intIdUsuario": this.user.intIdUsuario,
            "strTitulo": 'Califique su experiencia gastronómica',
            "intMes": this.mesActual,
            "intAnio": this.anioActual,
            "strReporteP": 'S'
        }
        this.reporteService.getReporteDataEncuesta(arrayParametrosReporteEncuesta).subscribe(objReporteData => {
            this.objLoading = false
            if (objReporteData["intStatus"] == 200) {
                //this.objExportarDataService.exportAsExcelFile(objReporteData["arrayData"].resultados, 'Califique su experiencia gastronómica')
                this.objExportarDataService.exportAsExcelFilePersonalized(objReporteData["arrayData"].resultados, 'Reporte')
            }
            else {
                this.toastr.warning("Error al Generar Reportes")
            }
        },
            error => {
                this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
            });

    }
}