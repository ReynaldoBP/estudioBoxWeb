import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'app/_services/restaurante.service';
import { ExcelService } from 'app/_services/excel.service';
import { EncuestaService } from 'app/_services/encuesta.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-extended-table',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss']
})

export class DataListComponent implements OnInit{

    rows:any=[
        {
            fecha:'2019-08-1',
            cliente:'Jorge Bermeo',
            encuesta:'Encuestas activa numero 1',
            imagen:'',
            idencuesta:'10'
        }
    ]

    constructor(private encuestaService:EncuestaService,
                private excelService:ExcelService){
        //this.rows=[]
    }

    ngOnInit(){
        /*this.restauranteService.getRestaurantes()
        .subscribe(
            data =>{
                this.rows = data['resultado']['resultados']
                console.log(this.rows)
            },
            error =>{
                
            }
        )*/
    }

    exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.rows, 'restaurantes_bitte');
    }

    exportAsPDF() {
        var cols = [
            {title: "RAZON SOCIAL", dataKey: "RAZON_SOCIAL"},
            {title: "NOMBRE COMERCIAL", dataKey: "NOMBRE_COMERCIAL"}, 
            {title: "REPRESENTANTE LEGAL", dataKey: "REPRESENTANTE_LEGAL"},
            {title: "IDENTIFICACION", dataKey: "IDENTIFICACION"}
        ] 
        this.excelService.exportAsPdfFile(cols,this.rows, 'restaurantes_bitte');
    }

    verPreguntas(encuesta:any){
        this.encuestaService.getPreguntas(encuesta)
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
                        icons += "<i class='fa fa-star font-medium-3 mr-2'></i>"
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
                        title: "ENCUESTA 1", 
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