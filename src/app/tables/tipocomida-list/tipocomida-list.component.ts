import { Component, OnInit } from '@angular/core';
import { TipoComidaService } from 'app/_services/tipocomida.service';
import { ExcelService } from 'app/_services/excel.service';

@Component({
    selector: 'app-extended-table',
    templateUrl: './tipocomida-list.component.html',
    styleUrls: ['./tipocomida-list.component.scss']
})

export class TipoComidaListComponent implements OnInit{
    p: number = 1;
    rows:any
    buscatipocomida:any
    permisos:any
    acciones:any
    estados:any
    estadoFiltro:any
    constructor(private tipocomidaservice:TipoComidaService,
                private excelService:ExcelService){
        this.rows=[]
        this.getPermisos("Mant/TipoComida")
        this.estados = ["ACTIVO","INACTIVO"]
        this.estadoFiltro = "ACTIVO"
    }

    ngOnInit(){
        if(this.getAccion('VER')){
            this.getTipos()
        }    
    }

    getTipos(){
        this.tipocomidaservice.getTiposComida(0)
        .subscribe(
            data =>{
                this.rows = data['resultado']['tipoComida']
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

    exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.rows, 'tipos_comida_bitte');
    }

    exportAsPDF() {
        var cols = [
            {title: "DESCRIPCION", dataKey: "DESCRIPCION_TIPO_COMIDA"},
            {title: "ESTADO", dataKey: "ESTADO"}
        ] 
        this.excelService.exportAsPdfFile(cols,this.rows, 'tipos_comida_bitte');
    }


}