import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ParamService } from 'app/_services/param.service';
import { ToastrService } from 'ngx-toastr';
import { RestauranteService } from 'app/_services/restaurante.service';
import { TipoComidaService } from 'app/_services/tipocomida.service';

@Component({
  selector: 'app-chartjs',
  templateUrl: './compara-restaurante.component.html',
  styleUrls: ['./compara-restaurante.component.scss']
})

export class ChartComparaRestauranteComponent implements OnInit {

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
  public barChartOptions = chartsData.barChartOptionsCompRest;
  public barChartLabels;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = [
    { data: [], label: 'Mi restaurante' },
    { data: [], label: 'Otros restaurantes' },
  ];
  public barChartColors = chartsData.barChartColorsCompRest;

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

  parametros:any = {
    idrestaurante:'',
    idtipocomida:'',
    pais:'',
    provincia:'',
    ciudad:'',
    parroquia:'',
    limite:''
  }

  listPais:any
  listCiudad:any
  listProvincia:any
  listParroquia:any
  listRestaurante:any
  listTipoComida:any

  user:any
  loading:boolean
  constructor(private chartsService:ChartsService,
    private paramService:ParamService,
    private toastr:ToastrService,
    private restauranteService:RestauranteService,
    private tipocomidaservice:TipoComidaService){
      this.user = JSON.parse(localStorage.getItem('usuario'))
  }

  ngOnInit(){
    this.parametros.limite = "1"
    this.barChartLabels = ["Septiembre"];
    if(this.user.DESCRIPCION_TIPO_ROL == 'ADMINISTRADOR'){
      this.getRestaurantes()
    }else{
      this.getRestaurantesPorUsuario(this.user.ID_USUARIO)
    }
    this.getTiposComida()
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  getRestaurantesPorUsuario(idusuario:string){
    this.restauranteService.getRestaurantesByUsuario(idusuario)
        .subscribe(
            data =>{
                this.listRestaurante = data['resultado']['resultados']
                if(this.listRestaurante != null){
                  this.parametros.idrestaurante = this.listRestaurante[0].ID_RESTAURANTE
                  this.getComparacionRestaurantes()
                }
            },
            error =>{
                
            }
        )
  } 

  getRestaurantes(){
    this.restauranteService.getRestaurantesACTIVOS()
        .subscribe(
            data =>{
                this.listRestaurante = data['resultado']['resultados']
                if(this.listRestaurante != null){
                  this.parametros.idrestaurante = this.listRestaurante[0].ID_RESTAURANTE
                }
            },
            error =>{
                
            }
        )
  }

  getTiposComida(){
    this.tipocomidaservice.getTiposComida(1)
    .subscribe(
        data =>{
            this.listTipoComida = data['resultado']['tipoComida']
        },
        error =>{
            
        }
    )
  }

  getComparacionRestaurantes(){
    if(this.parametros.idrestaurante != ''){
      this.loading = true
      this.chartsService.getComparativosRestaurantes(this.parametros)
      .subscribe(
          data =>{
            this.loading= false
            let resultados = data['resultado']['resultados']
            this.barChartData[0].data = resultados.map(item => item.MI_PROMEDIO)
            this.barChartData[1].data = resultados.map(item => item.OTRO_PROMEDIO)        
            this.barChartLabels = resultados.map(item => this.monthNames[Number.parseInt(item.MES)-1])
          },
          error =>{          
            this.loading= false
            this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
          }
      )
    }    
  }

}