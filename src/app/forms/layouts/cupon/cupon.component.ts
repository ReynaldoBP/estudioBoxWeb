import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CuponService } from 'app/_services/cupon.service';
import { RestauranteService } from 'app/_services/restaurante.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-basic',
  templateUrl: './cupon.component.html',
  styleUrls: ['./cupon.component.scss']
})
export class CuponComponent implements OnInit {
  objCupon: any =
    {
      strDescripcion: '',
      strTipoCupon: '',
      strValor: '',
      strPrecio: '',
      strEstado: true,
      strRestaurante: '',
      strImagen: '',
      strDiaVigente: '',
    }
  arrayTipo: any
  objUsuario: any
  arrayRestaurante: any
  strRestaurante: any
  strTipoCupon: any
  strValor: any
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  constructor(private objCuponService: CuponService,
    private objRestauranteService: RestauranteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    toastr.toastrConfig.timeOut = 5000
    this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
    this.objCupon.id = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.getRestaurantes()
    this.getTipoCupon()
    if (this.objCupon.id != "0") {
      this.getCupon()
    }
  }

  getTipoCupon() {
    this.objCuponService.getTipoCupon()
      .subscribe(
        data => {
          this.arrayTipo = data['resultado']['resultados']
        },
        error => {

        }
      )
  }
  getRestaurantes() {
    this.arrayRestaurante = undefined
    this.objRestauranteService.getRestaurantesACTIVOS()
      .subscribe(
        data => {
          this.arrayRestaurante = data['resultado']['resultados']
        },
        error => {
        }
      )
  }
  getVerificaRestaurantes() {
    this.objCupon.strValor = undefined
    this.objCupon.strPrecio = undefined
    this.strRestaurante = undefined
  }
  getCupon() {
    this.objCuponService.getCupon(this.objCupon.id, this.objUsuario.ID_USUARIO)
      .subscribe(
        data => {
          if (data['status'] == 204) {
            swal({ title: "Cupón no encontrada", text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let rest: any = data['resultado']['resultados'][0]
            this.objCupon.strIdcupon = rest.strIdCupon
            this.objCupon.strDescripcion = rest.strDescripcion
            this.objCupon.strValor = rest.strValor
            this.objCupon.strEstado = rest.strEstado == 'ACTIVO' ? true : false
            this.strRestaurante = rest.strIdRestaurante
            this.strTipoCupon = rest.strIdTipoCupon
            this.objCupon.strPrecio = rest.strPrecio
            this.objCupon.strDiaVigente = rest.strDiaVigente
            this.objCupon.strImagen = rest.strImagen
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }

  guardarDatos() {
    this.objCupon.strTipoCupon = this.strTipoCupon
    this.objCupon.strEstado = this.objCupon.strEstado ? 'ACTIVO' : 'INACTIVO'
    this.objCupon.strRestaurante = this.strRestaurante
    if (this.objCupon.id == 0) {
      this.objCuponService.create(this.objCupon, this.objUsuario.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 200) {
              swal({ title: data['resultado']['descripcion'], text: data['resultado'], type: "success", showConfirmButton: true })
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
      this.objCuponService.edit(this.objCupon, this.objUsuario.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 200) {
              swal({ title: data['resultado']['descripcion'], text: data['resultado'], type: "success", showConfirmButton: true })
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
    this.router.navigate(['/tables/cupon']);
  }
  // Angular2 File Upload
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver
  }
  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    console.log(files);
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Solo imágenes";
      this.toastr.warning(this.message, 'Error')
      return;
    }
    if (files[0].size > 1000000) {
      this.message = "Solo imagenes menor a 1 MB";
      this.toastr.warning(this.message, 'Error')
      return;
    }
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.objCupon.strImagen = reader.result;
    }
  }
  remove() {
    this.objCupon.strImagen = null
  }

}
