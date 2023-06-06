import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ParamService } from 'app/_services/param.service';
import { AreaService } from 'app/_services/area.service';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from 'app/_services/sucursal.service';
@Component({
  selector: 'app-chartjs',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})

export class ChartEncuestaComponent implements OnInit {

  arrayParametrosEncuestas: any = {
    strFechaInicio: "",
    strFechaFin: "",
    strGenero: "",
    strHorario: "",
    strEdad: "",
    intIdSucursal: "",
    intIdUsuario: "",
    intIdArea: ""
  }
  arrayHorarios: any
  arrayEdades: any
  loading: any = false;
  user: any

  // barChart
  public barChartOptions = {
    responsive: true,
    plugins: {
      labels: {
        render: 'value'
      }
    },
    legend: {
      display: true,
      labels: {
        fontSize: 12
      }
    },
    tooltips: {
      enabled: true
    },
    title: {
      display: false,
      text: '',
      position: 'left'
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            max: 5,
            beginAtZero: true
          }
        }
      ],
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels = [];
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = [
    { data: [], label: '' }
  ];
  public barChartColors = chartsData.barChartColorsEncuesta;
  descripcionOrigin: string
  descripcion: string
  objSelectSucursal: any
  objSelectArea: any = null
  arraySucursal
  arrayArea
  arrayParametrosSucursal: any = {
    strEstado: "ACTIVO",
    intIdUsuario: ""
  }
  arrayParametrosArea: any = {
    strEstado: "ACTIVO",
    intIdUsuario: "",
    intIdSucursal: ""
  }
  constructor(private objChartsService: ChartsService,
    private objParametroService: ParamService,
    private toastr: ToastrService,
    private objAreaService: AreaService,
    private objSucursalService: SucursalService) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
  }

  ngOnInit(): void {
    let canvas: any = document.getElementById("chartEncuesta");
    let ctx = canvas.getContext("2d");
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(1, 87, 155,1)');
    gradient.addColorStop(1, 'rgba(0, 37, 66,1)');

    let _barChartColorsEncuesta: Array<any> = [
      {
        backgroundColor: gradient,
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },

    ];
    this.barChartColors = _barChartColorsEncuesta
    this.arrayParametrosEncuestas.strFechaInicio = (new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))).toISOString().slice(0, 10);
    this.arrayParametrosEncuestas.strFechaFin = (new Date(Date.now())).toISOString().slice(0, 10);
    this.arrayParametrosEncuestas.intIdUsuario = this.user.intIdUsuario
    this.getHorarios()
    this.getEdades()
    this.descripcionOrigin = "Acceda a las estadísticas de la encuesta general. El gráfico presenta puntuaciones promediadas sobre todas las respuestas de sus clientes. Esta sección le permite elegir diferentes variables para visualizar data estadística según su interés y realizar comparativos. "
    this.descripcion = "Acceda a las estadísticas de la encuesta general."
    this.getSucursales()
    this.getArea()
  }

  vermas() {
    if (this.descripcion == this.descripcionOrigin) {
      this.descripcion = "Acceda a las estadísticas de la encuesta general."
    } else {
      this.descripcion = this.descripcionOrigin
    }
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  getPreguntasEncuestaActiva() {
    this.loading = true
    this.arrayParametrosEncuestas.intIdSucursal = ''
    if (this.arraySucursal != undefined) {
      this.arrayParametrosEncuestas.intIdSucursal = this.objSelectSucursal
    }
    if (this.arrayArea != undefined) {
      this.arrayParametrosEncuestas.intIdArea = this.objSelectArea
    }
    this.objChartsService.getPreguntasEncuestaActiva(this.arrayParametrosEncuestas)
      .subscribe(
        data => {
          if (data["intStatus"] == 200) {
            this.loading = false
            let resultados = data['arrayData']['resultados']
            this.barChartData[0].data = resultados.map(item => item.strPromedio)
            this.barChartData[0].label = data['arrayData']['intNumeroEncuesta']
            this.barChartLabels = resultados.map(item => item.strDescripcion)
          } else {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
            this.loading = false
            this.barChartData[0].data = []
            this.barChartData[0].label = ""
            this.barChartLabels = []
          }
        },
        error => {
          this.loading = false
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        }
      )
  }

  getHorarios() {
    this.objParametroService.getParametro('HORARIO').subscribe(
      data => {
        if (data["intStatus"] == 200) {
          this.arrayHorarios = data["arrayData"]
        } else {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      },
      error => {
        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
      });
  }

  getEdades() {
    this.objParametroService.getParametro('EDAD').subscribe(
      data => {
        if (data["intStatus"] == 200) {
          this.arrayEdades = data["arrayData"]
        } else {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      },
      error => {
        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
      });
  }
  getSucursales() {
    this.arrayParametrosSucursal.intIdUsuario = this.user.intIdUsuario
    this.objSucursalService.getSucursal(this.arrayParametrosSucursal)
      .subscribe(
        data => {
          this.arraySucursal = data["arraySucursal"]
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getArea() {
    if (this.arraySucursal != undefined) {
      this.arrayParametrosArea.intIdSucursal = this.objSelectSucursal
    }
    this.arrayParametrosArea.intIdUsuario = this.user.intIdUsuario
    this.objAreaService.getArea(this.arrayParametrosArea)
      .subscribe(
        data => {
          this.arrayArea = data["arrayArea"]
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
}