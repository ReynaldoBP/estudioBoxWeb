import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { value } from 'app/shared/data/dropdowns';
import { ChartsService } from 'app/_services/charts.service';
import { ParamService } from 'app/_services/param.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chartjs',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})

export class ChartPublicacionComponent implements OnInit{

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
  public barChartOptions = chartsData.barChartOptionsPublicacion;
  public barChartLabels = [];
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = chartsData.barChartDataPublicacion;
  public barChartColors //= chartsData.barChartColorsPublicaciones;

  // Doughnut
  public doughnutChartLabels = chartsData.doughnutChartLabelsIPN;
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

  private chartHeightValue:number
  getLessValueIG(){
    let valueporc:number = 30
    if(valueporc > 25){
      this.chartHeightValue = 600
    }else{
      this.chartHeightValue = 700
    }
    
    //this.barChartData[1].data
  }

  parametros:any = {
    genero:'',
    horario:'',
    edad:'',
    pais:'',
    provincia:'',
    ciudad:'',
    parroquia:'',
    limite:'',
    pregunta:''
  }
  listPais:any
  listCiudad:any
  listProvincia:any
  listParroquia:any
  listHorarios:any
  listEdades:any
  loading:any=false;
  listPreguntas:any
  user:any
  descripcionOrigin:string
  descripcion:string
  constructor(private chartsService:ChartsService,
    private paramService:ParamService,
    private toastr:ToastrService){
      this.user = JSON.parse(localStorage.getItem('usuario'))
  }

  ngOnInit(): void {
    this.getLessValueIG()
    let canvas : any = document.getElementById("chartPublicacion");
    let ctx = canvas.getContext("2d");
    console.log(canvas.height)
    //let gradientIG = ctx.createLinearGradient(0, 0, this.chartHeightValue, this.chartHeightValue);
    let gradientIG = ctx.createLinearGradient(0, 0, 0, 500);
    gradientIG.addColorStop(0.5, 'rgba(213, 0, 249,1)');
    gradientIG.addColorStop(0.8, 'rgba(245, 127, 23,1)');

    let gradientFB = ctx.createLinearGradient(0, 0, 0, 500);
    gradientFB.addColorStop(0.5, 'rgba(21, 101, 192,1)');   
    gradientFB.addColorStop(0.8, 'rgba(13, 60, 115,1)');

    let gradientTW = ctx.createLinearGradient(0, 0, 0, 500);
    gradientTW.addColorStop(0.5, 'rgba(0, 172, 237,1)');   
    gradientTW.addColorStop(0.8, 'rgba(2, 119, 189,1)');

    let _barChartColors: Array<any> = [
      {
        backgroundColor: gradientFB,
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {
        backgroundColor: gradientIG,
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {
        backgroundColor: gradientTW,
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      
    ];

    this.barChartColors = _barChartColors
    this.parametros.limite = "3"
    this.getPais()
    this.getHorarios()
    this.getEdades()
    this.descripcionOrigin ="Acceda a las estadísticas de las publicaciones en redes sociales (Facebook - Instagram - Twitter) que sus clientes compartieron. Esta sección le permite elegir diferentes variables para visualizar data estadística según su interés y realizar comparativos. "
    this.descripcion = "Acceda a las estadísticas de las publicaciones en redes sociales (Facebook - Instagram - Twitter) que sus clientes compartieron."
  }

  vermas(){
    if(this.descripcion == this.descripcionOrigin){
        this.descripcion = "Acceda a las estadísticas de las publicaciones en redes sociales (Facebook - Instagram - Twitter) que sus clientes compartieron."
    }else{
        this.descripcion = this.descripcionOrigin
    }        
  }

  getPais(){
    this.paramService.getPais().subscribe(
      data => {
          if(data != null){
              this.listPais = data['resultado']['pais'];     
              this.parametros.pais = this.listPais.filter(item => item.PAIS_NOMBRE == "ECUADOR")[0].ID_PAIS 
              this.getProvincia(this.parametros.pais)                 
          }
      },
      error =>{
        this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
      });
  }

  getProvincia(value:any){
    this.parametros.provincia = ''
    this.parametros.ciudad = ''
    this.parametros.parroquia = ''
    this.getPublicacionesPromedio()
    this.paramService.getProvincia(value).subscribe(
      data => {
          if(data != null){
              this.listProvincia = data['resultado']['provincia'];
          }
      },
      error =>{
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getCiudad(value:any){
    this.parametros.ciudad = ''
    this.parametros.parroquia = ''
    this.getPublicacionesPromedio()
    this.paramService.getCiudad(value).subscribe(
      data => {
          if(data != null){
              this.listCiudad = data['resultado']['ciudad'];     
          }
      },
      error =>{
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getParroquia(value:any){
    this.parametros.parroquia = ''
    this.getPublicacionesPromedio()
    this.paramService.getParroquia(value).subscribe(
      data => {
          if(data != null){
              this.listParroquia = data['resultado']['Parroquia']; 
          }
      },
      error =>{
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getHorarios(){
    this.paramService.getParametro('HORARIO').subscribe(
      data => {
          if(data != null){
              this.listHorarios = data['resultado']['resultados']; 
          }
      },
      error =>{
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getEdades(){
    this.paramService.getParametro('EDAD').subscribe(
      data => {
          if(data != null){
              this.listEdades = data['resultado']['resultados']; 
          }
      },
      error =>{
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }
  

  getPublicacionesPromedio(){
    this.loading = true
    this.chartsService.getPublicacionesPromedio(this.parametros,this.user.ID_USUARIO)
    .subscribe(
        data =>{
          this.loading= false
          let resultados = data['resultado']['resultados']
          this.barChartData[0].data = resultados.map(item => item.CANT_FACEBOOK)
          this.barChartData[1].data = resultados.map(item => item.CANT_INSTAGRAM)
          this.barChartData[2].data = resultados.map(item => item.CANT_TWITTER)          
          this.barChartLabels = resultados.map(item => this.monthNames[Number.parseInt(item.MES)-1])
        },
        error =>{          
          this.loading= false
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        }
    )
  }

}