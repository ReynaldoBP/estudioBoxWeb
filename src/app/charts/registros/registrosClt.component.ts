import { Component } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ExcelService } from 'app/_services/excel.service';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'app/_services/cliente.service';
@Component({
  selector: 'app-chartjs',
  templateUrl: './registrosClt.component.html',
  styleUrls: ['./registrosClt.component.scss']
})

export class ChartREGISTROSCLTComponent {

  arrayParametros: any = {
    strAnio: '',
    strMes: '',
    strEstado: ''
  }
  loading: any = false;
  // barChart
  public barChartOptions = chartsData.barChartOptionsClt;
  public barChartLabels = chartsData.barChartLabelsClt;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = [
    { data: [], label: null },
  ];
  public barChartColors = chartsData.barChartColorsClt;

  objUsuario: any
  objDate: any = new Date();
  strDescripcion: string
  strEstado: string = 'ACTIVO'
  arrayEstados: any
  permisos: any
  acciones: any
  objFila: any
  strAnio: number = this.objDate.getFullYear()
  strMes: number = this.objDate.getMonth() + 1
  arrayMonthNames = [
    { anio: "Enero", numanio: 1 },
    { anio: "Febrero", numanio: 2 },
    { anio: "Marzo", numanio: 3 },
    { anio: "Abril", numanio: 4 },
    { anio: "Mayo", numanio: 5 },
    { anio: "Junio", numanio: 6 },
    { anio: "Julio", numanio: 7 },
    { anio: "Agosto", numanio: 8 },
    { anio: "Septiembre", numanio: 9 },
    { anio: "Octubre", numanio: 10 },
    { anio: "Noviembre", numanio: 11 },
    { anio: "Diciembre", numanio: 12 }
  ];
  intTotalRegistros: number
  constructor(private chartsService: ChartsService,
    private excelService: ExcelService,
    private objCltService: ClienteService,
    private toastr: ToastrService) {
    this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
    this.arrayEstados = ["ACTIVO", "INACTIVO"]
    this.getPermisos("Est/Registros")
  }

  ngOnInit(): void {
    this.strDescripcion = "Acceda a las estadísticas de los registros de los clientes. "
    if (this.getAccion('VER')) {
      this.getDataCliente()
    }

  }

  vermas() {
    this.strDescripcion = "Acceda a las estadísticas de los registros de los clientes. Esta sección le permite elegir diferentes variables para visualizar data estadística según su interés y realizar comparativos. "
  }
  getPermisos(descModulo: string) {
    this.permisos = JSON.parse(localStorage.getItem('permisos'))
    this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
  }
  getAccion(descAccion: string) {
    return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
  }
  getDataCliente() {
    this.intTotalRegistros = 0
    this.loading = true
    this.arrayParametros.strAnio = this.strAnio
    this.arrayParametros.strMes = this.strMes
    this.arrayParametros.strEstado = this.strEstado
    this.chartsService.getPromedioClt(this.arrayParametros, this.objUsuario.ID_USUARIO)
      .subscribe(
        data => {
          this.loading = false
          let arrayResultado = data['resultado']['resultados']
          let arrayDatos = []
          for (let i = 0; i < this.barChartLabels.length; i++) {
            for (let j = 0; j < arrayResultado.length; j++) {
              if (this.barChartLabels[i] == arrayResultado[j].DIA) {
                this.intTotalRegistros = this.intTotalRegistros + Number.parseInt(arrayResultado[j].CANTIDAD)
                arrayDatos[i] = arrayResultado[j].CANTIDAD
                if (arrayResultado[j].CANTIDAD <= 10) {
                  this.barChartColors[0].backgroundColor[i] = 'rgba(135, 206, 250)'
                }
                else if (arrayResultado[j].CANTIDAD > 10 && arrayResultado[j].CANTIDAD <= 20) {
                  this.barChartColors[0].backgroundColor[i] = 'rgba(0, 0, 205)'
                }
                else if (arrayResultado[j].CANTIDAD > 20) {
                  this.barChartColors[0].backgroundColor[i] = 'rgba(0, 0, 205)'
                }
              }
            }
          }
          this.barChartData = [
            { data: arrayDatos, label: null },
          ];
        },
        error => {
          this.loading = false
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        }
      )
    this.objCltService.getRegistrosClientes(this.arrayParametros, this.objUsuario.ID_USUARIO)
      .subscribe(
        data => {
          if (data['status'] == 200) {
            let arrayCliente = data['resultado']['resultados']
            this.objFila = arrayCliente.map(item => {
              let arrayItem = {
                ID_CLIENTE: item.ID_CLIENTE,
                CLIENTE: item.CLIENTE,
                GENERO: item.GENERO,
                FECHA_NACIMIENTO: item.FECHA_NACIMIENTO,
                CORREO: item.CORREO,
                ESTADO: item.ESTADO,
                FECHA_REGISTRO: item.FECHA_REGISTRO,
                RED_SOCIAL:item.RED_SOCIAL,
                LINK_ACTIVACION:item.LINK_ACTIVACION
              }
              return arrayItem
            })
          } else {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )

  }
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.objFila, 'EstadisticaRegistros');
  }

  exportAsPDF() {
    var cols = [
      { title: "ID", dataKey: "ID_CLIENTE" },
      { title: "CLIENTE", dataKey: "CLIENTE" },
      { title: "GENERO", dataKey: "GENERO" },
      { title: "FE_NACIMIENTO", dataKey: "FECHA_NACIMIENTO" },
      { title: "CORREO", dataKey: "CORREO" },
      { title: "ESTADO", dataKey: "ESTADO" },
      { title: "RED_SOCIAL", dataKey: "RED_SOCIAL" },
      { title: "FE_REGISTRO", dataKey: "FECHA_REGISTRO" }
    ]
    this.excelService.exportAsPdfFile(cols, this.objFila, 'EstadisticaRegistros');
  }
}