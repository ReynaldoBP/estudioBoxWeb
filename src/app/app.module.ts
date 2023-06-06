
import { NgModule, forwardRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { DragulaService } from 'ng2-dragula';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';

import * as $ from 'jquery';
import { ParamService } from './_services/param.service';
import { Globals } from './_services/global.service';
import { RestauranteService } from './_services/restaurante.service';
import { LoginService } from './_services/login.service';
import { SucursalService } from './_services/sucursal.service';
import { AreaService } from './_services/area.service';
import { GeocodeService } from './_services/geocode.service';
import { UsuarioService } from './_services/usuario.service';
import { TipoComidaService } from './_services/tipocomida.service';
import { EncuestaService } from './_services/encuesta.service';
import { ExcelService } from './_services/excel.service';
import { PromocionService } from './_services/promocion.service';
import { PublicidadService } from './_services/publicidad.service';
import { BannerService } from './_services/banner.service';
import { BitacoraService } from './_services/bitacora.service';
import { CuponService } from './_services/cupon.service';
import { CentroComercialService } from './_services/centroComercial.service';
import { EmpresaService } from './_services/empresa.service';
import { PuntosEstadisticaService } from './_services/puntosEstadistica.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClienteService } from './_services/cliente.service';
import { SimpleTimer } from 'ng2-simple-timer';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsService } from './_services/charts.service';
/*export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}*/

@NgModule({
    imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCE2neaJdaULpGs02VvLO0KzHvMG-y6_5c'
        }),
        NgxPaginationModule,
        NgSelectModule
    ],
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent
    ],
    providers: [
        forwardRef(() => Globals),
        forwardRef(() => AuthService),
        forwardRef(() => AuthGuard),
        forwardRef(() => DragulaService),
        forwardRef(() => ParamService),
        forwardRef(() => RestauranteService),
        forwardRef(() => LoginService),
        forwardRef(() => SucursalService),
        forwardRef(() => AreaService),
        forwardRef(() => Location),
        forwardRef(() => GeocodeService),
        forwardRef(() => UsuarioService),
        forwardRef(() => TipoComidaService),
        forwardRef(() => EncuestaService),
        forwardRef(() => ExcelService),
        forwardRef(() => PromocionService),
        forwardRef(() => PublicidadService),
        forwardRef(() => BannerService),
        forwardRef(() => CuponService),
        forwardRef(() => BitacoraService),
        forwardRef(() => CentroComercialService),
        forwardRef(() => EmpresaService),
        forwardRef(() => PuntosEstadisticaService),
        forwardRef(() => ClienteService),
        forwardRef(() => ChartsService),
        forwardRef(() => SimpleTimer)
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }