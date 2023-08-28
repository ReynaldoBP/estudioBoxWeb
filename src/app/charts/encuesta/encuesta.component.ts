import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ParamService } from 'app/_services/param.service';
import { AreaService } from 'app/_services/area.service';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from 'app/_services/sucursal.service';
import { EncuestaService } from 'app/_services/encuesta.service';
import { Color } from 'ng2-charts';
@Component({
  selector: 'app-chartjs',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})

export class ChartEncuestaComponent implements OnInit {
  arrayMeses = [{ mes: "Enero", numMes: 1 },
                { mes: "Febrero", numMes: 2 },
                { mes: "Marzo", numMes: 3 },
                { mes: "Abril", numMes: 4 },
                { mes: "Mayo", numMes: 5 },
                { mes: "Junio", numMes: 6 },
                { mes: "Julio", numMes: 7 },
                { mes: "Agosto", numMes: 8 },
                { mes: "Septiembre", numMes: 9 },
                { mes: "Octubre", numMes: 10 },
                { mes: "Noviembre", numMes: 11 },
                { mes: "Diciembre", numMes: 12 }];
  arrayParametrosEncuestas: any = {
    intIdSucursal: '',
    arrayIdSucursal: [],
    intIdArea: "",
    strArea: "",
    intIdUsuario: '',
    intLimite: '',
    arrayPregunta: '',
    intIdPregunta: '',
    strPregunta:'',
    strEdad: '',
    strGenero: '',
    strHorario: '',
    intIdEncuesta: '',
    strEncuesta:'',
    boolAgrupar: "NO",
    strEstadistica:""
  }
  arrayParametrosPreguntas: any = {
    intIdEncuesta: "",
    strEncuesta:"",
    boolAgrupar: "NO"
  }
  arrayHorarios: any
  arrayEdades: any
  loading: any = false;
  arrayPreguntas: any
  user: any

  // barChart
  public barChartOptions = {
    scaleShowVerticalLines: false,
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
          display: true
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
  arrayTotalEncuestas: any[] = [];
  arrayEncuestas
  strSelectMes:any
  objSelectMes:any
  objSelectEncuesta: any = null
  objSelectPregunta: any = null
  objSelectSucursal: any
  arraySelectSucursal: any[] = []
  objSelectArea: any = null
  arraySucursal: any
  arrayArea: any
  arrayParametrosSucursal: any = {
    strEstado: "ACTIVO",
    intIdUsuario: ""
  }
  arrayParametrosArea: any = {
    strEstado: "ACTIVO",
    intIdUsuario: "",
    intIdSucursal: "",
    arrayIdSucursal: [],
    boolAgrupar: "NO"
  }
  constructor(private objChartsService: ChartsService,
    private objParametroService: ParamService,
    private toastr: ToastrService,
    private objEncuestaService: EncuestaService,
    private objAreaService: AreaService,
    private objSucursalService: SucursalService) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
  }

  ngOnInit(): void {
    const objFecha = new Date();
    this.strSelectMes = (objFecha.getMonth() + 1)
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
    this.arrayParametrosEncuestas.intIdUsuario = this.user.intIdUsuario
    this.descripcionOrigin = ""
    this.descripcion = "Acceda a las estadísticas de la encuesta general. El gráfico presenta puntuaciones promediadas sobre todas las respuestas de sus clientes. Esta sección le permite elegir diferentes variables para visualizar data estadística según su interés y realizar comparativos. "
    this.getSucursales()
    this.getHorarios()
    this.getEdades()
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
  getEncuesta() {
    this.objSelectEncuesta = null
    this.arrayParametrosEncuestas.arrayIdSucursal = []
    this.arrayParametrosEncuestas.strArea = ''
    if (this.arraySelectSucursal != undefined) {
      this.arrayParametrosEncuestas.arrayIdSucursal = this.arraySelectSucursal
      this.arrayParametrosEncuestas.boolAgrupar = "SI"
    }
    if (this.objSelectArea != undefined) {
      this.arrayParametrosEncuestas.strArea = this.objSelectArea
    }
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
    this.objSelectPregunta = null
    if (this.objSelectEncuesta != undefined) {
      this.arrayParametrosPreguntas.strEncuesta = this.objSelectEncuesta
      this.arrayParametrosPreguntas.boolAgrupar = "SI"
    }
    if (this.arrayParametrosPreguntas.strEncuesta != undefined) {
      this.objEncuestaService.getPregunta(this.arrayParametrosPreguntas).subscribe(
        data => {
          if (data["intStatus"] == 200) {
            console.log(data['arrayPregunta'])
            this.arrayPreguntas = data['arrayPregunta'].filter(item => item.strTipoOpcionRespuesta != "ABIERTA" && item.intCantidadEstrellas != 10)
          } else {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          }
        },
        error => {
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        });
    }
  }
  getResultadoProPregunta() {
    this.barChartData[0].data = []
    this.barChartData[0].label = ""
    this.barChartLabels = []
    this.loading = true
    if (this.objSelectEncuesta != undefined) {
      this.arrayParametrosEncuestas.strEncuesta = this.objSelectEncuesta
    }
    if (this.strSelectMes !== undefined) {
      this.objSelectMes = this.arrayMeses.find(mes => mes.numMes == this.strSelectMes)
      this.arrayParametrosEncuestas.arrayMes = [this.objSelectMes.mes]
    }
    if (this.objSelectPregunta != undefined) {
      this.arrayParametrosEncuestas.strPregunta = this.objSelectPregunta
      this.arrayParametrosEncuestas.strEstadistica = "Comparativa"
    }
    this.objChartsService.getResultadoProPregunta(this.arrayParametrosEncuestas)
      .subscribe(
        data => {
          this.loading = false
          if (data["intStatus"] == 200) {
            this.barChartLabels = []
            var obj = {}
            var arrayPromedio = []
            var strPregunta = ""
            var arrayValidador = []
            var arrayObj: any = []
            console.log("------------")
            console.log(data["arrayData"])
            var strSucursal = ""
            data["arrayData"].forEach(arrayItemData => {
              if (arrayItemData.length > 0) {
                this.barChartLabels = []
                arrayItemData.forEach(arrayItemPregunta => {
                  arrayPromedio.push(arrayItemPregunta.strPromedio)
                  this.barChartLabels.push(arrayItemPregunta.strLabel)
                  strSucursal = arrayItemPregunta.strSucursal
                  arrayValidador.push(arrayItemPregunta.strLabel)
                });
                obj = { data: arrayPromedio, label: strSucursal}
                arrayObj.push(obj)
                arrayPromedio = []
                arrayValidador = []
              }
            })
            if (arrayObj.length > 0) {
              this.barChartData.shift()
              this.barChartData[100]
              let intContador = 0
              arrayObj.forEach(arrayItemObj => {
                this.barChartData[intContador] = { data: arrayItemObj.data, label: arrayItemObj.label }
                this.barChartColors[intContador] = this.getRandomColor();
                intContador++
              })
            }
            else {
              this.barChartData[0].data = []
              this.barChartData[0].label = ""
              this.barChartLabels = []
            }
          } else {
            if (data["intStatus"] == 204 && data["strMensaje"].length > 0) {
              this.toastr.warning(data["strMensaje"], 'Error')
            }
            else {
              this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
            }
            this.loading = false
          }
        },
        error => {
          this.loading = false
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        }
      )
  }
  getRandomColor(): Color {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const alpha = 1; // Valor fijo de opacidad (1 = completamente opaco)

    return {
      backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha})`
    };
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
    this.objSelectArea = null
    if (this.arraySelectSucursal != undefined) {
      this.arrayParametrosArea.arrayIdSucursal = this.arraySelectSucursal
      this.arrayParametrosArea.boolAgrupar = "SI"
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