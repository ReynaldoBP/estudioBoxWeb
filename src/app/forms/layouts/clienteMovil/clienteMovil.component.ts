import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'app/_services/cliente.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
import { EmpresaService } from 'app/_services/empresa.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { AreaService } from 'app/_services/area.service';
@Component({
  selector: 'app-basic',
  templateUrl: './clienteMovil.component.html',
  styleUrls: ['./clienteMovil.component.scss']
})
export class ClienteMovilComponent implements OnInit {
  objCliente: any =
    {
      intIdCliente: null,
      strNombre: '',
      strCorreo: '',
      strEstado: true,
      strUsuarioCreacion: ''
    }
  objParametrosEmpresa: any = {
    strEstado: "ACTIVO",
    strContador: "SI"
  }
  objParametrosSucursal: any = {
    strEstado: "ACTIVO",
    strContador: "NO",
    intIdUsuario: "",
    intIdEmpresa: ""
  }
  arraySucursal: any
  arrayEmpresa: any
  arrayArea: any
  arrayTipoCliente: any
  strTipoCltFiltro: any
  objUsuario: any
  arrayParametrosArea: any = {
    strEstado: "ACTIVO",
    intIdUsuario: "",
    arrayIdSucursal: ""
  }
  constructor(private objClienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private objEmpresaService: EmpresaService,
    private objSucursalService: SucursalService,
    private objAreaService: AreaService
  ) {
    toastr.toastrConfig.timeOut = 5000;
    this.arrayTipoCliente = [];
    this.strTipoCltFiltro = "CLIENTE";
    this.objUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.objCliente.intIdCliente = this.route.snapshot.paramMap.get('id');
    this.objCliente.strUsuarioCreacion = this.objUsuario.intIdUsuario;
  }

  ngOnInit() {
    if (this.objUsuario.strTipoRol == "ADMINISTRADOR") {
      this.getEmpresas()
    } else {
      this.getEmpresasPorUsuario()
    }
    if (this.objCliente.intIdCliente != "0") {
      this.get()
    }
  }
  get() {
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
            let rest: any = data['arrayCliente'][0]
            this.objCliente.intIdCliente = rest.intIdCliente
            this.objCliente.strNombre = rest.strNombre
            this.objCliente.strCorreo = rest.strCorreo
            this.objCliente.strEstado = rest.strEstado == 'ACTIVO' ? true : false
            this.objCliente.intIdEmpresa = rest.intIdEmpresa
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getEmpresasPorUsuario() {
    this.objParametrosEmpresa.intIdUsuario = this.objUsuario.intIdUsuario
    this.objParametrosEmpresa.strContador = "NO"
    //this.objParametrosEmpresa.intIdCltMovil = this.objCliente.intIdCliente
    this.objEmpresaService.getEmpresa(this.objParametrosEmpresa)
      .subscribe(
        data => {
          if (data['intStatus'] != 200) {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          } else {
            this.arrayEmpresa = data["arrayEmpresa"]
            this.getSucursales()
            //this.objCliente.intIdEmpresa = this.arrayEmpresa.map(item => item.intIdEmpresa)
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getEmpresas() {
    this.objParametrosEmpresa.strContador = "NO"
    //this.objParametrosEmpresa.intIdCltMovil = this.objCliente.intIdCliente
    this.objEmpresaService.getEmpresa(this.objParametrosEmpresa)
      .subscribe(
        data => {
          if (data['intStatus'] != 200) {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          } else {
            this.arrayEmpresa = data["arrayEmpresa"]
            this.getSucursales()
            //this.objCliente.intIdEmpresa = this.arrayEmpresa.map(item => item.intIdEmpresa)
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getSucursales() {
    this.objParametrosSucursal.intIdUsuario = this.objUsuario.intIdUsuario
    this.objParametrosSucursal.intIdClienteEmpresa = this.objCliente.intIdCliente
    this.objParametrosSucursal.intIdEmpresa = this.objCliente.intIdEmpresa
    this.objSucursalService.getSucursal(this.objParametrosSucursal)
      .subscribe(
        data => {
          this.arraySucursal = data["arraySucursal"]
          const sucursalesAsignadas = this.arraySucursal.filter(sucursal => sucursal.intIdCltSucursal !== null).map(sucursal => sucursal.intIdCltSucursal);
          // Asignar las sucursales preseleccionadas al modelo de usuario
          this.objCliente.arrayIdSucursal = sucursalesAsignadas;
          this.getArea()
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getArea() {
    this.objCliente.arrayIdArea = ""
    this.arrayParametrosArea.arrayIdSucursal = this.objCliente.arrayIdSucursal
    this.arrayParametrosArea.intIdClienteEmpresa = this.objCliente.intIdCliente
    this.arrayParametrosArea.intIdUsuario = this.objUsuario.intIdUsuario
    this.objAreaService.getArea(this.arrayParametrosArea)
      .subscribe(
        data => {
          this.arrayArea = data["arrayArea"]
          const areasAsignadas = this.arrayArea.filter(area => area.intIdCltArea !== null).map(area => area.intIdCltArea);
          // Asignar las áreas preseleccionadas al modelo de objCliente
          this.objCliente.arrayIdArea = areasAsignadas;
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  guardarDatos() {
    this.objCliente.strEstado = this.objCliente.strEstado ? 'ACTIVO' : 'INACTIVO'
    if (this.objCliente.intIdCliente != 0) {
      this.objClienteService.edit(this.objCliente)
        .subscribe(
          data => {
            if (data['intStatus'] == 200) {
              swal({ title: this.objCliente.strNombre, text: 'Usuario móvil editado con éxito!', type: "success", showConfirmButton: true })
                .then((result) => {
                  if (result.value)
                    this.iraListado()
                });
            } else {
              this.toastr.warning(data['strMensaje'], 'Error')
            }
          },
          error => {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          }
        )
    }
  }

  iraListado() {
    this.router.navigate(['/tables/clienteMovil']);
  }
}
