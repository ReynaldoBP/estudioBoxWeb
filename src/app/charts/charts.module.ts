import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ChartsModule } from 'ng2-charts';
import { ChartistModule} from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsRoutingModule } from "./charts-routing.module";

import { ChartjsComponent } from "./chartjs/chartjs.component";
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { ChartPreguntasComponent } from './preguntas/preguntas.component';
import { ChartPublicacionComponent } from './publicaciones/publicaciones.component';
import { ChartIPNComponent } from './ipn/ipn.component';
import { ChartREGISTROSCLTComponent } from './registros/registrosClt.component';

import { ChartLikesComponent } from './likes/likes.component';
import 'chartjs-plugin-labels';
import { ChartComparaRestauranteComponent } from './compara-restaurante/compara-restaurante.component';
import { ChartPublicidadComponent } from './publicidad/publicidad.component';
import { ChartEncuestaComponent } from './encuesta/encuesta.component';
import { ChartReportesComponent } from './reportes/reportes.component';
import { PipeReporte } from 'app/_pipes/PipeReporte';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
    imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        ChartsRoutingModule,
        ChartsModule,
        ChartistModule,
        NgxChartsModule
    ],   
    declarations: [
        ChartjsComponent,
        EstadisticaComponent,
        ChartPreguntasComponent,
        ChartPublicacionComponent,
        ChartIPNComponent,
        ChartREGISTROSCLTComponent,
        ChartLikesComponent,
        ChartComparaRestauranteComponent,
        ChartPublicidadComponent,
        ChartEncuestaComponent,
        ChartReportesComponent,
        PipeReporte
    ],   
})
export class ChartsNg2Module { }
