import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ROUTES } from '../sidebar/sidebar-routes.config';

@Injectable()
export class AuthGuard implements CanActivate {
  listModulos:any
  rutas:any
  constructor(private router: Router) {
      this.rutas = JSON.parse(JSON.stringify(ROUTES));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('usuario') && this.hasPermiso(state.url)) {
        return true;
    }
    this.router.navigate(['/pages/login']);
    return false;
  }

  hasPermiso(url:string){
    this.getmodulos()
    let modulo = this.rutas.find(item=>{
      if(item.path == url){
        return item
      }else if(item.value == "0"){
        return item.submenu.find(subitem => subitem.path == url)
      }
    } )
    if(modulo == undefined){
      return false
    }
    if(modulo.submenu.length>0){
      modulo = modulo.submenu.find(subitem => subitem.path == url)
    }
    let permiso = this.listModulos.find(item => item.ID_MODULO == modulo.value)
    if(permiso == undefined){
      return false
    }else{
      return true
    }
  }

  getmodulos(){
    this.listModulos = []
    let listPermisos = JSON.parse(localStorage.getItem('permisos'))
    listPermisos.forEach(element => {
        if(this.listModulos.filter(item=> element['ID_MODULO'] == item['ID_MODULO']).length == 0){
            let modulo = {
                ID_MODULO: element['ID_MODULO'],
                DESCRIPCION_MODULO: element['DESCRIPCION_MODULO'],
                ID_USUARIO: element['ID_USUARIO']
            }
            this.listModulos.push(modulo);
        }
    });
  }
}
