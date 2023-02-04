import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'app/_services/restaurante.service';
import { ExcelService } from 'app/_services/excel.service';

@Component({
    selector: 'app-extended-table',
    templateUrl: './restaurante-list.component.html',
    styleUrls: ['./restaurante-list.component.scss']
})

export class RestauranteListComponent implements OnInit{
    p: number = 1;
    rows:any
    buscaRestaurante:any
    user:any
    permisos:any
    acciones:any
    strCiudad:any
    listCiudad:any
    estados:any
    estadoFiltro:any
    constructor(private restauranteService:RestauranteService,
                private excelService:ExcelService){
        this.rows=[]
        this.user = JSON.parse(localStorage.getItem('usuario'))
        this.getPermisos("Mant/Restaurantes")
        this.estados = ["ACTIVO","INACTIVO"]
        this.estadoFiltro = "ACTIVO"
        this.strCiudad = "TODAS"
    }

    ngOnInit(){
        this.getCiudadPorRestaurante()
        if(this.getAccion('VER')){
            if(this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR"){
                this.getRestaurantes()
            }else{
                this.getRestaurantesPorUsuario(this.user.ID_USUARIO)
            }
        }        
    }

    getPermisos(descModulo:string){
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion:string){
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getRestaurantesPorUsuario(idusuario:string){
        this.restauranteService.getRestaurantesByUsuario(idusuario)
            .subscribe(
                data =>{
                    this.rows = data['resultado']['resultados']
                },
                error =>{
                    
                }
            )
    }

    getRestaurantes(){
        this.restauranteService.getRestaurantes()
            .subscribe(
                data =>{
                    this.rows = data['resultado']['resultados']
                },
                error =>{
                    
                }
            )
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
    getCiudadPorRestaurante(){
        this.restauranteService.getCiudadPorRestaurante()
            .subscribe(
                data =>{
                    this.listCiudad = data['resultado']['resultados']
                },
                error =>{
                }
            )
      }
      getRestaurantesPorCiudad(){
        this.restauranteService.getRestaurantesPorCiudad(this.strCiudad)
            .subscribe(
                data =>{
                    this.rows = data['resultado']['resultados']
                },
                error =>{
                }
            )
    }
}