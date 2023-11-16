import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ParamService } from 'app/_services/param.service';
import { ToastrService } from 'ngx-toastr';
import { EncuestaService } from 'app/_services/encuesta.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { AreaService } from 'app/_services/area.service';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-chartjs',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})

export class ChartPreguntasComponent implements OnInit {

  arrayMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
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

            intTotal = intTotal+parseFloat(datasetData[tooltipItem.index]);
          }
          // Aquí puedes agregar el dato adicional que deseas mostrar
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const value = dataset.data[tooltipItem.index];
          const nombre = dataset.label;
          //Calculamos porcentajes
          porcentaje = (value/intTotal)*100;
          porcentaje = Math.round(porcentaje * 100) / 100;
          const datoAdicional1 = nombre+": " + value; 
          const datoAdicional2 = "Porcentaje: " + porcentaje+'%'; 
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
  /*_barChartDataPreguntas: any[] = [
    { data: [], label: 'TODAS' }
  ];
    public barChartData = this._barChartDataPreguntas;*/
  public barChartData = [
    { data: [], label: null },
  ];

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
    intIdArea: "",
    intIdUsuario: '',
    intLimite: '',
    arrayPregunta: '',
    intIdPregunta: '',
    strEdad: '',
    strGenero: '',
    strHorario: '',
    intIdEncuesta: '',
    strEstadistica: ""
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
  arrayEncuestas
  arraySelectMes: any[] = []
  objSelectEncuesta: any = null
  objSelectPregunta: any = null
  objSelectSucursal: any
  objSelectArea: any = null
  arraySucursal: any
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
    private objEncuestaService: EncuestaService,
    private objAreaService: AreaService,
    private objSucursalService: SucursalService) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
    this.descripcionOrigin = "Acceda a las estadísticas de preguntas individuales. El gráfico presenta puntuaciones promediadas sobre todas las respuestas de sus clientes. Esta sección le permite elegir diferentes variables para visualizar data estadística según su interés y realizar comparativos."
    this.descripcion = "Acceda a las estadísticas de preguntas individuales. El gráfico presenta puntuaciones promediadas sobre todas las respuestas de sus clientes. Esta sección le permite elegir diferentes variables para visualizar data estadística según su interés y realizar comparativos."
  }

  ngOnInit(): void {
    const objFecha = new Date();
    const intMesActual = objFecha.getMonth();
    this.arraySelectMes = [this.arrayMeses[intMesActual]]
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
    this.objSelectEncuesta = null
    this.arrayParametrosEncuestas.intIdSucursal = ''
    this.arrayParametrosEncuestas.intIdArea = ''
    if (this.objSelectSucursal != undefined) {
      this.arrayParametrosEncuestas.intIdSucursal = this.objSelectSucursal
    }
    if (this.objSelectArea != undefined) {
      this.arrayParametrosEncuestas.intIdArea = this.objSelectArea
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
      this.arrayParametrosPreguntas.intIdEncuesta = this.objSelectEncuesta
    }
    if (this.arrayParametrosPreguntas.intIdEncuesta != undefined) {
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
    this.arrayParametrosEncuestas.intIdSucursal = ''
    if (this.objSelectSucursal != undefined) {
      this.arrayParametrosEncuestas.intIdSucursal = this.objSelectSucursal
    }
    if (this.objSelectArea != undefined) {
      this.arrayParametrosEncuestas.intIdArea = this.objSelectArea
    }
    if (this.objSelectEncuesta != undefined) {
      this.arrayParametrosEncuestas.intIdEncuesta = this.objSelectEncuesta
    }
    if (this.objSelectPregunta != undefined) {
      this.arrayParametrosEncuestas.intIdPregunta = this.objSelectPregunta
      this.arrayParametrosEncuestas.strEstadistica = "Conceptual"
    }
    if (this.arraySelectMes != undefined) {
      this.arrayParametrosEncuestas.arrayMes = this.arraySelectMes
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
            let intAcumulador = 0
            data["arrayData"] = this.completarConCeros(data)
            data["arrayData"].forEach(arrayItemData => {
              if (arrayItemData.length > 0) {
                this.barChartLabels = []
                arrayItemData.forEach(arrayItemPregunta => {
                  intAcumulador += Number.parseInt(arrayItemPregunta.strPromedio)
                });
                arrayItemData.forEach(arrayItemPregunta => {
                  let floatPorcentaje = (arrayItemPregunta.strPromedio / intAcumulador) * 100
                  console.log((arrayItemPregunta.strPromedio / intAcumulador) * 100)
                  arrayPromedio.push(arrayItemPregunta.strPromedio)
                  this.barChartLabels.push(arrayItemPregunta.strLabel)
                  strPregunta = this.arrayMeses[Number.parseInt(arrayItemPregunta.intMes) - 1]
                  arrayValidador.push(arrayItemPregunta.strLabel + "-" + floatPorcentaje)
                });
                console.log("intAcumulador: " + intAcumulador)
                //(barra.valor / total) * 100
                obj = { data: arrayPromedio, label: strPregunta, arrayValidador: arrayValidador }
                console.log(obj)
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
                console.log(arrayItemObj.data)

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

}