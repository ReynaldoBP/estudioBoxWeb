import { Component, OnInit } from '@angular/core';
import { PublicidadService } from 'app/_services/publicidad.service';

@Component({
    selector: 'app-extended-table',
    templateUrl: './publicidad-list.component.html',
    styleUrls: ['./publicidad-list.component.scss']
})

export class PublicidadListComponent implements OnInit{

    rows:any
    permisos:any
    acciones:any
    estados:any
    estadoFiltro:any
    descripcionFiltro:any
    constructor(private publicidadService:PublicidadService){
        this.rows=[]
        this.getPermisos("Mant/Publicidad")
        this.estados = ["ACTIVO","INACTIVO"]
        this.estadoFiltro = "ACTIVO"
    }

    ngOnInit(){
        if(this.getAccion('VER')){
            this.getPublicidad()
        }
    }

    getPermisos(descModulo:string){
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion:string){
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getPublicidad(){
        this.publicidadService.get()
        .subscribe(
            data =>{
                this.rows = data['resultado']['resultados']
            },
            error =>{
                
            }
        )
    }


}