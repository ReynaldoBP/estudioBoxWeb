import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioService } from 'app/_services/usuario.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    @ViewChild('f') forogtPasswordForm: NgForm;

    correo:string

    constructor(private router: Router,
        private route: ActivatedRoute,
        private usuarioService:UsuarioService) { }

    // On submit click, reset form fields
    onSubmit() {
        this.forogtPasswordForm.reset();
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

    enviarCorreo(){
        this.usuarioService.generarPass(this.correo)
        .subscribe(
            data =>{
                if(data['status'] == 404){
                    swal({ title: 'Error al generar clave', text: data['resultado'],type: "error", showConfirmButton: true })
                    .then((result) => {
                    if(result.value)
                        this.router.navigate(['/pages/forgotpassword']);
                    });
                }else{
                    swal({ title: this.correo, text: data['resultado'],type: "success", showConfirmButton: true })
                    .then((result) => {
                    if(result.value)
                        this.router.navigate(['/pages/login']);
                    });
                }
            },
            error =>{
                
            }
        )
    }
}