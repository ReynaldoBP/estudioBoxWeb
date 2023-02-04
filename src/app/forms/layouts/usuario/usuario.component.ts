import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { RestauranteService } from 'app/_services/restaurante.service';
import { forkJoin } from 'rxjs';
import { SucursalService } from 'app/_services/sucursal.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-basic',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  image: any;

  listRol: any
  listRestaurante: any
  listRestauranteSeleccionado: any

  usuario: any = {
    nombres: '',
    apellidos: '',
    identificacion: '',
    correo: '',
    clave: '',
    idtiporol: '',
    estado: true,
    notificacion: false
  }

  user: any
  chkTODOSrestaurante: boolean
  objSelectSucursal: any
  objListSucursal: any
  objChkTodaSucursal: boolean
  constructor(private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private restauranteService: RestauranteService,
    private router: Router,
    private route: ActivatedRoute,
    private objSucursalService: SucursalService,) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
    this.usuario.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.user.DESCRIPCION_TIPO_ROL == "ADMINISTRADOR") {
      this.getRoles()
      this.getRestaurantes()
    } else {
      this.getRolesById()
      this.getRestaurantesByUsuario()
    }
    if (this.usuario.id != 0) {
      this.getUsuario()
    }
  }

  getUsuario() {
    this.usuarioService.getUsuarioById(this.usuario.id)
      .subscribe(
        data => {
          if (data['status'] == 404) {
            swal({ title: 'Usuario no encontrado', text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let rest: any = data['resultado']['resultados'][0]
            this.usuario.nombres = rest.NOMBRES
            this.usuario.apellidos = rest.APELLIDOS
            this.usuario.identificacion = rest.IDENTIFICACION
            this.usuario.correo = rest.CORREO
            this.usuario.idtiporol = rest.TIPO_ROL_ID
            this.usuario.estado = rest.ESTADO == 'ACTIVO' ? true : false
            this.usuario.notificacion = rest.NOTIFICACION == 'SI' ? true : false
            this.usuario.clave = rest.CONTRASENIA
            if (this.usuario.idtiporol == 2 || this.usuario.idtiporol == 6) {
              this.getRestaurantesUsuario()
            }
          }
        },
        error => {
          this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
        }
      )
  }

  // Angular2 File Upload
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  remove() {
    this.imgURL = null
  }

  guardarDatos() {
    this.usuario.estado = this.usuario.estado ? 'ACTIVO' : 'INACTIVO'
    this.usuario.notificacion = this.usuario.notificacion ? 'SI' : 'NO'
    if (this.usuario.idtiporol == "" || this.usuario.idtiporol == undefined) {
      this.toastr.warning('El campo Rol es obligatorio.', 'Error')
      return
    }
    if (this.usuario.id == 0) {
      if ((this.usuario.idtiporol == 2) && (this.listRestauranteSeleccionado == undefined || this.objSelectSucursal == undefined)) {
        this.toastr.warning('El campo Restaurante - Sucursal es obligatorio.', 'Error')
        return
      }
      this.usuarioService.createUsuario(this.usuario, this.user.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 204) {
              this.toastr.warning(data['resultado']['mensaje'], 'Error')
            } else {
              if (this.usuario.idtiporol == 2 || this.usuario.idtiporol == 6) {
                let arrayOfData = [];
                this.listRestauranteSeleccionado.forEach(element => {
                  this.objSelectSucursal = (this.objSelectSucursal == undefined) ? "" : this.objSelectSucursal
                  arrayOfData.push(this.restauranteService.createUsuarioRestaurante(data['resultado']['id'], element, this.objSelectSucursal, this.user.ID_USUARIO))
                });
                forkJoin(arrayOfData).subscribe(response => {
                  swal({ title: this.usuario.nombres, text: data['resultado']['mensaje'], type: "success", showConfirmButton: true })
                    .then((result) => {
                      if (result.value)
                        this.iraListado()
                    });
                }, error => {
                  console.error(error);
                });
              } else {
                swal({ title: this.usuario.nombres, text: data['resultado']['mensaje'], type: "success", showConfirmButton: true })
                  .then((result) => {
                    if (result.value)
                      this.iraListado()
                  });
              }
            }
          },
          error => {
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
          }
        )
    } else {
      if ((this.usuario.idtiporol == 2) && (this.listRestauranteSeleccionado == undefined || this.objSelectSucursal == undefined)) {
        this.toastr.warning('El campo Restaurante - Sucursal es obligatorio.', 'Error')
        return
      }
      this.usuarioService.editUsuario(this.usuario, this.user.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 404) {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            } else {
              if (this.usuario.idtiporol == 2 || this.usuario.idtiporol == 6) {
                this.restauranteService.deleteUsuarioRestaurante(this.usuario.id)
                  .subscribe(
                    data2 => {
                      let arrayOfData = [];
                      this.listRestauranteSeleccionado.forEach(element => {
                        this.objSelectSucursal = (this.objSelectSucursal == undefined) ? "" : this.objSelectSucursal
                        arrayOfData.push(this.restauranteService.createUsuarioRestaurante(this.usuario.id, element, this.objSelectSucursal, this.user.ID_USUARIO))
                      });
                      forkJoin(arrayOfData).subscribe(response => {
                        swal({ title: this.usuario.nombres, text: data['resultado'], type: "success", showConfirmButton: true })
                          .then((result) => {
                            if (result.value)
                              this.iraListado()
                          });
                      }, error => {
                        console.error(error);
                      });
                    },
                    error => {
                      this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
                    })
              } else {
                swal({ title: this.usuario.nombres, text: data['resultado'], type: "success", showConfirmButton: true })
                  .then((result) => {
                    if (result.value)
                      this.iraListado()
                  });
              }
            }
          },
          error => {
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
          }
        )
    }
  }

  getRoles() {
    this.usuarioService.getRoles()
      .subscribe(
        data => {
          this.listRol = data['resultado']['tipoRol']
        },
        error => {

        }
      )
  }

  getRolesById() {
    this.usuarioService.getRolesById(this.user.ID_TIPO_ROL)
      .subscribe(
        data => {
          this.listRol = data['resultado']['tipoRol']
        },
        error => {

        }
      )
  }

  iraListado() {
    this.router.navigate(['/tables/usuario']);
  }

  getRestaurantes() {
    this.restauranteService.getRestaurantesACTIVOS()
      .subscribe(
        data => {
          this.listRestaurante = data['resultado']['resultados']
        },
        error => {

        }
      )
  }

  //para edit
  getRestaurantesUsuario() {
    this.restauranteService.getRestauranteUsuario(this.usuario.id)
      .subscribe(
        data => {
          let listado = data['resultado']['resultados']
          this.listRestauranteSeleccionado = listado.map(item => item.ID_RESTAURANTE)
          if (this.usuario.idtiporol == 2) {
            this.getSucursalByIdRestaurante()
            this.objSelectSucursal = listado.map(item => item.SUCURSAL_ID)[0]
          }
        },
        error => {

        }
      )
  }

  getRestaurantesByUsuario() {
    this.restauranteService.getRestaurantesByUsuario(this.user.ID_USUARIO)
      .subscribe(
        data => {
          this.listRestaurante = data['resultado']['resultados']
          this.listRestauranteSeleccionado = data['resultado']['resultados']
        },
        error => {

        }
      )
  }

  verificaTodosRestaurante() {
    if (this.listRestaurante.length != this.listRestauranteSeleccionado.length) {
      this.chkTODOSrestaurante = false
      this.objListSucursal = undefined
      this.objSelectSucursal = undefined
    } else {
      this.chkTODOSrestaurante = true
    }
  }

  verificaRol() {
    if (this.usuario.idtiporol != 2) {
      this.listRestauranteSeleccionado = []
      this.objListSucursal = undefined
      this.objSelectSucursal = undefined
    }
  }

  seleccTodoRestaurante() {
    if (this.chkTODOSrestaurante) {
      this.listRestauranteSeleccionado = this.listRestaurante.map(item => item.ID_RESTAURANTE)
    } else {
      this.listRestauranteSeleccionado = []
    }
  }

  getSucursalByIdRestaurante() {
    this.objListSucursal = undefined
    if (this.listRestauranteSeleccionado[0] != undefined) {
      this.objSucursalService.getSucursalByIdRestaurante(this.listRestauranteSeleccionado[0])
        .subscribe(
          data => {
            if (data['status'] == 200) {
              this.objListSucursal = data['resultado']['resultados']
            } else {
              this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
            }
          },
          error => {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          }
        )
    }
  }
}
