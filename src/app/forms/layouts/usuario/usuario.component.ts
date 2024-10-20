import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EmpresaService } from 'app/_services/empresa.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { AreaService } from 'app/_services/area.service';
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
  arrayEmpresa: any
  usuario: any = {
    strNombre: '',
    strApellido: '',
    strIdentificacion: '',
    strCorreo: '',
    intIdTipoRol: '',
    strEstado: true,
    strNotificacion: false,
    intIdEmpresa: 0,
    arrayIdSucursal: 0,
    arrayIdArea: 0,
    strUsrSesion: ""
  }
  arrayParametrosSucursal: any = {
    strEstado: "ACTIVO",
    intIdEmpresa: ""
  }
  objParametrosEmpresa: any = {
    strEstado: "ACTIVO",
    strContador: "SI"
  }
  objParametrosUsuario: any = {
    intIdUsuario: 0
  }
  objSelectEmpresa: any = null
  arrayRestaurante: any
  user: any
  chkTODOSrestaurante: boolean
  objListSucursal: any
  objChkTodaSucursal: boolean
  objSelectSucursal: any
  intSelectSucursal: any = null
  arraySucursal: any
  objParametrosSucursal: any = {
    strEstado: "ACTIVO",
    strContador: "NO",
    intIdUsuario: "",
    intIdEmpresa: ""
  }
  arrayArea: any
  objSelectArea: any = null
  arrayParametrosArea: any = {
    strEstado: "ACTIVO",
    intIdUsuario: "",
    arrayIdSucursal: ""
  }
  constructor(private usuarioService: UsuarioService,
    private objEmpresaService: EmpresaService,
    private objSucursalService: SucursalService,
    private objAreaService: AreaService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
    this.usuario.intIdUsuario = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getRoles()
    this.usuario.strUsrSesion = this.user.intIdUsuario
    if (this.user.strTipoRol == "ADMINISTRADOR") {
      this.getEmpresas()
    } else {
      this.getEmpresasPorUsuario()
    }
    if (this.usuario.intIdUsuario != 0) {
      this.getUsuariosCriterio()
    }
  }

  getUsuariosCriterio() {
    this.objParametrosUsuario.intIdUsuario = this.usuario.intIdUsuario
    console.log(this.objParametrosUsuario)
    this.usuarioService.getUsuariosCriterio(this.objParametrosUsuario)
      .subscribe(
        data => {
          if (data['intStatus'] != 200) {
            swal({ title: 'Usuario no encontrado', text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let rest: any = data["arrayUsuario"]["resultados"][0]
            this.usuario.intIdUsuario = rest.intIdUsuario
            this.usuario.strNombre = rest.strNombre
            this.usuario.strApellido = rest.strApellido
            this.usuario.strIdentificacion = rest.strIdentificacion
            this.usuario.strCorreo = rest.strCorreo
            this.usuario.intIdTipoRol = rest.intIdTipoRol
            this.usuario.strEstado = rest.strEstado == 'ACTIVO' ? true : false
            this.usuario.strNotificacion = rest.strNotificacion == 'SI' ? true : false
            this.usuario.intIdEmpresa = rest.intIdEmpresa
            this.objSelectEmpresa = rest.intIdEmpresa
            if (this.usuario.intIdTipoRol == 2) {
              this.getEmpresasPorUsuario()
              this.getSucursales()
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
    this.usuario.strEstado = this.usuario.strEstado ? 'ACTIVO' : 'INACTIVO'
    this.usuario.strNotificacion = this.usuario.strNotificacion ? 'SI' : 'NO'

    if (this.usuario.intIdTipoRol == "" || this.usuario.intIdTipoRol == undefined) {
      this.toastr.warning('El campo Rol es obligatorio.', 'Error')
      return
    }
    console.log(this.usuario)

    if (this.usuario.intIdUsuario == 0) {
      if ((this.usuario.intIdTipoRol == 2) && (this.usuario.intIdEmpresa == undefined)) {
        this.toastr.warning('El campo Empresa es obligatorio.', 'Error')
        return
      }
      this.usuarioService.createUsuario(this.usuario)
        .subscribe(
          data => {
            console.log(data)
            if (data['intStatus'] != 200) {
              this.toastr.warning(data['strMensaje'], 'Error')
            } else {
              swal({ title: this.usuario.nombres, text: data['strMensaje'], type: "success", showConfirmButton: true })
                .then((result) => {
                  if (result.value)
                    this.iraListado()
                });
            }
          },
          error => {
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
          }
        )
    } else {
      if ((this.usuario.intIdTipoRol == 2) && (this.usuario.intIdEmpresa == undefined)) {
        this.toastr.warning('El campo Empresa es obligatorio.', 'Error')
        return
      }
      this.usuarioService.editUsuario(this.usuario)
        .subscribe(
          data => {
            console.log(data)
            if (data['intStatus'] != 200) {
              this.toastr.warning(data['strMensaje'], 'Error')
            } else {
              swal({ title: this.usuario.nombres, text: data['strMensaje'], type: "success", showConfirmButton: true })
                .then((result) => {
                  if (result.value)
                    this.iraListado()
                });
            }
          },
          error => {
            console.log("entro por error")
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
          }
        )
    }
  }

  getRoles() {
    this.usuarioService.getRoles()
      .subscribe(
        data => {
          this.listRol = data['arrayRoles']
        },
        error => {

        }
      )
  }

  iraListado() {
    this.router.navigate(['/tables/usuario']);
  }

  getEmpresas() {
    this.objParametrosEmpresa.strContador = "NO"
    this.objEmpresaService.getEmpresa(this.objParametrosEmpresa)
      .subscribe(
        data => {
          if (data['intStatus'] != 200) {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          } else {
            this.arrayEmpresa = data["arrayEmpresa"]
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getSucursales() {
    this.objParametrosSucursal.intIdUsuario = this.user.intIdUsuario
    this.objParametrosSucursal.intIdUsuarioEmpresa = this.usuario.intIdUsuario
    this.objParametrosSucursal.intIdEmpresa = this.usuario.intIdEmpresa
    this.objSucursalService.getSucursal(this.objParametrosSucursal)
      .subscribe(
        data => {
          this.arraySucursal = data["arraySucursal"]
          this.getArea()
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getArea() {
    this.arrayParametrosArea.arrayIdSucursal = this.usuario.arrayIdSucursal
    this.arrayParametrosArea.intIdUsuarioEmpresa = this.usuario.intIdUsuario
    this.arrayParametrosArea.intIdUsuario = this.user.intIdUsuario
    this.objAreaService.getArea(this.arrayParametrosArea)
      .subscribe(
        data => {
          this.arrayArea = data["arrayArea"]
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  //para edit
  getEmpresasPorUsuario() {
    this.objParametrosEmpresa.strContador = "NO"
    this.objParametrosEmpresa.intIdUsuario = this.usuario.intIdUsuario
    this.objEmpresaService.getEmpresa(this.objParametrosEmpresa)
      .subscribe(
        data => {
          if (data['intStatus'] != 200) {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          } else {
            this.arrayEmpresa = data["arrayEmpresa"]
            this.usuario.intIdEmpresa = this.arrayEmpresa.map(item => item.intIdEmpresa)
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }

}
