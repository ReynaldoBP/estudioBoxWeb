import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'app/_services/restaurante.service';
import { EncuestaService } from 'app/_services/encuesta.service';
import swal from 'sweetalert2';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-extended-table',
    templateUrl: './permisos-list.component.html',
    styleUrls: ['./permisos-list.component.scss']
})

export class PermisosListComponent implements OnInit{
    p:number = 1
    rows:any
    listModulos:any
    listAcciones:any
    listPermisos:any
    listCambiosPermisos:any
    listRol:any
    usuario:any
    idtiporol:any=''
    usuariobuscar:any

    permisos:any
    acciones:any
    constructor(private usuarioService:UsuarioService,
                private toastr:ToastrService,
                private restauranteService:RestauranteService){
        this.rows=[]
        this.listCambiosPermisos =[]
        this.usuario = JSON.parse(localStorage.getItem('usuario'))
        this.getPermisos("Permisos")
    }

    ngOnInit(){
        if(this.getAccion('VER')){
            if(this.usuario.ID_TIPO_ROL == "3"){
                this.obtenerUsuarios()
                this.obtenerModulos()
            }else{
                this.getRestauranteUsuario(this.usuario.ID_USUARIO)
                this.obtenerModulosRestaurante()
            }
            this.obtenerPermisos()            
            this.obtenerAcciones()
            this.getRoles()
        }        
    }

    getPermisos(descModulo:string){
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion:string){
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    obtenerUsuarios(){
        this.usuarioService.getUsuarios()
        .subscribe(
            data =>{
                this.rows = data['resultado']['resultados']
            },
            error =>{
                
            }
        )
    }

    obtenerUsuariosRestaurante(idRestaurante:string){
        this.usuarioService.getUsuariosByRestaurante(idRestaurante)
        .subscribe(
            data =>{
                this.rows = data['resultado']['resultados']
            },
            error =>{
                
            }
        )
    }

    getRestauranteUsuario(usuario:string){
        this.restauranteService.getRestaurantesByUsuario(usuario)
        .subscribe(
            data =>{
                if(data['resultado']['resultados'] != null){
                    this.usuario.ID_RESTAURANTE = data['resultado']['resultados'][0].ID_RESTAURANTE
                    this.obtenerUsuariosRestaurante(this.usuario.ID_RESTAURANTE)
                }                
            },
            error =>{
                this.toastr.warning("Ha ocurrido un error, comuniquese con el dpto. de sistemas","Error")
            }
        )
    }

    obtenerPermisos(){
        this.listPermisos=[]
        this.usuarioService.getPermisos()
        .subscribe(
            data =>{
                this.listPermisos = data['resultado']['resultados']                
            },
            error =>{
                this.toastr.warning("Ha ocurrido un error, comuniquese con el dpto. de sistemas","Error")
            }
        )
    }

    obtenerAcciones(){
        this.listAcciones=[]
        this.usuarioService.getModuloAcciones()
        .subscribe(
            data =>{
                this.listAcciones = data['resultado']['resultados']
            },
            error =>{
                this.toastr.warning("Ha ocurrido un error, comuniquese con el dpto. de sistemas","Error")
            }
        )
    }

    obtenerModulos(){
        this.listModulos=[]
        this.usuarioService.getModulos()
        .subscribe(
            data =>{
                this.listModulos = data['resultado']['resultados']
            },
            error =>{
                this.toastr.warning("Ha ocurrido un error, comuniquese con el dpto. de sistemas","Error")
            }
        )
    }

    obtenerModulosRestaurante(){
        this.listModulos=[]
        let permisos = JSON.parse(localStorage.getItem('permisos'))
        permisos.forEach(element => {
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

    getRoles(){
        this.usuarioService.getRoles()
        .subscribe(
            data =>{
                this.listRol = data['resultado']['tipoRol']
            },
            error =>{
                
            }
        )
    }

    addPermiso(event:boolean,idmoduloaccion:string,idusuario:string){
        let findpermiso = this.listCambiosPermisos.find(item => item.moduloaccion == idmoduloaccion && item.usuario == idusuario)
        if(findpermiso){
            this.removePermiso(findpermiso)
            findpermiso.evento = event
            this.listCambiosPermisos.push(findpermiso)
        }else{
            let permiso = {
                evento:event,
                moduloaccion:idmoduloaccion,
                usuario:idusuario,
                estado:'ACTIVO'
            }
            this.listCambiosPermisos.push(permiso)
        }        
    }

    removePermiso(item){
        var index = this.listCambiosPermisos.indexOf(item);        
        if (index > -1) {
            this.listCambiosPermisos.splice(index, 1);
        }
      }

    guardarCambios(){
        if(this.listCambiosPermisos.length == 0){
            this.toastr.warning("No ha realizado ningun cambio","Error")
            return
        }
        let arrayOfData = [];
        this.listCambiosPermisos.forEach(element => {
            if(element['evento']){
                arrayOfData.push(this.usuarioService.createPermiso(element,this.usuario.ID_USUARIO))
            }else{
                arrayOfData.push(this.usuarioService.deletePermiso(element,this.usuario.ID_USUARIO))
            }                      
        });
        forkJoin(arrayOfData).subscribe(response => {
            swal({ title: "Pemisos", text: "Cambios guardados exitosamene!",type: "success", showConfirmButton: true })
        }, error => {
            this.toastr.warning(error,"Error");
        });    
   

    }
}