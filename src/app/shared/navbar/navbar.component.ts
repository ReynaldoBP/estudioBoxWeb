import { Component } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { RestauranteService } from 'app/_services/restaurante.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
    currentLang = 'en';
    toggleClass = 'ft-maximize';
    placement = 'bottom-right'
    public isCollapsed = true;
    usuario:any
    restaurante:any

    constructor(/*public translate: TranslateService,*/
        private router:Router,
        private restauranteService:RestauranteService) {
        //const browserLang: string = translate.getBrowserLang();
        //translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
        this.usuario = JSON.parse(localStorage.getItem('usuario'))
    }

    ngOnInit(){
        console.log("-------------------NavBar")
        /*if(this.usuario.strTipoRol != 'ADMINISTRADOR'){
          this.getRestaurantesPorUsuario(this.usuario.ID_USUARIO)
        }*/
      }

    /*ChangeLanguage(language: string) {
        this.translate.use(language);
    }*/

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }

    logout(){
        swal({
            title:"Cerrar Sesion",
            text:"¿Está seguro que desea salir del sistema?",
            showConfirmButton:true,
            showCancelButton:true,
            confirmButtonText:"Sí",
            cancelButtonText:"No",
            type:"question"
        }).then((result) => {
            if(result.value){
                localStorage.removeItem('usuario')
                localStorage.removeItem('permisos')
                this.router.navigate(['/pages/login']);
            }            
          });
        
    }
/*
    getRestaurantesPorUsuario(idusuario:string){
        this.restauranteService.getRestaurantesByUsuario(idusuario)
            .subscribe(
                data =>{
                    let listRestaurante = data['resultado']['resultados']
                    if(listRestaurante != null){
                      this.restaurante = ('(' + listRestaurante[0].NOMBRE_COMERCIAL + ')')
                    }
                },
                error =>{
                    
                }
            )
      } */
}
