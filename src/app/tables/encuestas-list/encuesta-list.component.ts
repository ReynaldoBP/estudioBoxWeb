import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'app/_services/restaurante.service';
import { EncuestaService } from 'app/_services/encuesta.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-extended-table',
    templateUrl: './encuesta-list.component.html',
    styleUrls: ['./encuesta-list.component.scss']
})

export class EncuestaListComponent implements OnInit{

    rows:any
    permisos:any
    acciones:any
    constructor(private encuestaService:EncuestaService){
        this.rows=[]
        this.getPermisos("Mant/Encuestas")
    }

    ngOnInit(){
        if(this.getAccion('VER')){
            this.getEncuestas()
        }  
    }

    getEncuestas(){
        this.encuestaService.getEncuestas(0)
        .subscribe(
            data =>{
                this.rows = data['resultado']['resultados']
            },
            error =>{
                
            }
        )
    }

    getPermisos(descModulo:string){
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion:string){
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    verPreguntas(encuesta:any){
        this.encuestaService.getPregunta(encuesta['ID_ENCUESTA'])//hacer cambio
        .subscribe(
            data =>{
                let listpreg = data['resultado']['resultados']
                let list = document.createElement('UL');
                let tablehtml = "<table class='table table-responsive-md text-center'><tbody>"
                let tr = ""
                listpreg.forEach(element => {
                    const listItem = document.createElement('div');
                    listItem.className = "row"
                    
                    let icons = ''
                    for (let index = 0; index < element['VALOR_OPCION_RESPUESTA']; index++) {
                        icons += "<i class='ft-star font-medium-3 mr-2'></i>"
                    }
                    listItem.innerHTML =( "<div class='col-md-1'><strong>" + 
                                         (listpreg.indexOf(element) +1) +
                                        "</strong></div>" +
                                        "<div class='col-md-7'>" + 
                                        element['DESCRIPCION_PREGUNTA'] + 
                                        "</div>" +
                                        "<div class='col-md-4'>" + 
                                        //element['VALOR_OPCION_RESPUESTA'] + 
                                        icons +
                                        "</div>");
                    tr += "<tr>" +
                        "<td>"+(listpreg.indexOf(element) +1)+"</td>" +
                        "<td>"+element['DESCRIPCION_PREGUNTA']+"</td>" +
                        "<td>"+(element['VALOR_OPCION_RESPUESTA']==null?element['DESCRIPCION_OPCION_RESPUESTA']:icons)+"</td>" +
                        "</tr>"
                    list.appendChild(listItem);
                });
                tablehtml += (tr + "</table>")
                swal(
                    { 
                        title: encuesta['TITULO'], 
                        html: tablehtml, 
                        showConfirmButton: true,
                        width:900
                    })
            },
            error =>{
                
            }
        )        
    }


}