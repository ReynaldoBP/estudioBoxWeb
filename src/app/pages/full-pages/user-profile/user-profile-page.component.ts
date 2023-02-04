import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'app/_services/restaurante.service';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {
    clave:string
    clave2:string
    //Variable Declaration
    currentPage: string = "About"
    user:any
    listRest:any
    constructor(private restauranteService:RestauranteService,
                private usuarioservice:UsuarioService,
                private toastr:ToastrService){
        this.user = JSON.parse(localStorage.getItem('usuario'))
    }

    ngOnInit() {
        // Horizontal Timeline js for user timeline
        //$.getScript('./assets/js/vertical-timeline.js');
        if(this.user.DESCRIPCION_TIPO_ROL == "RESTAURANTE"){
            this.getRestaurantesPorUsuario(this.user.ID_USUARIO)
        }
        
    }

    cambiarClave(){
        let regex = /(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\w{8,12}/
        if(!regex.test(this.clave)){
            this.toastr.warning("Clave no cumple con los requisitos solicitados","Error")
            return
        }else if(this.clave != this.clave2){
            this.toastr.warning("Claves no coinciden","Error")
            return
        }

        this.usuarioservice.cambiarPwd(this.user.ID_USUARIO,this.clave)
        .subscribe(
            data => {
                if(data['status'] == 400){
                    swal(
                        'Cambio de Clave',
                        'Clave cambiada exitosamente!',
                        'success'
                    )
                }
            },
            error => {
                this.toastr.warning(error,"Error")
            }
        )
    }

    showPage(page: string) {
        this.currentPage = page;
    }

    getRestaurantesPorUsuario(idusuario:string){
        this.restauranteService.getRestaurantesByUsuario(idusuario)
            .subscribe(
                data =>{
                    this.listRest = data['resultado']['resultados']
                },
                error =>{
                    
                }
            )
    }
}