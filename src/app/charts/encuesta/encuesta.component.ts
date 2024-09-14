import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ParamService } from 'app/_services/param.service';
import { AreaService } from 'app/_services/area.service';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from 'app/_services/sucursal.service';
import { EncuestaService } from 'app/_services/encuesta.service';
import { Color } from 'ng2-charts';
import { ExcelService } from 'app/_services/excel.service';
@Component({
  selector: 'app-chartjs',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})

export class ChartEncuestaComponent implements OnInit {
  date: any = new Date();
  intAnio: number = this.date.getFullYear()
  arrayAnio = [
    { strAnio: "2023", intIdAnio: 2023 },
    { strAnio: "2024", intIdAnio: 2024 },
    { strAnio: "2025", intIdAnio: 2025 },
    { strAnio: "2026", intIdAnio: 2026 },
    { strAnio: "2027", intIdAnio: 2027 }
  ];
  objobjLoading: any = false;
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
    strPregunta: '',
    strEdad: '',
    strGenero: '',
    strHorario: '',
    intIdEncuesta: '',
    strEncuesta: '',
    boolAgrupar: "NO",
    strEstadistica: ""
  }
  arrayParametrosPreguntas: any = {
    intIdEncuesta: "",
    strEncuesta: "",
    boolAgrupar: "NO"
  }
  arrayHorarios: any
  arrayEdades: any
  objLoading: any = false;
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
      enabled: true,
      callbacks: {
        title: (tooltipItems, data) => {
          return data.labels[tooltipItems[0].index];
        },
        label: (tooltipItem, data) => {
          var intTotal = 0;
          var porcentaje = 0;
          for (let i = 0; i < data.datasets.length; i++) {
            const dataset = data.datasets[i];
            // Acceder a las propiedades de cada dataset
            const label = dataset.label; // Etiqueta del dataset
            const datasetData = dataset.data; // Datos del dataset

            intTotal = intTotal + parseFloat(datasetData[tooltipItem.index]);
          }
          // Aquí puedes agregar el dato adicional que deseas mostrar
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const value = dataset.data[tooltipItem.index];
          const nombre = dataset.label;
          //Calculamos porcentajes
          porcentaje = (value / intTotal) * 100;
          porcentaje = Math.round(porcentaje * 100) / 100;
          const datoAdicional1 = nombre + ": " + value;
          const datoAdicional2 = "Porcentaje: " + porcentaje + '%';
          return [datoAdicional1, datoAdicional2];;
        },
      },
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
  strSelectMes: any
  objSelectMes: any
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
    private objExportarDataService: ExcelService,
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
          this.objSelectEncuesta = this.arrayEncuestas[0].strTitulo
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
    this.arrayParametrosEncuestas.intAnio = (this.intAnio != undefined) ? this.intAnio : this.date.getFullYear().toString()
    this.barChartData[0].data = []
    this.barChartData[0].label = ""
    this.barChartLabels = []
    this.objLoading = true
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
          this.objLoading = false
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
            //console.log(this.completarConCeros(data))
            data["arrayData"] = this.completarConCeros(data)
            data["arrayData"].forEach(arrayItemData => {
              if (arrayItemData.length > 0) {
                this.barChartLabels = []

                arrayItemData.forEach(arrayItemPregunta => {
                  arrayPromedio.push(arrayItemPregunta.strPromedio)
                  this.barChartLabels.push(arrayItemPregunta.strLabel)
                  strSucursal = arrayItemPregunta.strSucursal
                  arrayValidador.push(arrayItemPregunta.strLabel)
                });
                obj = { data: arrayPromedio, label: strSucursal }
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
                //this.barChartData[intContador] = { data: arrayItemObj.data, label: 'Pruebas' }
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
            this.objLoading = false
          }
        },
        error => {
          this.objLoading = false
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        }
      )
  }

  completarConCeros(data) {
    const allPreguntas: string[] = [];

    // Obtener todas las etiquetas únicas en todo el conjunto de datos
    for (const dataArray of data.arrayData) {
      for (const item of dataArray) {
        if (!allPreguntas.includes(item.strLabel)) {
          allPreguntas.push(item.strLabel);
        }
      }
    }

    // Ordenar las etiquetas según el orden deseado
    allPreguntas.sort((a, b) => {
      // Define el orden deseado aquí
      const order = ["Hospitalaria", "Emergencia", "Ambulatoria"];
      return order.indexOf(a) - order.indexOf(b);
    });

    // Crear un nuevo array de datos con los valores completados y ordenados
    const newDataArray = [];
    for (const dataArray of data.arrayData) {
      const newDataArrayItem = [...dataArray];
      for (const label of allPreguntas) {
        const existingItem = dataArray.find((item) => item.strLabel === label);
        if (!existingItem) {
          newDataArrayItem.push({
            strPregunta: dataArray[0].strPregunta,
            strLabel: label,
            strSucursal: dataArray[0].strSucursal,
            strPromedio: "0"
          });
        }
      }
      // Ordenar el subarray newDataArrayItem por strLabel
      newDataArrayItem.sort((a, b) => a.strLabel.localeCompare(b.strLabel));
      newDataArray.push(newDataArrayItem);
    }
    return newDataArray
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

  getExportarCsv() {
    this.objobjLoading = true
    console.log("getExportarCSV")
    console.log(this.arrayParametrosEncuestas)
    if (this.objSelectEncuesta != undefined) {
      this.arrayParametrosEncuestas.strEncuesta = this.objSelectEncuesta
    }
    else {
      this.toastr.warning("Estimado usuario por favor seleccione una encuesta.")
    }
    if (this.arraySelectSucursal != undefined) {
      this.arrayParametrosEncuestas.arrayIdSucursal = this.arraySelectSucursal
    }
    if (this.objSelectArea != undefined) {
      this.arrayParametrosEncuestas.strArea = this.objSelectArea
    }
    if (this.strSelectMes !== undefined) {
      this.objSelectMes = this.arrayMeses.find(mes => mes.numMes == this.strSelectMes)
      this.arrayParametrosEncuestas.arrayMes = [this.objSelectMes.mes]
    }
    this.objEncuestaService.getReporteEstPorSucursal(this.arrayParametrosEncuestas).subscribe(
      data => {
        this.objobjLoading = false
        if (data["intStatus"] == 200) {
          const combinedData: any[] = [];
          for (const jsonData of data["arrayData"].resultados) {
            combinedData.push(...jsonData, {}); // Agrega el objeto JSON y una fila en blanco
          }
          this.objExportarDataService.exportAsExcelFile(combinedData, this.arrayParametrosEncuestas.strEncuesta)
        }
        else {
          this.toastr.warning("Error al Generar Reportes")
        }
      },
      error => {
        this.objLoading = false
        this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
      }
    )
  }

}