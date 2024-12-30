import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'app/_services/excel.service';
import { ClienteService } from 'app/_services/cliente.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-extended-table',
    templateUrl: './clienteMovil-list.component.html',
    styleUrls: ['./clienteMovil-list.component.scss']
})

export class ClienteMovilListComponent implements OnInit {
    arrayResultado: any
    strPermisos: any
    strAcciones: any
    objUsuario: any
    strNombre: any
    arrayEstados: any
    strEstadoFiltro: any
    arrayTipoCliente: any
    strTipoCltFiltro: any
    objCliente: any =
        {
            intIdCliente: null,
            strNombre: '',
            strCorreo: '',
            strEstado: true,
            strUsuarioCreacion: ''
        }
    objArrayExcel: any
    constructor(private objClienteService: ClienteService,
        private objServiceExportData: ExcelService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute) {
        this.arrayResultado = []
        this.arrayTipoCliente = []
        this.strTipoCltFiltro = "CLIENTE"
        this.getPermisos("Seg/UsuariosMovil")
        this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
        this.arrayEstados = ["ACTIVO", "INACTIVO"]
        this.strEstadoFiltro = "ACTIVO"
    }

    ngOnInit() {
        if (this.getAccion('VER')) {
            if (this.objUsuario.strTipoRol == "ADMINISTRADOR") {
                this.getClientesAdmin()
            }
            else {
                this.get()
            }

        }
    }
    iraListado() {
        this.router.navigate(['/tables/usuario']);
    }
    getPermisos(strDescModulo: string) {
        this.strPermisos = JSON.parse(localStorage.getItem('permisos'))
        this.strAcciones = this.strPermisos.filter(item => item['DESCRIPCION_MODULO'] == strDescModulo)
    }

    getAccion(strDescAccion: string) {
        return (this.strAcciones.find(item => item['DESCRIPCION_ACCION'] == strDescAccion) != undefined)
    }
    get() {
        this.objCliente.intIdEmpresa = this.objUsuario.intIdUsuarioEmpresa
        this.objCliente.strEsUsEmpresa = this.objUsuario.strEsUsEmpresa
        console.log(this.objCliente)
        this.objClienteService.get(this.objCliente)
            .subscribe(
                data => {
                    if (data['intStatus'] != 200) {
                        swal({ title: "Usuario móvil no encontrado", text: data['resultado'], type: "error", showConfirmButton: true })
                            .then((result) => {
                                if (result.value)
                                    this.iraListado()
                            });
                    } else {
                        this.arrayResultado = data['arrayCliente']
                        console.log(this.arrayResultado)
                        const arrayResultadoFiltrado = this.arrayResultado.filter(item => item.intIdEmpresa !== null && item.intIdEmpresa == this.objUsuario.intIdUsuarioEmpresa).map(
                            item => {
                                let arrayTemp = {
                                    intIdEmpresa: item.intIdEmpresa,
                                    intIdCliente: item.intIdCliente,
                                    strAutenticacionRS: item.strAutenticacionRS,
                                    strCorreo: item.strCorreo,
                                    strEdad: item.strEdad,
                                    strEstado: item.strEstado,
                                    strFeCreacion: item.strFeCreacion,
                                    strFeModificacion: item.strFeModificacion,
                                    strGenero: item.strGenero,
                                    strIdentificacion: item.strIdentificacion,
                                    strNombre: item.strNombre,
                                    strNombreEmpresa: item.strNombreEmpresa,
                                    strUsrModificacion: item.strUsrModificacion,
                                    strusrCreacion: item.strusrCreacion
                                }
                                return arrayTemp
                            }
                        );
                        this.arrayResultado = arrayResultadoFiltrado;
                        console.log(this.arrayResultado)
                        this.objArrayExcel = this.arrayResultado.map(item => {
                            let arrayItem = {
                                NOMBRE: item.strNombre,
                                CORREO: item.strCorreo,
                                ESTADO: item.strEstado,
                                EMPRESA: item.strNombreEmpresa
                            }
                            return arrayItem
                        })
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
    getClientesAdmin() {
        this.objClienteService.getClientesAdmin()
            .subscribe(
                data => {
                    console.log(data)
                    if (data['intStatus'] != 200) {

                        swal({ title: 'Usuarios Móvil no encontrado', text: data['resultado'], type: "error", showConfirmButton: true })
                            .then((result) => {
                                if (result.value)
                                    this.iraListado()
                            });
                    }
                    else {
                        this.arrayResultado = data['arrayCliente']
                        console.log(this.arrayResultado)
                        this.objArrayExcel = this.arrayResultado.map(item => {
                            let arrayItem = {
                                NOMBRE: item.strNombre,
                                CORREO: item.strCorreo,
                                ESTADO: item.strEstado,
                                EMPRESA: item.strNombreEmpresa
                            }
                            return arrayItem
                        })
                    }
                },
                error => {

                }
            )
    }
    exportAsXLSX() {
        this.objServiceExportData.exportAsExcelFile(this.objArrayExcel, 'clientesMovil');
    }

    exportAsPDF() {
        var cols = [
            { title: "NOMBRE_COMPLETO", dataKey: "strNombre" },
            { title: "CORREO", dataKey: "strCorreo" },
            { title: "ESTADO", dataKey: "strEstado" }
        ]
        this.objServiceExportData.exportAsPdfFile(cols, this.arrayResultado, 'clientesMovil');
    }
}