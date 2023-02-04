import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationFormsComponent } from "./validation/validation-forms.component";
import { WizardFormsComponent } from "./wizard/wizard-forms.component";
import { BasicComponent } from './layouts/basic/basic.component';
import { HorizontalComponent } from './layouts/horizontal/horizontal.component';
import { HiddenLabelsComponent } from './layouts/hidden-labels/hidden-labels.component';
import { FormActionsComponent } from './layouts/form-actions/form-actions.component';
import { BorderedComponent } from './layouts/bordered/bordered.component';
import { StripedRowsComponent } from './layouts/striped-rows/striped-rows.component';
import { InputsComponent } from './elements/inputs/inputs.component';
import { InputGroupsComponent } from './elements/input-groups/input-groups.component';
import { InputGridComponent } from './elements/input-grid/input-grid.component';
import { RestauranteComponent } from './layouts/restaurante/restaurante.component';
import { EncuestaComponent } from './layouts/encuesta/encuesta.component';
import { SucursalComponent } from './layouts/sucursal/sucursal.component';
import { UsuarioComponent } from './layouts/usuario/usuario.component';
import { PublicidadComponent } from './layouts/publicidad/publicidad.component';
import { PromocionComponent } from './layouts/promocion/promocion.component';
import { TipoComidaComponent } from './layouts/tipocomida/tipocomida.component';
import { InfluencerComponent } from './layouts/influencer/influencer.component';
import { BannerComponent } from './layouts/banner/banner.component';
import { CuponComponent } from './layouts/cupon/cupon.component';
import { CentroComercialComponent } from './layouts/centroComercial/centroComercial.component';
import { ClienteMovilComponent } from './layouts/clienteMovil/clienteMovil.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        component: BasicComponent,
        data: {
          title: 'Basic Forms'
        }
      },
      {
        path: 'horizontal',
        component: HorizontalComponent,
        data: {
          title: 'Horizontal Forms'
        }
      },
      {
        path: 'hidden-labels',
        component: HiddenLabelsComponent,
        data: {
          title: 'Hidden Labels'
        }
      },
      {
        path: 'form-actions',
        component: FormActionsComponent,
        data: {
          title: 'Form Actions'
        }
      },
      {
        path: 'bordered',
        component: BorderedComponent,
        data: {
          title: 'Bordered Forms'
        }
      },
      {
        path: 'striped-rows',
        component: StripedRowsComponent,
        data: {
          title: 'Striped Rows'
        }
      },
      {
        path: 'inputs',
        component: InputsComponent,
        data: {
          title: 'Inputs'
        }
      },
      {
        path: 'input-groups',
        component: InputGroupsComponent,
        data: {
          title: 'Input Groups'
        }
      },
      {
        path: 'input-grid',
        component: InputGridComponent,
        data: {
          title: 'Input Grid'
        }
      },
      {
        path: 'validation',
        component: ValidationFormsComponent,
        data: {
          title: 'Validation Forms'
        }
      },
      {
        path: 'wizard',
        component: WizardFormsComponent,
        data: {
          title: 'Wizard Forms'
        }
      },
      {
        path: 'restaurante/:id',
        component: RestauranteComponent,
        data: {
          title: 'Restaurantes'
        }
      },
      {
        path: 'encuesta/:id',
        component: EncuestaComponent,
        data: {
          title: 'Encuestas'
        }
      },
      {
        path: 'sucursal/:id',
        component: SucursalComponent,
        data: {
          title: 'Sucursales'
        }
      },
      {
        path: 'usuario/:id',
        component: UsuarioComponent,
        data: {
          title: 'Usuarios'
        }
      },
      {
        path: 'publicidad/:id',
        component: PublicidadComponent,
        data: {
          title: 'Publicidad'
        }
      },
      {
        path: 'promocion/:id',
        component: PromocionComponent,
        data: {
          title: 'Promocion'
        }
      },
      {
        path: 'tipocomida/:id',
        component: TipoComidaComponent,
        data: {
          title: 'Tipos de Comida'
        }
      },
      {
        path: 'influencer/:id',
        component: InfluencerComponent,
        data: {
          title: 'Influencers'
        }
      },
      {
        path: 'banner/:id',
        component: BannerComponent,
        data: {
          title: 'Banners'
        }
      },
      {
        path: 'cupon/:id',
        component: CuponComponent,
        data: {
          title: 'Cupón'
        }
      },
      {
        path: 'centroComercial/:id',
        component: CentroComercialComponent,
        data: {
          title: 'Centro Comercial'
        }
      },
      {
        path: 'clienteMovil/:id',
        component: ClienteMovilComponent,
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
export class FormsRoutingModule { }
