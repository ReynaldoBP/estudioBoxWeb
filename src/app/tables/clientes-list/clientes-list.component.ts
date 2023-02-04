import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ExcelService } from 'app/_services/excel.service';
import { ClienteService } from 'app/_services/cliente.service';
import { SimpleTimer } from 'ng2-simple-timer';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PromocionService } from 'app/_services/promocion.service';
import swal from 'sweetalert2';
import { RestauranteService } from 'app/_services/restaurante.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-extended-table',
    templateUrl: './clientes-list.component.html',
    styleUrls: ['./clientes-list.component.scss']
})

export class ClientesListComponent implements OnInit,OnDestroy{
    p: number = 1;
    rows:any
    timerId: string;
    listPromociones:any
    listPromocionesPremio:any
    user:any
    closeResult: string;
    clienteSeleccionado:any
    buscaCliente:string
    date = new Date();
    listRestaurante:any
    buscaRestaurante:string
    permisos:any
    acciones:any
    modalPromoPremioRef:NgbModalRef
    modalPromoRef:NgbModalRef
    loading:boolean
    descripcionOrigin:string
    descripcion:string
    constructor(private clienteService:ClienteService,
                private excelService:ExcelService,
                private promocionService:PromocionService,
                private restauranteService:RestauranteService,
                private toastr:ToastrService,
                private st: SimpleTimer,
                private modalService:NgbModal){
        this.rows=[]
        //this.st.newTimer('5sec', 5);
        toastr.toastrConfig.timeOut = 3000
        this.user = JSON.parse(localStorage.getItem('usuario'))
        this.loading = false
        this.descripcionOrigin ="Lista de clientes con los puntos que acumulan cada vez que comen en su restaurante y utilizan la aplicación BITTE para calificar/promocionar. Clientes con puntos suficientes solicitarán en la aplicación BITTE redimir promociones vigentes que su restaurante haya publicado. Las solicitudes de redimir puntos por promociones aparecerán en esta sección para que se validen y se otorgue el plato o bebida en promoción. El cliente presentará su identificación para que con su nombre lo busque en esta sección y le otorgue la promoción seleccionada. Los puntos de la promoción elegida serán restados del puntaje total del cliente"
        this.descripcion = "Lista de clientes con los puntos que acumulan cada vez que comen en su restaurante y utilizan la aplicación BITTE para calificar/promocionar."
    }

    vermas(){
        if(this.descripcion == this.descripcionOrigin){
            this.descripcion = "Lista de clientes con los puntos que acumulan cada vez que comen en su restaurante y utilizan la aplicación BITTE para calificar/promocionar."
        }else{
            this.descripcion = this.descripcionOrigin
        }        
    }

    ngOnInit(){
        if(this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR"){
            this.getClientesAdmin()
            this.getRestaurantes()
        }else{
            this.getRestaurantesPorUsuario(this.user.ID_USUARIO)
        }
        this.getPermisos("Puntos")
        //this.timerId = this.st.subscribe('5sec', () => this.callback());
    }

    getPermisos(descModulo:string){
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion:string){
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getClientesRestaurante(idRestaurante){
        this.rows =[]
        this.clienteService.getClientes(idRestaurante)
        .subscribe(
            data =>{    
                this.rows = data['resultado']['resultados']
            },
            error =>{
                
            }
        )
    }

    getClientesAdmin(){
        this.rows =[]
        this.clienteService.getClientesAdmin()
        .subscribe(
            data =>{    
                this.rows = data['resultado']['resultados']
            },
            error =>{
                
            }
        )
    }

    ngOnDestroy(): void {
        //this.st.unsubscribe(this.timerId);
    }

    getPromocionesPendientes(idCliente:string,idRestaurante:string){
        this.listPromociones = null
        this.clienteService.getPromocionesCliente(idCliente,idRestaurante,'PENDIENTE',null,null,null,null)
        .subscribe(
            data =>{
                let promociones = data['resultado']['resultados']    
                this.listPromociones = promociones.map(item=> {
                    let promocion = {
                        ID_CLIENTE_PUNTO_HISTORIAL : item.ID_CLIENTE_PUNTO_HISTORIAL,
                        ESTADO_PROMOCION_HISTORIAL : item.ESTADO_PROMOCION_HISTORIAL,
                        CLIENTE_ID : item.CLIENTE_ID,
                        ID_PROMOCION: item.ID_PROMOCION,
                        DESCRIPCION_TIPO_PROMOCION: item.DESCRIPCION_TIPO_PROMOCION,
                        ESTADO_PROMOCION: item.ESTADO_PROMOCION,
                        ID_RESTAURANTE: item.ID_RESTAURANTE,
                        NOMBRE_COMERCIAL: item.NOMBRE_COMERCIAL,
                        ESTADO_RESTAURANTE: item.ESTADO_RESTAURANTE,
                        CHECKED: false
                    }
                    return promocion
                })
            },
            error =>{
                
            }
        )
    }

    getPromocionesPremio(idCliente:string,idRestaurante:string){
        this.listPromocionesPremio = null
        this.promocionService.getPromoPremio(this.date.getFullYear().toString(),(this.date.getMonth()+1).toString())
        .subscribe(
            data =>{
                let promociones = data['resultado']['resultados']    
                this.listPromocionesPremio = promociones.map(item=> {
                    let promocion = {
                        ID_PROMOCION : item.ID_PROMOCION,
                        DESCRIPCION_TIPO_PROMOCION : item.DESCRIPCION_TIPO_PROMOCION,
                        CANTIDAD_PUNTOS : item.CANTIDAD_PUNTOS,
                        ACEPTA_GLOBAL : item.ACEPTA_GLOBAL,
                        ESTADO : item.ESTADO,
                        PREMIO :item.PREMIO,
                        IMAGEN : item.IMAGEN,
                        ID_SUCURSAL : item.ID_SUCURSAL,
                        DESCRIPCION : item.DESCRIPCION,
                        ID_RESTAURANTE : item.ID_RESTAURANTE,
                        IDENTIFICACION : item.IDENTIFICACION,
                        RAZON_SOCIAL : item.RAZON_SOCIAL,
                        NOMBRE_COMERCIAL : item.NOMBRE_COMERCIAL,
                        CHECKED: false
                    }
                    return promocion
                })
            },
            error =>{
                
            }
        )
    }

    getRestaurantesPorUsuario(idusuario:string){
        this.restauranteService.getRestaurantesByUsuario(idusuario)
            .subscribe(
                data =>{
                    this.listRestaurante = data['resultado']['resultados']
                    this.buscaRestaurante = this.listRestaurante[0].ID_RESTAURANTE
                    this.getClientesRestaurante(this.buscaRestaurante)
                },
                error =>{
                    
                }
            )
    } 

    getRestaurantes(){
        this.restauranteService.getRestaurantes()
            .subscribe(
                data =>{
                    this.listRestaurante = data['resultado']['resultados']
                },
                error =>{
                    
                }
            )
    }

    /*callback(){
        this.getPromocionesPendientes()
    }*/

    exportAsXLSX() {
        let clientes = this.rows.map(item => {
            let obj = {
                NOMBRES:item.NOMBRE,
                CORREO:item.CORREO,
                CODIGO:"CL-"+item.ID_CLIENTE,
                CUPONES:item.CANTIDAD_CUPO,
                FECHA_NACIMIENTO:item.EDAD,
                GENERO:item.GENERO,
                ESTADO:item.ESTADO,
            }
            return obj
        })
        this.excelService.exportAsExcelFile(clientes, 'clientes_bitte');
    }

    exportAsPDF() {
        var cols = [
            {title: "NOMBRES", dataKey: "NOMBRE"},
            {title: "CORREO", dataKey: "CORREO"}, 
            {title: "CODIGO", dataKey: "ID_CLIENTE"},
            {title: "CUPONES", dataKey: "CANTIDAD_CUPO"},
            {title: "FECHA NAC.", dataKey: "EDAD"},
            {title: "GENERO", dataKey: "GENERO"},
            {title: "ESTADO", dataKey: "ESTADO"},
        ] 
        this.excelService.exportAsPdfFile(cols,this.rows, 'clientes_bitte');
    }

    open(content,itemCliente) {
        if(this.buscaRestaurante != null){
            this.clienteSeleccionado =itemCliente
            this.getPromocionesPendientes(this.clienteSeleccionado.ID_CLIENTE,this.buscaRestaurante)
            this.modalPromoRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg',centered: true})
        }else{
            this.toastr.warning("Seleccione restaurante","Error")
        }  
    }

    closePromo(){
        this.modalPromoRef.close()
    }

    openPromoPremio(content,itemCliente) {
        this.clienteSeleccionado =itemCliente
        this.getPromocionesPremio(this.clienteSeleccionado.ID_CLIENTE,this.buscaRestaurante)
        this.modalPromoPremioRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg',centered: true})
    }   

    closePromoPremio(){
        this.modalPromoPremioRef.close()
    }

    redimirPuntos(){
        if(this.listPromociones.filter(item => item.CHECKED).length == 0){
            this.toastr.warning("No hay promociones seleccionadas","Error")
            return
        }
        this.loading = true
        let arrayOfData = [];
        this.listPromociones.filter(item => item.CHECKED).forEach(element => {
            arrayOfData.push(this.promocionService.updatePromoHistorial(element.ID_CLIENTE_PUNTO_HISTORIAL,this.user.ID_USUARIO))
        });
        forkJoin(arrayOfData).subscribe(response => {
            console.log(response)
            this.loading = false
            swal({ title: this.clienteSeleccionado.NOMBRE, text: "¡Premio redimidos exitosamente!",type: "success", showConfirmButton: true })
            .then((result) => {
              if(result.value){                
                this.closePromo()
                this.ngOnInit()
              }              
            });
        }, error => {
            this.toastr.warning(error,"Error")
            this.loading = false
        });            
    }

    asignarPromo(){
        if(this.listPromocionesPremio.filter(item => item.CHECKED).length == 0){
            this.toastr.warning("No hay promociones seleccionadas","Error")
            return
        }
        this.loading = true
        let arrayOfData = [];
        this.listPromocionesPremio.filter(item => item.CHECKED).forEach(element => {
            arrayOfData.push(this.promocionService.createPromoHistorial(this.clienteSeleccionado.ID_CLIENTE,element.ID_PROMOCION,this.user.ID_USUARIO))
        });
        forkJoin(arrayOfData).subscribe(response => {
            console.log(response)
            this.loading = false
            swal({ title: this.clienteSeleccionado.NOMBRE, text: "Tenedor de oro asignado exitosamente!",type: "success", showConfirmButton: true })
            .then((result) => {
              if(result.value)
                this.closePromoPremio()
            });
        }, error => {
            this.toastr.warning(error,"Error")
            this.loading = false
        });     
    }

}