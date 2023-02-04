import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ExcelService } from 'app/_services/excel.service';
import { ClienteService } from 'app/_services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PromocionService } from 'app/_services/promocion.service';
import swal from 'sweetalert2';
import { RestauranteService } from 'app/_services/restaurante.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-extended-table',
    templateUrl: './redimirCupon-list.component.html',
    styleUrls: ['./redimirCupon-list.component.scss']
})

export class redimirCuponComponent implements OnInit, OnDestroy {
    p: number = 1;
    rows: any
    arrayResultado: any
    listPromociones: any
    listPromocionesPremio: any
    user: any
    clienteSeleccionado: any
    buscaCliente: string
    listRestaurante: any
    buscaRestaurante: string
    permisos: any
    acciones: any
    modalPromoRef: NgbModalRef
    loading: boolean
    descripcionOrigin: string
    descripcion: string
    arrayParametros: any =
        {
            strListarCltCupon: "",
            intIdRestaurante: 0
        }
    arrayEstados: any
    strEstadoFiltro: any
    strNombre: any
    strCupon: any
    constructor(private clienteService: ClienteService,
        private excelService: ExcelService,
        private promocionService: PromocionService,
        private restauranteService: RestauranteService,
        private toastr: ToastrService,
        private modalService: NgbModal) {
        this.rows = []
        this.arrayResultado = []
        toastr.toastrConfig.timeOut = 3000
        this.user = JSON.parse(localStorage.getItem('usuario'))
        this.loading = false
        this.descripcionOrigin = "Lista de clientes con los puntos que acumulan cada vez que comen en su restaurante y utilizan la aplicación BITTE para calificar/promocionar. Clientes con puntos suficientes solicitarán en la aplicación BITTE redimir promociones vigentes que su restaurante haya publicado. Las solicitudes de redimir puntos por promociones aparecerán en esta sección para que se validen y se otorgue el plato o bebida en promoción. El cliente presentará su identificación para que con su nombre lo busque en esta sección y le otorgue la promoción seleccionada. Los puntos de la promoción elegida serán restados del puntaje total del cliente"
        this.descripcion = "Lista de clientes con los puntos que acumulan cada vez que comen en su restaurante y utilizan la aplicación BITTE para calificar/promocionar."
        this.arrayEstados = ["PENDIENTE", "COMPLETADO"]
        this.strEstadoFiltro = "PENDIENTE"
    }

    vermas() {
        if (this.descripcion == this.descripcionOrigin) {
            this.descripcion = "Lista de clientes con los puntos que acumulan cada vez que comen en su restaurante y utilizan la aplicación BITTE para calificar/promocionar."
        } else {
            this.descripcion = this.descripcionOrigin
        }
    }

    ngOnInit() {
        if (this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
            this.getClientesCupon()
            this.getRestaurantes()
        } else {
            this.getClientesCupon()
            this.getRestaurantesPorUsuario(this.user.ID_USUARIO)
        }
        this.getPermisos("Prom/RedimirCupon")
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getClientesRestaurante(intIdRestaurante) {
        this.rows = []
        this.arrayParametros.intIdRestaurante = intIdRestaurante
        this.arrayParametros.strListarCltCupon = "SI";
        this.clienteService.getClientesCupon(this.arrayParametros)
            .subscribe(
                data => {
                    this.rows = data['resultado']['resultados']
                },
                error => {

                }
            )
    }

    getClientesCupon() {
        this.arrayResultado = []
        this.arrayParametros.strListarCltCupon = "SI";
        this.clienteService.getClientesCupon(this.arrayParametros)
            .subscribe(
                data => {
                    this.arrayResultado = data['resultado']['resultados']
                },
                error => {
                }
            )
    }

    ngOnDestroy(): void {

    }

    getPromocionesPendientes(idCliente: string, idRestaurante: string) {
        this.listPromociones = null
        this.clienteService.getPromocionesCliente(idCliente, idRestaurante, 'PENDIENTE', null, null, null, null)
            .subscribe(
                data => {
                    let promociones = data['resultado']['resultados']
                    this.listPromociones = promociones.map(item => {
                        let promocion = {
                            ID_CLIENTE_PUNTO_HISTORIAL: item.ID_CLIENTE_PUNTO_HISTORIAL,
                            ESTADO_PROMOCION_HISTORIAL: item.ESTADO_PROMOCION_HISTORIAL,
                            CLIENTE_ID: item.CLIENTE_ID,
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
                error => {

                }
            )
    }


    getRestaurantesPorUsuario(idusuario: string) {
        this.restauranteService.getRestaurantesByUsuario(idusuario)
            .subscribe(
                data => {
                    this.listRestaurante = data['resultado']['resultados']
                    this.buscaRestaurante = this.listRestaurante[0].ID_RESTAURANTE
                    this.getClientesRestaurante(this.buscaRestaurante)
                },
                error => {

                }
            )
    }

    getRestaurantes() {
        this.restauranteService.getRestaurantes()
            .subscribe(
                data => {
                    this.listRestaurante = data['resultado']['resultados']
                },
                error => {

                }
            )
    }

    exportAsXLSX() {
        let clientes = this.arrayResultado.map(item => {
            let obj = {
                NOMBRES: item.NOMBRE_COMPLETO,
                CORREO: item.CORREO,
                CODIGO: "CL-" + item.ID_CLIENTE,
                CUPON: item.CUPON,
                FE_CREACION: item.FE_CREACION,
                FE_VIGENCIA: item.FE_VIGENCIA,
                ESTADO: item.ESTADO
            }
            return obj
        })
        this.excelService.exportAsExcelFile(clientes, 'clientes_bitte');
    }

    exportAsPDF() {
        var cols = [
            { title: "NOMBRES", dataKey: "NOMBRE_COMPLETO" },
            { title: "CORREO", dataKey: "CORREO" },
            { title: "CODIGO", dataKey: "ID_CLIENTE" },
            { title: "CUPON", dataKey: "CUPON" },
            { title: "FECHA CREACION", dataKey: "FE_CREACION" },
            { title: "FECHA VIGENCIA", dataKey: "FE_VIGENCIA" },
            { title: "ESTADO", dataKey: "ESTADO" },
        ]
        this.excelService.exportAsPdfFile(cols, this.arrayResultado, 'clientes_bitte');
    }

    getModalCupon(content, itemCliente) {
        if (this.buscaRestaurante != null) {
            this.clienteSeleccionado = itemCliente
            this.getPromocionesPendientes(this.clienteSeleccionado.ID_CLIENTE, this.buscaRestaurante)
            this.modalPromoRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
        } else {
            this.toastr.warning("Seleccione restaurante", "Error")
        }
    }

    quitModalCupon() {
        this.modalPromoRef.close()
    }

    redimirCupon() {
        if (this.listPromociones.filter(item => item.CHECKED).length == 0) {
            this.toastr.warning("No hay promociones seleccionadas", "Error")
            return
        }
        this.loading = true
        let arrayOfData = [];
        this.listPromociones.filter(item => item.CHECKED).forEach(element => {
            arrayOfData.push(this.promocionService.updatePromoHistorial(element.ID_CLIENTE_PUNTO_HISTORIAL, this.user.ID_USUARIO))
        });
        forkJoin(arrayOfData).subscribe(response => {
            this.loading = false
            swal({ title: this.clienteSeleccionado.NOMBRE, text: "¡Premio redimidos exitosamente!", type: "success", showConfirmButton: true })
                .then((result) => {
                    if (result.value) {
                        this.quitModalCupon()
                        this.ngOnInit()
                    }
                });
        }, error => {
            this.toastr.warning(error, "Error")
            this.loading = false
        });
    }
}