import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/_services/usuario.service';
import { ExcelService } from 'app/_services/excel.service';
import { RestauranteService } from 'app/_services/restaurante.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-extended-table',
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.scss']
})

export class UsuarioListComponent implements OnInit {
    p: number = 1
    rows: any
    permisos: any
    acciones: any
    usuario: any
    usuariobuscar: any
    listRol: any
    idtiporol: any = ''
    constructor(private usuarioService: UsuarioService,
        private excelService: ExcelService,
        private restauranteService: RestauranteService,
        private toastr: ToastrService) {
        this.rows = []
        this.usuario = JSON.parse(localStorage.getItem('usuario'))
        console.log(this.usuario)
        this.getPermisos("Seg/Usuarios")
    }

    ngOnInit() {
        if (this.getAccion('VER')) {
            if (this.usuario.strTipoRol == 'ADMINISTRADOR') {
                this.getUsuarios()
                this.getRoles()
            }/*else{
                this.getRestauranteUsuario(this.usuario.ID_USUARIO)
            }*/
        }
    }

    getUsuarios() {
        this.usuarioService.getUsuarios()
            .subscribe(
                data => {
                    this.rows = data['arrayUsuario']['resultados']
                },
                error => {

                }
            )
    }

    getUsuariosByRestaurante(idRestaurante: string) {
        this.usuarioService.getUsuariosByRestaurante(idRestaurante)
            .subscribe(
                data => {
                    this.rows = data['resultado']['resultados']
                },
                error => {

                }
            )
    }

    getRoles() {
        console.log("get roles");
        this.usuarioService.getRoles()
            .subscribe(
                data => {
                    this.listRol = data['arrayRoles']
                },
                error => {

                }
            )
    }

    getRestauranteUsuario(usuario: string) {
        this.restauranteService.getRestaurantesByUsuario(usuario)
            .subscribe(
                data => {
                    if (data['resultado']['resultados'] != null) {
                        this.usuario.ID_RESTAURANTE = data['resultado']['resultados'][0].ID_RESTAURANTE
                        this.getUsuariosByRestaurante(this.usuario.ID_RESTAURANTE)
                    }
                },
                error => {
                    this.toastr.warning("Ha ocurrido un error, comuniquese con el dpto. de sistemas", "Error")
                }
            )
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    exportAsXLSX() {
        let users = this.rows.map(item => {
            let obj = {
                IDENTIFICACION: item.IDENTIFICACION,
                NOMBRES: item.NOMBRES,
                APELLIDOS: item.APELLIDOS,
                CORREO: item.CORREO,
                ROL: item.DESCRIPCION_TIPO_ROL,
                ESTADO: item.ESTADO
            }
            return obj
        })
        this.excelService.exportAsExcelFile(users, 'users_bitte');
    }

    exportAsPDF() {
        var cols = [
            { title: "IDENTIFICACION", dataKey: "IDENTIFICACION" },
            { title: "NOMBRES", dataKey: "NOMBRE" },
            { title: "APELLIDOS", dataKey: "APELLIDOS" },
            { title: "CORREO", dataKey: "CORREO" },
            { title: "ROL", dataKey: "DESCRIPCION_TIPO_ROL" },
            { title: "ESTADO", dataKey: "ESTADO" },
        ]
        this.excelService.exportAsPdfFile(cols, this.rows, 'clientes_bitte');
    }


}