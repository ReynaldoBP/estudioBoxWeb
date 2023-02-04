import { Component } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ParamService } from 'app/_services/param.service';
import { ToastrService } from 'ngx-toastr';
import { RestauranteService } from 'app/_services/restaurante.service';
import { SucursalService } from 'app/_services/sucursal.service';
@Component({
  selector: 'app-chartjs',
  templateUrl: './ipn.component.html',
  styleUrls: ['./ipn.component.scss']
})

export class ChartIPNComponent {

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
    restaurante: '',
    intIdSucursal: ''
  }
  listPais: any
  listCiudad: any
  listProvincia: any
  listParroquia: any
  listHorarios: any
  listEdades: any
  loading: any = false;

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
  public barChartOptions = chartsData.barChartOptionsIPN;
  public barChartLabels = chartsData.barChartLabelsIPN;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = [
    { data: [], label: null },
  ];
  public barChartColors = chartsData.barChartColorsIPN;

  // Doughnut
  public doughnutChartLabels = chartsData.doughnutChartLabelsIPN;
  public doughnutChartData = [];
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

  porcentajeIPN: number
  user: any
  descripcionOrigin: string
  descripcion: string
  objSelectRestaurante: any = null
  listRestaurante: any
  objSelectSucursalUsuarioRes: any
  objListSucursalUsuarioRes: any
  constructor(private chartsService: ChartsService,
    private restauranteService: RestauranteService,
    private sucursalService: SucursalService,
    private paramService: ParamService,
    private toastr: ToastrService) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
  }

  ngOnInit(): void {
    this.parametros.fechaInicio = (new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))).toISOString().slice(0, 10);
    this.parametros.fechaFin = (new Date(Date.now())).toISOString().slice(0, 10);
    this.getPais()
    this.getHorarios()
    this.getEdades()
    this.getRestaurantes()
    this.descripcionOrigin = "El Índice Promotor Neto permite conocer la lealtad de los clientes de una empresa basándose en las recomendaciones que se fomentan entre la clientela."
    this.descripcion = "El Índice Promotor Neto permite conocer la lealtad de los clientes de una empresa basándose en las recomendaciones que se fomentan entre la clientela. "
    if (this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE" || this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE GERENCIA") {
      this.getSucursalesbyUsuario(this.user.ID_USUARIO)
    }
  }

  vermas() {
    if (this.descripcion == this.descripcionOrigin) {
      this.descripcion = "El Índice Promotor Neto permite conocer la lealtad de los clientes de una empresa basándose en las recomendaciones que se fomentan entre la clientela. "
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
    this.getIPN()
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
    this.getIPN()
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
    this.getIPN()
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

  getIPN() {
    this.loading = true
    this.parametros.restaurante = this.objSelectRestaurante
    this.parametros.intIdSucursal = this.objSelectSucursalUsuarioRes
    this.chartsService.getIPN(this.parametros, this.user.ID_USUARIO)
      .subscribe(
        data => {
          this.loading = false
          let resultado = data['resultado']['resultados'][0]
          let datos = [Number.parseInt(resultado.CANT_1),
          Number.parseInt(resultado.CANT_2),
          Number.parseInt(resultado.CANT_3),
          Number.parseInt(resultado.CANT_4),
          Number.parseInt(resultado.CANT_5),
          Number.parseInt(resultado.CANT_6),
          Number.parseInt(resultado.CANT_7),
          Number.parseInt(resultado.CANT_8),
          Number.parseInt(resultado.CANT_9),
          Number.parseInt(resultado.CANT_10)]
          let detractores = (Number.parseInt(resultado.CANT_1) +
            Number.parseInt(resultado.CANT_2) +
            Number.parseInt(resultado.CANT_3) +
            Number.parseInt(resultado.CANT_4) +
            Number.parseInt(resultado.CANT_5) +
            Number.parseInt(resultado.CANT_6))
          let pasivos = (Number.parseInt(resultado.CANT_7) +
            Number.parseInt(resultado.CANT_8))
          let promotores = (Number.parseInt(resultado.CANT_9) +
            Number.parseInt(resultado.CANT_10))
          let total = (detractores + pasivos + promotores)
          let intTotalDetractores = 0
          if (detractores > 0) {
            intTotalDetractores = (detractores / total * 100)
          }
          let intTotalPasivos = 0
          if (pasivos > 0) {
            intTotalPasivos = (pasivos / total * 100)
          }
          let intTotalPromotores = 0
          if (promotores > 0) {
            intTotalPromotores = (promotores / total * 100)
          }
          this.doughnutChartData = [intTotalDetractores, intTotalPasivos, intTotalPromotores]
          this.porcentajeIPN = Math.round(intTotalPromotores - intTotalDetractores)
          this.barChartData = [
            { data: datos, label: null },
          ];
        },
        error => {
          this.loading = false
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        }
      )
  }
  getRestaurantes() {
    this.restauranteService.getRestaurantesACTIVOS()
      .subscribe(
        data => {
          this.listRestaurante = data['resultado']['resultados']
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