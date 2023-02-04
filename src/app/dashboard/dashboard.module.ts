import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { PipeRedSocial } from 'app/_pipes/PipeRedSocial';
import { PipeClienteTotalGenero } from 'app/_pipes/PipeCliente';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
        PipeRedSocial,
        PipeClienteTotalGenero
    ],
    providers: [],
})
export class DashboardModule { }
