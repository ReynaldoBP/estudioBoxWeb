import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { DashboardModule } from 'app/dashboard/dashboard.module';
import { LoginService } from 'app/_services/login.service';
import { UsuarioService } from 'app/_services/usuario.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

    user: any = {
        strCorreo: '',
        strContrasenia: ''
    }

    num_bg: number
    ruta_bg: string
    permisos: any
    loading: boolean

    @ViewChild('f') loginForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private objLoginService: LoginService,
        private usuarioService: UsuarioService) {
        toastr.toastrConfig.timeOut = 3000
        this.ruta_bg = "assets/img/photos/"
        this.num_bg = (Math.floor(Math.random() * 3) + 1)
        this.ruta_bg += this.num_bg == 1 ? 'fondo.jpg' : this.num_bg == 2 ? 'fondo.jpg' : 'fondo.jpg';
        this.permisos = []
        this.loading = false
    }

    ngOnInit() {
        localStorage.removeItem('usuario')
        localStorage.removeItem('permisos')
    }

    // On submit button click    
    onSubmit() {

    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

    login() {
        if (this.loginForm.valid) {
            this.loading = true
            this.objLoginService.getLogin(this.user)
                .subscribe(
                    data => {
                        if (data["intStatus"] != 200) {
                            this.loading = false
                            this.toastr.warning(data["strMensaje"], 'Datos incorrectos')
                        }
                        else {
                            localStorage.setItem('usuario', JSON.stringify(data["arrayUsuario"]))
                            this.getPermisos(data["arrayUsuario"]['intIdUsuario'])
                        }
                    },
                    error => {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                        this.loading = false
                    }
                )
        } else {
            this.toastr.warning('Ingrese usuario y contraseña', 'Datos incompletos')
        }
    }

    getPermisos(idUsuario) {
        this.usuarioService.getPermisosByUsuario(idUsuario)
            .subscribe(
                data => {
                    if (data["intStatus"] != 200) {
                        this.loading = false
                        this.toastr.warning(data["strMensaje"], 'Datos incorrectos')
                    }
                    else {
                        this.loading = false
                        this.permisos = data['arrayPerfil']
                        localStorage.setItem('permisos', JSON.stringify(data['arrayPerfil']))
                        this.router.navigate(['/dashboard/dashboard1']);
                    }
                },
                error => {
                    this.loading = false
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
}