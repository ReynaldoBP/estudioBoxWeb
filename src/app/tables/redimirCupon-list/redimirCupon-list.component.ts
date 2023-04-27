import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ExcelService } from 'app/_services/excel.service';
import { ClienteService } from 'app/_services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PromocionService } from 'app/_services/promocion.service';
import swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { EmpresaService } from 'app/_services/empresa.service';
@Component({
    selector: 'app-extended-table',
    templateUrl: './redimirCupon-list.component.html',
    styleUrls: ['./redimirCupon-list.component.scss']
})

export class redimirCuponComponent implements OnInit, OnDestroy {
    p: number = 1;
    rows: any
    arrayResultado: any
    arrayPromociones: any
    user: any
    clienteSeleccionado: any
    buscaCliente: string
    listRestaurante: any
    strEmpresaSeleccionada: string
    permisos: any
    acciones: any
    modalPromoRef: NgbModalRef
    loading: boolean
    descripcionOrigin: string
    descripcion: string
    arrayParametros: any =
        {
            strListarCltCupon: "",
            intIdEmpresa: 0
        }
    arrayParametrosPromoPendClt: any =
        {
            intIdEmpresa: "",
            intIdCliente: "",
            strEstado: "",
            intIdUsuario: ""
        }
    arrayParametrosRedimir: any =
        {
            intIdCltPromoHist: "",
            intIdUsuario: ""
        }
    arrayEstados: any
    strEstadoFiltro: any
    strNombre: any
    strCupon: any
    objParametrosEmpresa: any = {
        strEstado: "ACTIVO",
        strContador: "NO",
        intIdUsuario: ""
    }
    arrayEmpresa: any

    constructor(private objClienteService: ClienteService,
        private excelService: ExcelService,
        private objPromocionService: PromocionService,
        private objEmpresaService: EmpresaService,
        private toastr: ToastrService,
        private modalService: NgbModal) {
        this.rows = []
        this.arrayResultado = []
        toastr.toastrConfig.timeOut = 3000
        this.user = JSON.parse(localStorage.getItem('usuario'))
        this.loading = false
        this.descripcionOrigin = "Lista de clientes con los puntos que acumulan cada vez que comen en su restaurante y utilizan la aplicación Estudio Box para calificar/promocionar. Clientes con puntos suficientes solicitarán en la aplicación Estudio Box redimir promociones vigentes que su restaurante haya publicado. Las solicitudes de redimir puntos por promociones aparecerán en esta sección para que se validen y se otorgue el plato o bebida en promoción. El cliente presentará su identificación para que con su nombre lo busque en esta sección y le otorgue la promoción seleccionada. Los puntos de la promoción elegida serán restados del puntaje total del cliente"
        this.descripcion = "Lista de clientes con los puntos que acumulan cada vez que comen en su restaurante y utilizan la aplicación Estudio Box para calificar/promocionar."
        this.arrayEstados = ["PENDIENTE", "COMPLETADO"]
        this.strEstadoFiltro = "PENDIENTE"
    }

    vermas() {
        if (this.descripcion == this.descripcionOrigin) {
            this.descripcion = "Lista de clientes con los puntos que acumulan cada vez que comen en su restaurante y utilizan la aplicación Estudio Box para calificar/promocionar."
        } else {
            this.descripcion = this.descripcionOrigin
        }
    }

    ngOnInit() {
        if (this.user.strTipoRol == "ADMINISTRADOR") {
            this.getClientesCupon()
        }
        this.getEmpresas()
        this.getPermisos("Prom/RedimirCupon")
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }

    getClientesRestaurante(intIdEmpresa) {
        this.rows = []
        this.arrayParametros.intIdEmpresa = intIdEmpresa
        this.arrayParametros.strListarCltCupon = "SI";
        this.objClienteService.getClientesCupon(this.arrayParametros)
            .subscribe(
                data => {
                    if (data["intStatus"] == 200) {
                        this.arrayResultado = data["arrayData"]
                    }
                    else {
                        this.arrayResultado = []
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {

                }
            )
    }

    getClientesCupon() {
        this.arrayResultado = []
        this.arrayParametros.strListarCltCupon = "SI";
        this.objClienteService.getClientesCupon(this.arrayParametros)
            .subscribe(
                data => {
                    if (data["intStatus"] == 200) {
                        this.arrayResultado = data["arrayData"]
                    }
                    else {
                        this.arrayResultado = []
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {
                }
            )
    }

    ngOnDestroy(): void {

    }

    getPromocionesPendientesPorClt(intIdCliente: string, intIdEmpresa: string) {
        this.arrayPromociones = null
        this.arrayParametrosPromoPendClt.intIdCliente = intIdCliente
        this.arrayParametrosPromoPendClt.intIdEmpresa = intIdEmpresa
        this.arrayParametrosPromoPendClt.strEstado = "PENDIENTE"
        this.arrayParametrosPromoPendClt.intIdUsuario = this.user.intIdUsuario
        this.objClienteService.getPromocionesPendientesPorClt(this.arrayParametrosPromoPendClt)
            .subscribe(
                data => {
                    if (data["intStatus"] == 200) {
                        let promociones = data["arrayData"]
                        this.arrayPromociones = promociones.map(item => {
                            let promocion = {
                                strDescPromo: item.strDescPromo,
                                intIdCltPromoHist: item.intIdCltPromoHist,
                                CHECKED: false
                            }
                            return promocion
                        })
                        console.log(data);
                    }
                    else {
                        this.arrayResultado = []
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {

                }
            )
    }
    getEmpresas() {
        this.objParametrosEmpresa.intIdUsuario = (this.user.strTipoRol != "ADMINISTRADOR") ? this.user.intIdUsuario : ""
        this.objEmpresaService.getEmpresa(this.objParametrosEmpresa)
            .subscribe(
                data => {
                    if (data['intStatus'] != 200) {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    } else {
                        this.arrayEmpresa = data["arrayEmpresa"]
                        if (this.user.strTipoRol != "ADMINISTRADOR") {
                            this.strEmpresaSeleccionada = this.arrayEmpresa[0].intIdEmpresa
                            this.getClientesRestaurante(this.strEmpresaSeleccionada)
                        }
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
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
        this.excelService.exportAsExcelFile(clientes, 'clientes_Estudio Box');
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
        this.excelService.exportAsPdfFile(cols, this.arrayResultado, 'clientes_Estudio Box');
    }

    getModalCupon(content, itemCliente) {
        if (this.strEmpresaSeleccionada != null) {
            this.clienteSeleccionado = itemCliente
            this.getPromocionesPendientesPorClt(this.clienteSeleccionado.ID_CLIENTE, this.strEmpresaSeleccionada)
            this.modalPromoRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
        } else {
            this.toastr.warning("Seleccione una Empresa", "Error")
        }
    }

    quitModalCupon() {
        this.modalPromoRef.close()
    }

    redimirCupon() {
        if (this.arrayPromociones.filter(item => item.CHECKED).length == 0) {
            this.toastr.warning("No hay promociones seleccionadas", "Error")
            return
        }
        this.loading = true
        let arrayOfData = [];
        this.arrayPromociones.filter(item => item.CHECKED).forEach(element => {
            this.arrayParametrosRedimir.intIdCltPromoHist = element.intIdCltPromoHist
            this.arrayParametrosRedimir.intIdUsuario = this.user.intIdUsuario
            arrayOfData.push(this.objPromocionService.editPromocionHistorial(this.arrayParametrosRedimir))
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