import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtendedTableComponent } from "./extended/extended-table.component";
import { RegularTableComponent } from "./regular/regular-table.component";
import { RestauranteListComponent } from './restaurante-list/restaurante-list.component';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { EncuestaListComponent } from './encuestas-list/encuesta-list.component';
import { PromocionListComponent } from './promocion-list/promocion-list.component';
import { PublicidadListComponent } from './publicidad-list/publicidad-list.component';
import { TipoComidaListComponent } from './tipocomida-list/tipocomida-list.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { redimirCuponComponent } from './redimirCupon-list/redimirCupon-list.component';
import { DataListComponent } from './data-list/data-list.component';
import { PublicacionesListComponent } from './publicaciones-list/publicaciones-list.component';
import { PermisosListComponent } from './permisos-list/permisos-list.component';
import { InfluencerListComponent } from './influencer-list/influencer-list.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BitacoraListComponent } from './bitacora-list/bitacora-list.component';
import { CentroComercialListComponent } from './centroComercial-list/centroComercial-list.component';
import { ClienteMovilListComponent } from './clienteMovil-list/clienteMovil-list.component';
import { PuntosEstadisticaListComponent } from './puntosEstadistica-list/puntosEstadistica-list.component';
import { CuponListComponent } from './cupon-list/cupon-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'extended',
        component: ExtendedTableComponent,
        data: {
          title: 'Extended Table'
        }
      },
      {
        path: 'regular',
        component: RegularTableComponent,
        data: {
          title: 'Regular Table'
        }
      },
      {
        path: 'restaurante',
        component: RestauranteListComponent,
        data: {
          title: 'Restaurantes'
        }
      },
      {
        path: 'sucursal',
        component: SucursalListComponent,
        data: {
          title: 'Sucursales'
        }
      },
      {
        path: 'usuario',
        component: UsuarioListComponent,
        data: {
          title: 'Usuarios'
        }
      },
      {
        path: 'encuesta',
        component: EncuestaListComponent,
        data: {
          title: 'Encuestas'
        }
      },
      {
        path: 'promocion',
        component: PromocionListComponent,
        data: {
          title: 'Promociones'
        }
      },
      {
        path: 'publicidad',
        component: PublicidadListComponent,
        data: {
          title: 'Publicidades'
        }
      },
      {
        path: 'tipocomida',
        component: TipoComidaListComponent,
        data: {
          title: 'Tipos de Comida'
        }
      },
      {
        path: 'clientes',
        component: ClientesListComponent,
        data: {
          title: 'CLientes'
        }
      },
      {
        path: 'redimirCupon',
        component: redimirCuponComponent,
        data: {
          title: 'Redimir Cupón'
        }
      },
      {
        path: 'publicaciones',
        component: PublicacionesListComponent,
        data: {
          title: 'Publicaciones'
        }
      },
      {
        path: 'data',
        component: DataListComponent,
        data: {
          title: 'Data encuestas'
        }
      },
      {
        path: 'permisos',
        component: PermisosListComponent,
        data: {
          title: 'Permisos'
        }
      },
      {
        path: 'influencer',
        component: InfluencerListComponent,
        data: {
          title: 'Influencer'
        }
      },
      {
        path: 'banner',
        component: BannerListComponent,
        data: {
          title: 'Banner'
        }
      },
      {
        path: 'bitacora',
        component: BitacoraListComponent,
        data: {
          title: 'Bitacora'
        }
      },
      {
        path: 'puntosEstadistica',
        component: PuntosEstadisticaListComponent,
        data: {
          title: 'Estadísticas'
        }
      },
      {
        path: 'cupon',
        component: CuponListComponent,
        data: {
          title: 'Cupón'
        }
      },
      {
        path: 'centroComercial',
        component: CentroComercialListComponent,
        data: {
          title: 'Centro Comercial'
        }
      },
      {
        path: 'clienteMovil',
        component: ClienteMovilListComponent,
        data: {
          title: 'Usuario Móvil'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }
