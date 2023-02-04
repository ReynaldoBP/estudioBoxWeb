import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { TablesRoutingModule } from "./tables-routing.module";

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
import { PublicacionesListComponent } from './publicaciones-list/publicaciones-list.component';
import { DataListComponent } from './data-list/data-list.component';
import { PermisosListComponent } from './permisos-list/permisos-list.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { InfluencerListComponent } from './influencer-list/influencer-list.component';
import { FilterUsuarioModulo } from 'app/_pipes/PipeUsuario';
import { FilterRol } from 'app/_pipes/PipeUsuario';
import { FilterUsuario } from 'app/_pipes/PipeUsuario';
import { FilterAccionByModulo } from 'app/_pipes/PipeUsuario';
import { SharingModule } from 'app/_pipes/SharingModule';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeEdad } from 'app/_pipes/PipeFechas';
import { FilterRestaurante } from 'app/_pipes/PipeRestaurante';
import { FilterDataEncuesta } from 'app/_pipes/PipeDataEncuesta';
import { FilterSucursal } from 'app/_pipes/PipeSucursal';
import { FilterBanner } from 'app/_pipes/PipeBanner';
import { FilterTipoComida } from 'app/_pipes/PipeTipoComida';
import { FilterBitacora } from 'app/_pipes/PipeBitacora';
import { FilterCliente } from 'app/_pipes/PipeCliente';
import { FilterCupon } from 'app/_pipes/PipeCupon';
import { FilterCentroComercial } from 'app/_pipes/PipeCentroComercial';
import { FilterRedimirCupon } from 'app/_pipes/PipeRedimirCupon';
import { FilterClienteMovil } from 'app/_pipes/PipeClienteMovil';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipePublicidad } from 'app/_pipes/PipePublicidad';
import { PipePromocion } from 'app/_pipes/PipePromocion';
import { BannerListComponent } from './banner-list/banner-list.component';
import { CuponListComponent } from './cupon-list/cupon-list.component';
import { BitacoraListComponent } from './bitacora-list/bitacora-list.component';
import { CentroComercialListComponent } from './centroComercial-list/centroComercial-list.component';
import { ClienteMovilListComponent } from './clienteMovil-list/clienteMovil-list.component';
import { PuntosEstadisticaListComponent } from './puntosEstadistica-list/puntosEstadistica-list.component';
@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        UiSwitchModule.forRoot({
            size: 'small',
            /*color: 'rgb(0, 189, 99)',
            switchColor: '#80FFA2',
            defaultBgColor: '#00ACFF',
            defaultBoColor : '#476EFF',
            checkedLabel: 'on',
            uncheckedLabel: 'off'*/
        }),
        NgSelectModule,
        SharingModule.forRoot(),
        NgxPaginationModule

    ],
    declarations: [
        ExtendedTableComponent,
        RegularTableComponent,
        RestauranteListComponent,
        SucursalListComponent,
        UsuarioListComponent,
        EncuestaListComponent,
        PromocionListComponent,
        PublicidadListComponent,
        TipoComidaListComponent,
        ClientesListComponent,
        redimirCuponComponent,
        PublicacionesListComponent,
        DataListComponent,
        PermisosListComponent,
        InfluencerListComponent,
        FilterUsuarioModulo,
        FilterRol,
        FilterUsuario,
        PipeEdad,
        FilterRestaurante,
        FilterDataEncuesta,
        FilterSucursal,
        FilterBanner,
        FilterCupon,
        FilterCentroComercial,
        FilterRedimirCupon,
        FilterClienteMovil,
        FilterBitacora,
        FilterTipoComida,
        FilterCliente,
        FilterAccionByModulo,
        PipePublicidad,
        PipePromocion,
        BannerListComponent,
        CuponListComponent,
        BitacoraListComponent,
        CentroComercialListComponent,
        ClienteMovilListComponent,
        PuntosEstadisticaListComponent
    ]
})
export class TablesModule { }
