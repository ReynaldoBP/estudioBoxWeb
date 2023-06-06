import { Component } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';
import { ChartsService } from 'app/_services/charts.service';
import { ParamService } from 'app/_services/param.service';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from 'app/_services/sucursal.service';
import { AreaService } from 'app/_services/area.service';
import { EmpresaService } from 'app/_services/empresa.service';
@Component({
  selector: 'app-chartjs',
  templateUrl: './ipn.component.html',
  styleUrls: ['./ipn.component.scss']
})

export class ChartIPNComponent {
  arrayParametrosSucursal: any = {
    strEstado: "ACTIVO",
    intIdUsuario: ""
  }
  arrayParametrosArea: any = {
    strEstado: "ACTIVO",
    intIdUsuario: "",
    intIdSucursal: ""
}
  arraySucursal: any
  arrayArea
  arrayParametrosIpn: any = {
    strFechaInicio: "",
    strFechaFin: "",
    strGenero: "",
    strHorario: "",
    strEdad: "",
    intIdSucursal: "",
    intIdEmpresa: "",
    intIdUsuario: "",
    intIdArea: ""
    
  }
  arrayHorarios: any
  arrayEdades: any
  objLoading: any = false;

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

  intPorcentajeIPN: number
  user: any
  descripcionOrigin: string
  descripcion: string
  objSelectEmpresa: any = null
  arrayEmpresa: any
  objSelectSucursal: any
  objSelectArea: any = null
  objParametrosEmpresa: any = {
    strEstado: "ACTIVO",
    strContador: "NO"
}
  constructor(private objChartsService: ChartsService,
    private objEmpresaService: EmpresaService,
    private objAreaService: AreaService,
    private objSucursalService: SucursalService,
    private objParametroService: ParamService,
    private toastr: ToastrService) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
    console.log(this.user);
  }

  ngOnInit(): void {
    this.arrayParametrosIpn.strFechaInicio = (new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))).toISOString().slice(0, 10);
    this.arrayParametrosIpn.strFechaFin = (new Date(Date.now())).toISOString().slice(0, 10);
    this.getHorarios()
    this.getEdades()
    this.getEmpresas()
    this.descripcionOrigin = "El Índice Promotor Neto permite conocer la lealtad de los clientes de una empresa basándose en las recomendaciones que se fomentan entre la clientela."
    this.descripcion = "El Índice Promotor Neto permite conocer la lealtad de los clientes de una empresa basándose en las recomendaciones que se fomentan entre la clientela. "
    if (this.user.strTipoRol == "EMPRESA") {
      this.getSucursales()
      this.getArea()
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

  getResultadoProIPN() {
    this.objLoading = true
    this.arrayParametrosIpn.intIdUsuario = this.user.intIdUsuario
    this.arrayParametrosIpn.intIdEmpresa = this.objSelectEmpresa
    this.arrayParametrosIpn.intIdSucursal = this.objSelectSucursal
    this.arrayParametrosIpn.intIdArea     = this.objSelectArea
    if (this.objSelectSucursal != undefined) {
      this.arrayParametrosIpn.intIdSucursal = this.objSelectSucursal
    }
    if (this.objSelectArea != undefined) {
      this.arrayParametrosIpn.intIdArea = this.objSelectArea
    }
    this.objChartsService.getResultadoProIPN(this.arrayParametrosIpn)
      .subscribe(
        data => {
          this.objLoading = false
          let resultado = data["arrayData"]['resultados'][0]
          let datos = [Number.parseInt(resultado.intCant1),
          Number.parseInt(resultado.intCant2),
          Number.parseInt(resultado.intCant3),
          Number.parseInt(resultado.intCant4),
          Number.parseInt(resultado.intCant5),
          Number.parseInt(resultado.intCant6),
          Number.parseInt(resultado.intCant7),
          Number.parseInt(resultado.intCant8),
          Number.parseInt(resultado.intCant9),
          Number.parseInt(resultado.intCant10)]
          let detractores = (Number.parseInt(resultado.intCant1) +
            Number.parseInt(resultado.intCant2) +
            Number.parseInt(resultado.intCant3) +
            Number.parseInt(resultado.intCant4) +
            Number.parseInt(resultado.intCant5) +
            Number.parseInt(resultado.intCant6))
          let pasivos = (Number.parseInt(resultado.intCant7) +
            Number.parseInt(resultado.intCant8))
          let promotores = (Number.parseInt(resultado.intCant9) +
            Number.parseInt(resultado.intCant10))
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
          this.intPorcentajeIPN = Math.round(intTotalPromotores - intTotalDetractores)
          this.barChartData = [
            { data: datos, label: null },
          ];
        },
        error => {
          this.objLoading = false
          this.toastr.warning("Error en el servidor, comuniquise con el dpto. de sistemas")
        }
      )
  }

  getEmpresas() {
    this.objEmpresaService.getEmpresa(this.objParametrosEmpresa)
    .subscribe(
        data => {
            if (data['intStatus'] != 200) {
                this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
            } else {
              console.log(data)
                this.arrayEmpresa = data['arrayEmpresa']
            }
        },
        error => {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
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
  getArea() {
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

}