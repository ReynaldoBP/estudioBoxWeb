import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ParamService } from 'app/_services/param.service';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from 'app/_services/sucursal.service';
@Component({
  selector: 'app-chartjs',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})

export class ChartEncuestaComponent implements OnInit {

  parametros: any = {
    fechaInicio: '',
    fechaFin: '',
    genero: '',
    horario: '',
    edad: '',
    pais: '',
    provincia: '',
    ciudad: '',
    parroquia: '',
    intIdSucursal: ''
  }
  listPais: any
  listCiudad: any
  listProvincia: any
  listParroquia: any
  listHorarios: any
  listEdades: any
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
  objSelectSucursalUsuarioRes: any
  objListSucursalUsuarioRes: any
  objSelectSucursalUsuarioAdmin: any
  objListSucursalUsuarioAdmin
  constructor(private chartsService: ChartsService,
    private paramService: ParamService,
    private toastr: ToastrService,
    private sucursalService: SucursalService) {
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
    this.parametros.fechaInicio = (new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))).toISOString().slice(0, 10);
    this.parametros.fechaFin = (new Date(Date.now())).toISOString().slice(0, 10);
    this.getPais()
    this.getHorarios()
    this.getEdades()
    this.descripcionOrigin = "Acceda a las estadísticas de la encuesta general. El gráfico presenta puntuaciones promediadas sobre todas las respuestas de sus clientes. Esta sección le permite elegir diferentes variables para visualizar data estadística según su interés y realizar comparativos. "
    this.descripcion = "Acceda a las estadísticas de la encuesta general."
    if (this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
      this.getSucursales()
    }
    else if (this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE" || this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE GERENCIA") {
      this.getSucursalesbyUsuario(this.user.ID_USUARIO)
    }

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
    //this.barChartData[0].data =[]
    //this.barChartLabels = []
    this.parametros.intIdSucursal = ''
    if (this.objSelectSucursalUsuarioAdmin != undefined && this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
      this.parametros.intIdSucursal = this.objSelectSucursalUsuarioAdmin
    }
    if (this.objSelectSucursalUsuarioRes != undefined && (this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE" || this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE GERENCIA")) {
      this.parametros.intIdSucursal = this.objSelectSucursalUsuarioRes
    }
    this.chartsService.getPreguntasEncuestaActiva(this.parametros, this.user.ID_USUARIO)
      .subscribe(
        data => {
          this.loading = false
          let resultados = data['resultado']['resultados']
          this.barChartData[0].data = resultados.map(item => item.PROMEDIO)
          this.barChartData[0].label = data['resultado']['NUMERO_ENCUESTA']
          this.barChartLabels = resultados.map(item => item.DESCRIPCION)
        },
        error => {
          this.loading = false
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        }
      )
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
    this.getPreguntasEncuestaActiva()
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
    this.getPreguntasEncuestaActiva()
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
    this.getPreguntasEncuestaActiva()
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