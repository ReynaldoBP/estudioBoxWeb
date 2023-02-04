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
  parametros: any = {
    genero: '',
    horario: '',
    edad: '',
    pais: '',
    provincia: '',
    ciudad: '',
    parroquia: '',
    limite: '',
    pregunta: '',
    intIdSucursal: ''
  }
  listPais: any
  listCiudad: any
  listProvincia: any
  listParroquia: any
  listHorarios: any
  listEdades: any
  loading: any = false;
  listPreguntas: any
  user: any
  descripcionOrigin: string
  descripcion: string
  arrayEncuestas: any[] = [];
  objSelectSucursalUsuarioRes: any
  objListSucursalUsuarioRes: any
  objSelectSucursalUsuarioAdmin: any
  objListSucursalUsuarioAdmin
  constructor(private chartsService: ChartsService,
    private paramService: ParamService,
    private toastr: ToastrService,
    private encuestaService: EncuestaService,
    private sucursalService: SucursalService) {
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
    this.parametros.limite = "3"
    this.getPreguntas()
    this.getPais()
    this.getHorarios()
    this.getEdades()
    if (this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
      this.getSucursales()
    }
    else if (this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE" || this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE GERENCIA") {
      this.getSucursalesbyUsuario(this.user.ID_USUARIO)
    }
  }

  vermas() {
    if (this.descripcion == this.descripcionOrigin) {
      this.descripcion = "Acceda a las estadísticas de preguntas individuales."
    } else {
      this.descripcion = this.descripcionOrigin
    }
  }

  getPreguntas() {
    this.encuestaService.getEncuestas(1).subscribe(
      data => {
        if (data['resultado']['resultados'] != null) {
          let encuestaActiva = data['resultado']['resultados'][0];
          this.encuestaService.getPreguntas(encuestaActiva.ID_ENCUESTA).subscribe(
            data => {
              if (data['resultado']['resultados'] != null) {
                let listado = data['resultado']['resultados'];
                this.listPreguntas = listado.filter(item => item.VALOR_OPCION_RESPUESTA == "5")
              }
            },
            error => {
              this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
            });
        }
      },
      error => {
        this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
      });
  }

  getPais() {
    this.paramService.getPais().subscribe(
      data => {
        if (data != null) {
          this.listPais = data['resultado']['pais'];
          this.parametros.pais = this.listPais.filter(item => item.PAIS_NOMBRE == "ECUADOR")[0].ID_PAIS
          this.getProvincia(this.parametros.pais)
        }
      },
      error => {
        this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
      });
  }

  getProvincia(value: any) {
    this.parametros.provincia = ''
    this.parametros.ciudad = ''
    this.parametros.parroquia = ''
    this.getPreguntasPromedio()
    this.paramService.getProvincia(value).subscribe(
      data => {
        if (data != null) {
          this.listProvincia = data['resultado']['provincia'];
        }
      },
      error => {
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getCiudad(value: any) {
    this.parametros.ciudad = ''
    this.parametros.parroquia = ''
    this.getPreguntasPromedio()
    this.paramService.getCiudad(value).subscribe(
      data => {
        if (data != null) {
          this.listCiudad = data['resultado']['ciudad'];
        }
      },
      error => {
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getParroquia(value: any) {
    this.parametros.parroquia = ''
    this.getPreguntasPromedio()
    this.paramService.getParroquia(value).subscribe(
      data => {
        if (data != null) {
          this.listParroquia = data['resultado']['Parroquia'];
        }
      },
      error => {
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getHorarios() {
    this.paramService.getParametro('HORARIO').subscribe(
      data => {
        if (data != null) {
          this.listHorarios = data['resultado']['resultados'];
        }
      },
      error => {
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getEdades() {
    this.paramService.getParametro('EDAD').subscribe(
      data => {
        if (data != null) {
          this.listEdades = data['resultado']['resultados'];
        }
      },
      error => {
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }


  getPreguntasPromedio() {
    this.loading = true
    this.parametros.intIdSucursal = ''
    if (this.objSelectSucursalUsuarioAdmin != undefined && this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
      this.parametros.intIdSucursal = this.objSelectSucursalUsuarioAdmin
    }
    if (this.objSelectSucursalUsuarioRes != undefined && (this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE" || this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE GERENCIA")) {
      this.parametros.intIdSucursal = this.objSelectSucursalUsuarioRes
    }
    this.chartsService.getPreguntasPromedio(this.parametros, this.user.ID_USUARIO)
      .subscribe(
        data => {
          this.loading = false
          let resultados = data['resultado']['resultados']
          let encuesta = data['resultado']['NUMERO_ENCUESTA']
          this.barChartData[0].data = resultados.map(item => item.PROMEDIO)
          if (this.parametros.pregunta == '') {
            this.barChartData[0].label = 'TODAS'
          } else {
            this.barChartData[0].label = this.listPreguntas.filter(item => item.ID_PREGUNTA == this.parametros.pregunta)[0].DESCRIPCION_PREGUNTA
          }
          this.barChartLabels = resultados.map(item => this.monthNames[Number.parseInt(item.MES) - 1])
          this.arrayEncuestas = encuesta;
        },
        error => {
          this.loading = false
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        }
      )
  }
  getSucursales() {
    this.sucursalService.getSucursalesActivas()
      .subscribe(
        data => {
          this.objListSucursalUsuarioAdmin = data['resultado']['resultados']
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getSucursalesbyUsuario(idusuario: string) {
    this.sucursalService.getSucursalesbyUsuario(idusuario)
      .subscribe(
        data => {
          this.objListSucursalUsuarioRes = data['resultado']['resultados']
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
}