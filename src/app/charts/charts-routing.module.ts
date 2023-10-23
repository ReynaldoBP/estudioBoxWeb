import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartjsComponent } from "./chartjs/chartjs.component";
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { ChartPreguntasComponent } from './preguntas/preguntas.component';
import { ChartPublicacionComponent } from './publicaciones/publicaciones.component';
import { ChartIPNComponent } from './ipn/ipn.component';
import { ChartLikesComponent } from './likes/likes.component';
import { ChartComparaRestauranteComponent } from './compara-restaurante/compara-restaurante.component';
import { ChartPublicidadComponent } from './publicidad/publicidad.component';
import { ChartEncuestaComponent } from './encuesta/encuesta.component';
import { ChartReportesComponent } from './reportes/reportes.component';
import { ChartREGISTROSCLTComponent } from './registros/registrosClt.component';
const routes: Routes = [
  {
    path: '',     
    children: [
      {
        path: 'chartjs',
        component: ChartjsComponent,
        data: {
          title: 'Chartjs'
        }
      }, 
      {
        path: 'estadistica',
        component: EstadisticaComponent,
        data: {
          title: 'Estadisticas'
        }
      },    
      {
        path: 'encuesta',
        component: ChartEncuestaComponent,
        data: {
          title: 'Grafico de Encuesta Activa'
        }
      },
      {
        path: 'preguntas',
        component: ChartPreguntasComponent,
        data: {
          title: 'Grafico de Preguntas'
        }
      },        
      {
        path: 'publicaciones',
        component: ChartPublicacionComponent,
        data: {
          title: 'Grafico de Publicaciones'
        }
      },    
      {
        path: 'ipn',
        component: ChartIPNComponent,
        data: {
          title: 'Grafico de IPN'
        }
      },
      {
        path: 'registros',
        component: ChartREGISTROSCLTComponent,
        data: {
          title: 'Grafico de Registros'
        }
      },
      {
        path: 'like',
        component: ChartLikesComponent,
        data: {
          title: 'Grafico de Likes'
        }
      },    
      {
        path: 'compara-restaurante',
        component: ChartComparaRestauranteComponent,
        data: {
          title: 'Grafico comparativos entre Restaurantes'
        }
      },    
      {
        path: 'publicidades',
        component: ChartPublicidadComponent,
        data: {
          title: 'Grafico de publicidades'
        }
      },
      {
        path: 'reportes',
        component: ChartReportesComponent,
        data: {
          title: 'Reportes'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule { }
