import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
//import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    listModulos:any
    listPermisos:any
    rutas:any
    constructor(private router: Router,
        private route: ActivatedRoute/*, public translate: TranslateService*/) {
            this.listPermisos = JSON.parse(localStorage.getItem('permisos'))
            this.rutas = JSON.parse(JSON.stringify(ROUTES));
    }

    ngOnInit() {
        $.getScript('./assets/js/app-sidebar.js');        
        this.obtenerModulos()
    }

    //NGX Wizard - skip url change
    ngxWizardFunction(path: string) {
        if (path.indexOf('forms/ngx') !== -1)
            this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
    }

    obtenerModulos(){
        this.listModulos=[]
        this.listPermisos.forEach(element => {
            if(this.listModulos.filter(item=> element['ID_MODULO'] == item['ID_MODULO']).length == 0){
                let modulo = {
                    ID_MODULO: element['ID_MODULO'],
                    DESCRIPCION_MODULO: element['DESCRIPCION_MODULO'],
                    ID_USUARIO: element['ID_USUARIO']
                }
                this.listModulos.push(modulo);
            }
        });
        this.menuItems = this.rutas.map(obj => {
            if(obj['value'] == "0"){
                obj.submenu  = obj.submenu.filter(item => this.listModulos.find(element => item['value'] == element['ID_MODULO']))
                return obj
            }else{
                return obj
            }
        })
        this.menuItems = this.menuItems.filter(menuItem => ((menuItem['value'] == "0" && menuItem['submenu'].length > 0) || this.listModulos.find(item => item['ID_MODULO'] == menuItem['value'])));
    }
}
