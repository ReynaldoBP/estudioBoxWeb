import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-extended-table',
    templateUrl: './permisos-list.component.html',
    styleUrls: ['./permisos-list.component.scss']
})

export class PermisosListComponent implements OnInit {
    p: number = 1
    rows: any
    listModulos: any
    listAcciones: any
    listPermisos: any
    listCambiosPermisos: any
    usuario: any
    idtiporol: any = ''
    usuariobuscar: any
    permisos: any
    acciones: any
    objParametros: any = {
        intIdEmpresaPorUsuario: 0
      }
    constructor(private usuarioService: UsuarioService,
        private toastr: ToastrService) {
        this.rows = []
        this.listCambiosPermisos = []
        this.usuario = JSON.parse(localStorage.getItem('usuario'))
        this.getPermisos("Seg/Permisos")
    }

    ngOnInit() {
        if (this.getAccion('VER')) {
            this.obtenerUsuarios()
            this.getModulos()
            this.getModuloAcciones()
            this.getPerfil()

        }
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    obtenerUsuarios() {
        this.objParametros.intIdEmpresaPorUsuario = this.usuario.intIdUsuario
        this.usuarioService.getUsuariosCriterio(this.objParametros)
            .subscribe(
                data => {
                    this.rows = data['arrayUsuario']['resultados']
                },
                error => {

                }
            )
    }

    getPerfil() {
        this.listPermisos = []
        this.usuarioService.getPerfil()
            .subscribe(
                data => {
                    this.listPermisos = data['arrayPerfil']
                },
                error => {
                    this.toastr.warning("Ha ocurrido un error, comuniquese con el dpto. de sistemas", "Error")
                }
            )
    }

    getModuloAcciones() {
        this.listAcciones = []
        this.usuarioService.getModuloAcciones()
            .subscribe(
                data => {
                    this.listAcciones = data['arrayModuloAccion']['resultados']
                },
                error => {
                    this.toastr.warning("Ha ocurrido un error, comuniquese con el dpto. de sistemas", "Error")
                }
            )
    }

    getModulos() {
        this.listModulos = []
        this.usuarioService.getModulos()
            .subscribe(
                data => {
                    this.listModulos = data['arrayModulos']
                },
                error => {
                    this.toastr.warning("Ha ocurrido un error, comuniquese con el dpto. de sistemas", "Error")
                }
            )
    }

    addPermiso(event: boolean, idmoduloaccion: string, idusuario: string) {
        let findpermiso = this.listCambiosPermisos.find(item => item.moduloaccion == idmoduloaccion && item.usuario == idusuario)
        if (findpermiso) {
            this.removePermiso(findpermiso)
            findpermiso.evento = event
            this.listCambiosPermisos.push(findpermiso)
        } else {
            let permiso = {
                evento: event,
                moduloaccion: idmoduloaccion,
                usuario: idusuario,
                estado: 'ACTIVO'
            }
            this.listCambiosPermisos.push(permiso)
        }
    }

    removePermiso(item) {
        var index = this.listCambiosPermisos.indexOf(item);
        if (index > -1) {
            this.listCambiosPermisos.splice(index, 1);
        }
    }

    guardarCambios() {
        if (this.listCambiosPermisos.length == 0) {
            this.toastr.warning("No ha realizado ningun cambio", "Error")
            return
        }
        let arrayOfData = [];
        this.listCambiosPermisos.forEach(element => {
            if (element['evento']) {
                arrayOfData.push(this.usuarioService.createPermiso(element, this.usuario.intIdUsuario))
            } else {
                arrayOfData.push(this.usuarioService.deletePermiso(element, this.usuario.intIdUsuario))
            }
        });
        forkJoin(arrayOfData).subscribe(response => {
            swal({ title: "Pemisos", text: "Cambios guardados exitosamene!", type: "success", showConfirmButton: true })
        }, error => {
            this.toastr.warning(error, "Error");
        });
    }
}