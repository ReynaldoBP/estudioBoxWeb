import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CentroComercialService } from 'app/_services/centroComercial.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-basic',
  templateUrl: './centroComercial.component.html',
  styleUrls: ['./centroComercial.component.scss']
})
export class CentroComercialComponent implements OnInit {
  objCentroComercial: any =
    {
      intIdCC: null,
      strNombre: '',
      strDireccion: '',
      strEstado: true,
      strUsuarioCreacion: ''
    }
  objUsuario: any
  constructor(private objCentroComercialService: CentroComercialService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    toastr.toastrConfig.timeOut = 5000

    this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
    this.objCentroComercial.intIdCC = this.route.snapshot.paramMap.get('id');
    this.objCentroComercial.strUsuarioCreacion = this.objUsuario.ID_USUARIO;
  }

  ngOnInit() {
    if (this.objCentroComercial.intIdCC != "0") {
      this.get()
    }
  }
  get() {
    this.objCentroComercial.strUsuarioCreacion = this.objUsuario.ID_USUARIO;
    this.objCentroComercialService.get(this.objCentroComercial)
      .subscribe(
        data => {
          if (data['status'] == 204) {
            swal({ title: "Centro Comercial no encontrada", text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let rest: any = data['resultado']['resultados'][0]
            this.objCentroComercial.intIdCC = rest.intIdCC
            this.objCentroComercial.strNombre = rest.strNombre
            this.objCentroComercial.strDireccion = rest.strDireccion
            this.objCentroComercial.strEstado = rest.strEstado == 'ACTIVO' ? true : false
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }

  guardarDatos() {
    this.objCentroComercial.strEstado = this.objCentroComercial.strEstado ? 'ACTIVO' : 'INACTIVO'
    if (this.objCentroComercial.intIdCC == 0) {
      this.objCentroComercialService.create(this.objCentroComercial)
        .subscribe(
          data => {
            if (data['status'] == 200) {
              swal({ title: this.objCentroComercial.strNombre, text: 'Centro Comercial creado con éxito!', type: "success", showConfirmButton: true })
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
    else {
      this.objCentroComercialService.edit(this.objCentroComercial)
        .subscribe(
          data => {
            if (data['status'] == 200) {
              swal({ title: this.objCentroComercial.strNombre, text: 'Centro Comercial editado con éxito!', type: "success", showConfirmButton: true })
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
    this.router.navigate(['/tables/centroComercial']);
  }
}
