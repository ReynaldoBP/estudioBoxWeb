import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsRoutingModule } from "./forms-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

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
import { AgmCoreModule } from '@agm/core';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { UsuarioComponent } from './layouts/usuario/usuario.component';
import { PublicidadComponent } from './layouts/publicidad/publicidad.component';
import { PromocionComponent } from './layouts/promocion/promocion.component';
import { TipoComidaComponent } from './layouts/tipocomida/tipocomida.component';
import { SharingModule } from 'app/_pipes/SharingModule';
import { NgSelectModule } from '@ng-select/ng-select';
import { InfluencerComponent } from './layouts/influencer/influencer.component';
import { PipeCodigoPromocion } from 'app/_pipes/PipeCodigoPromocion';
import { BannerComponent } from './layouts/banner/banner.component';
import { CuponComponent } from './layouts/cupon/cupon.component';
import { CentroComercialComponent } from './layouts/centroComercial/centroComercial.component';
import { ClienteMovilComponent } from './layouts/clienteMovil/clienteMovil.component';
@NgModule({
    imports: [
        CommonModule,
        FormsRoutingModule,
        ReactiveFormsModule,
        FileUploadModule,
        NgSelectModule,
        FormsModule,
        CustomFormsModule,
        NgbModule,
        AgmCoreModule,
        SharingModule.forRoot()
    ],
    declarations: [
        ValidationFormsComponent,
        WizardFormsComponent,
        BasicComponent,
        HorizontalComponent,
        HiddenLabelsComponent,
        FormActionsComponent,
        BorderedComponent,
        StripedRowsComponent,
        InputsComponent,
        InputGroupsComponent,
        InputGridComponent,
        RestauranteComponent,
        EncuestaComponent,
        SucursalComponent,
        UsuarioComponent,
        PublicidadComponent,
        PromocionComponent,
        TipoComidaComponent,
        InfluencerComponent,
        PipeCodigoPromocion,
        BannerComponent,
        CuponComponent,
        CentroComercialComponent,
        ClienteMovilComponent
    ]

})
export class FormModule { }
