import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ParamService } from 'app/_services/param.service';
import { ToastrService } from 'ngx-toastr';
import { EncuestaService } from 'app/_services/encuesta.service';
import { SucursalService } from 'app/_services/sucursal.service';
@Component({
  selector: 'app-chartjs',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})

export class ChartPreguntasComponent implements OnInit {

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  // lineChart
  public lineChartData = chartsData.lineChartData;
  public lineChartLabels = chartsData.lineChartLabels;
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType = chartsData.lineChartType;

  // areaChart
  public areaChartData = chartsData.areaChartData;
  public areaChartLabels = chartsData.areaChartLabels;
  public areaChartOptions = chartsData.areaChartOptions;
  public areaChartColors = chartsData.areaChartColors;
  public areaChartLegend = chartsData.areaChartLegend;
  public areaChartType = chartsData.areaChartType;

  // scatterChart
  public scatterChartData = chartsData.scatterChartData;
  public scatterChartLabels = chartsData.scatterChartLabels;
  public scatterChartOptions = chartsData.scatterChartOptions;
  public scatterChartColors = chartsData.scatterChartColors;
  public scatterChartLegend = chartsData.scatterChartLegend;
  public scatterChartType = chartsData.scatterChartType;

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
  _barChartDataPreguntas: any[] = [
    { data: [], label: 'TODAS' }
  ];
  public barChartData = this._barChartDataPreguntas;
  public barChartColors //= chartsData.barChartColors;

  // Doughnut
  public doughnutChartLabels = chartsData.doughnutChartLabels;
  public doughnutChartData = chartsData.doughnutChartData;
  public doughnutChartType = chartsData.doughnutChartType;
  public doughnutChartColors = chartsData.doughnutChartColors;
  public doughnutChartOptions = chartsData.doughnutChartOptions;

  // Radar
  public radarChartLabels = chartsData.radarChartLabels;

  public radarChartData = chartsData.radarChartData;
  public radarChartType = chartsData.radarChartType;
  public radarChartColors = chartsData.radarChartColors;
  public radarChartOptions = chartsData.radarChartOptions;


  // Pie
  public pieChartLabels = chartsData.pieChartLabels;
  public pieChartData = chartsData.pieChartData;
  public pieChartType = chartsData.pieChartType;
  public pieChartColors = chartsData.pieChartColors;
  public pieChartOptions = chartsData.pieChartOptions;

  // PolarArea
  public polarAreaChartLabels = chartsData.polarAreaChartLabels;
  public polarAreaChartData = chartsData.polarAreaChartData;
  public polarAreaLegend = chartsData.polarAreaLegend;
  public ploarChartColors = chartsData.ploarChartColors;
  public polarAreaChartType = chartsData.polarAreaChartType;
  public polarChartOptions = chartsData.polarChartOptions;

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }
  arrayParametrosEncuestas: any = {
    intIdSucursal: '',
    intIdUsuario: '',
    intLimite: '',
    intIdPregunta: '',
    strEdad: '',
    strGenero: '',
    strHorario: ''
  }
  arrayParametrosPreguntas: any = {
    intIdEncuesta: ""
  }
  arrayHorarios: any
  arrayEdades: any
  loading: any = false;
  arrayPreguntas: any
  user: any
  descripcionOrigin: string
  descripcion: string
  arrayTotalEncuestas: any[] = [];
  arrayEncuestas: any[] = [];
  objSelectSucursal: any
  arraySucursal: any
  arrayParametrosSucursal: any = {
    strEstado: "ACTIVO",
    intIdUsuario: ""
  }
  constructor(private objChartsService: ChartsService,
    private objParametroService: ParamService,
    private toastr: ToastrService,
    private objEncuestaService: EncuestaService,
    private objSucursalService: SucursalService) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
    this.descripcionOrigin = "Acceda a las estadísticas de preguntas individuales. El gráfico presenta puntuaciones promediadas sobre todas las respuestas de sus clientes. Esta sección le permite elegir diferentes variables para visualizar data estadística según su interés y realizar comparativos."
    this.descripcion = "Acceda a las estadísticas de preguntas individuales."
  }

  ngOnInit(): void {
    let canvas: any = document.getElementById("chartPreguntas");
    let ctx = canvas.getContext("2d");
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 96, 100,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');

    let _barChartColors: Array<any> = [
      {
        backgroundColor: gradient,
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },

    ];

    this.barChartColors = _barChartColors
    this.arrayParametrosEncuestas.intLimite = "3"
    this.arrayParametrosEncuestas.intIdUsuario = this.user.intIdUsuario
    this.getEncuesta()
    this.getHorarios()
    this.getEdades()
    this.getSucursales()
  }

  vermas() {
    if (this.descripcion == this.descripcionOrigin) {
      this.descripcion = "Acceda a las estadísticas de preguntas individuales."
    } else {
      this.descripcion = this.descripcionOrigin
    }
  }

  getEncuesta() {
    this.objEncuestaService.getEncuesta(this.arrayParametrosEncuestas).subscribe(
      data => {
        if (data["intStatus"] == 200) {
          this.arrayEncuestas = data['arrayEncuesta']
        } else {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      },
      error => {
        this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
      });
  }

  getPregunta() {
    console.log(this.arrayParametrosPreguntas)
    this.objEncuestaService.getPregunta(this.arrayParametrosPreguntas).subscribe(
      data => {
        if (data["intStatus"] == 200) {
          this.arrayPreguntas = data['arrayPregunta'].filter(item => item.intCantidadEstrellas == "5")
        } else {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      },
      error => {
        this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
      });
  }

  getResultadoProPregunta() {
    this.loading = true
    this.arrayParametrosEncuestas.intIdSucursal = ''
    if (this.objSelectSucursal != undefined) {
      this.arrayParametrosEncuestas.intIdSucursal = this.objSelectSucursal
    }
    this.objChartsService.getResultadoProPregunta(this.arrayParametrosEncuestas)
      .subscribe(
        data => {
          this.loading = false
          console.log(data)
          if (data["intStatus"] == 200) {
            let intNumeroEncuesta = data["arrayData"]["intNumeroEncuesta"]
            this.barChartData[0].data = data["arrayData"].resultados.map(item => item.strPromedio)
            if (this.arrayParametrosEncuestas.intIdPregunta == "") {
              this.barChartData[0].label = 'Todas'
            } else {
              this.barChartData[0].label = this.arrayPreguntas.filter(item => item.intIdPregunta == this.arrayParametrosEncuestas.intIdPregunta)[0].strPregunta
            }
            this.barChartLabels = data["arrayData"].resultados.map(item => this.monthNames[Number.parseInt(item.intMes) - 1])
            this.arrayTotalEncuestas = intNumeroEncuesta;

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

}