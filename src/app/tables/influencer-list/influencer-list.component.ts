import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/_services/usuario.service';
import { ClienteService } from 'app/_services/cliente.service';

@Component({
    selector: 'app-extended-table',
    templateUrl: './influencer-list.component.html',
    styleUrls: ['./influencer-list.component.scss']
})

export class InfluencerListComponent implements OnInit{

    rows:any
    permisos:any
    acciones:any
    constructor(private clienteService:ClienteService){
        this.rows=[]
        this.getPermisos("Mant/Influencer")
    }

    ngOnInit(){
        if(this.getAccion('VER')){
            this.getInfluencers()
        }
    }

    getPermisos(descModulo:string){
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion:string){
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getInfluencers(){
        this.clienteService.getInfluencers()
        .subscribe(
            data =>{
                this.rows = data['resultado']['resultados']
            },
            error =>{
                
            }
        )
    }


}