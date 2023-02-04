import { Component } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chartjs',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.scss']
})

export class ChartPublicidadComponent {


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
  public barChartOptions = chartsData.barChartOptions;
  public barChartLabels = [];
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData =  [{ data: [], label: '' },{ data: [], label: '' },{ data: [], label: '' },{ data: [], label: '' },{ data: [], label: '' }];
  public barChartColors = chartsData.barChartColorsPublicidad;

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

  parametros:any = {
    fechaInicio:'',
    fechaFin:'',
    criterio:'GLOBAL'
  }

  loading:any
  user:any

  constructor(private chartsService:ChartsService,
             private toastr:ToastrService){
        this.user = JSON.parse(localStorage.getItem('usuario'))
  }

  ngOnInit(): void {
    this.parametros.fechaInicio = (new Date(Date.now()-(30*24*60*60*1000))).toISOString().slice(0,10);
    this.parametros.fechaFin = (new Date(Date.now())).toISOString().slice(0,10);
    this.getVistasPublicidad()
  }

  getVistasPublicidad(){
    this.loading = true
    this.chartsService.getVistasPublicidades(this.parametros,this.user.ID_USUARIO)
    .subscribe(
        data =>{
          let resultados = data['resultado']['resultados']    
          /*resultados.reduce((r, a) => {
            console.log("a", a);
            console.log('r', r);
            r[a.ID_PUBLICIDAD] = [...r[a.ID_PUBLICIDAD] || [], a];
            return r;
           }, {});*/
          if(this.parametros.criterio == "GLOBAL"){            
            let dataChart:any=[]            
            /*let obj = { data: resultados.map(item =>Number.parseInt(item.VISTAS)), label: "Publicidades" }
            dataChart.push(obj) */ 

            resultados.forEach(element => {
              let obj = { data: [Number.parseInt(element.VISTAS)], label: element.DESCRIPCION}
              dataChart.push(obj)
            });
            this.barChartData = dataChart
          }else{
            let criterios:any=[]
            let criteriosUsados:any=[]
            resultados.forEach(item =>{            
              if(criteriosUsados.length == 0 || criteriosUsados.filter(elem => elem == item.CRITERIO).length == 0){
                criterios.push(item)
              }
              criteriosUsados.push(item.CRITERIO)        
            })

            let publicidades:any=[]
            let publicidadesUsados:any=[]
            resultados.forEach(item =>{            
              if(publicidadesUsados.length == 0 || publicidadesUsados.filter(elem => elem == item.ID_PUBLICIDAD).length == 0){
                publicidades.push(item)
              }
              publicidadesUsados.push(item.ID_PUBLICIDAD)        
            })         
            
            let dataChart:any=[]
            publicidades.forEach(item =>{
              let obj = { data: resultados.filter(elem => elem.ID_PUBLICIDAD == item.ID_PUBLICIDAD).map(res => Number.parseInt(res.VISTAS)), label: item.DESCRIPCION }
              dataChart.push(obj)            
            })
            this.barChartData = dataChart
            this.barChartLabels = criterios.map(item => item.CRITERIO)
          }
          this.loading= false
        },
        error =>{          
          this.loading= false
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        }
    )
  }

}