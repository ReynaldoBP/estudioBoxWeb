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
    objParametrosUsuario: any = {
        intIdEmpresaPorUsuario: 0
    }
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
            console.log(this.usuario)
            if (this.usuario.strTipoRol == 'ADMINISTRADOR') {
                this.getUsuarios()
                this.getRoles()
            } else {
                this.getUsuariosCriterio()
            }
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

    getUsuariosCriterio() {
        this.objParametrosUsuario.intIdEmpresaPorUsuario = this.usuario.intIdUsuario
        this.usuarioService.getUsuariosCriterio(this.objParametrosUsuario)
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
        this.usuarioService.getRoles()
            .subscribe(
                data => {
                    this.listRol = data['arrayRoles']
                },
                error => {

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
                Identificacion: item.strIdentificacion,
                Nombres: item.strNombre,
                Apellidos: item.strApellido,
                Correo: item.strCorreo,
                Rol: item.strDescripcionRol,
                Estado: item.strEstado
            }
            return obj
        })
        this.excelService.exportAsExcelFile(users, 'usuarios');
    }

    exportAsPDF() {
        var cols = [
            { title: "Identificacion", dataKey: "strIdentificacion" },
            { title: "Nombres", dataKey: "strNombre" },
            { title: "Apellidos", dataKey: "strApellido" },
            { title: "Correo", dataKey: "strCorreo" },
            { title: "Rol", dataKey: "strDescripcionRol" },
            { title: "Estado", dataKey: "strEstado" },
        ]
        this.excelService.exportAsPdfFile(cols, this.rows, 'usuarios');
    }


}