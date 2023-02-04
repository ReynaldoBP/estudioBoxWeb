import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'app/_services/cliente.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

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
      strApellido: '',
      strnombreCompleto: '',
      strCorreo: '',
      intIdTipo: '',
      strEstado: true,
      strUsuarioCreacion: ''
    }
  arrayTipoCliente: any
  strTipoCltFiltro: any
  objUsuario: any
  constructor(private objClienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    toastr.toastrConfig.timeOut = 5000;
    this.arrayTipoCliente = [];
    this.strTipoCltFiltro = "CLIENTE";
    this.objUsuario = JSON.parse(localStorage.getItem('usuario'));
    this.objCliente.intIdCliente = this.route.snapshot.paramMap.get('id');
    this.objCliente.strUsuarioCreacion = this.objUsuario.ID_USUARIO;
  }

  ngOnInit() {
    if (this.objCliente.intIdCliente != "0") {
      this.get()
      this.getTipoCliente()
    }
  }
  get() {
    this.objClienteService.get(this.objCliente)
      .subscribe(
        data => {
          if (data['status'] == 204) {
            swal({ title: "Usuario móvil no encontrado", text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let rest: any = data['resultado']['resultados'][0]
            this.objCliente.intIdCliente = rest.ID_CLIENTE
            this.objCliente.strNombre = rest.NOMBRE
            this.objCliente.strApellido = rest.APELLIDO
            this.objCliente.strnombreCompleto = rest.NOMBRE_COMPLETO
            this.objCliente.strCorreo = rest.CORREO
            this.objCliente.intIdTipo = rest.TIPO_CLIENTE_PUNTAJE_ID
            this.objCliente.strEstado = rest.ESTADO == 'ACTIVO' ? true : false
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }

  getTipoCliente() {
    this.objClienteService.getTipoCliente()
      .subscribe(
        data => {
          this.arrayTipoCliente = data['resultado']['tipoCliente']
        },
        error => {

        }
      )
  }

  guardarDatos() {
    this.objCliente.strEstado = this.objCliente.strEstado ? 'ACTIVO' : 'INACTIVO'
    if (this.objCliente.intIdCliente != 0) {
      this.objClienteService.edit(this.objCliente)
        .subscribe(
          data => {
            if (data['status'] == 400) {
              swal({ title: this.objCliente.strnombreCompleto, text: 'Usuario móvil editado con éxito!', type: "success", showConfirmButton: true })
                .then((result) => {
                  if (result.value)
                    this.iraListado()
                });
            } else {
              this.toastr.warning(data['resultado'], 'Error')
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
