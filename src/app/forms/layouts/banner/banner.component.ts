import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { RestauranteService } from 'app/_services/restaurante.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { BannerService } from 'app/_services/banner.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-basic',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  image: any;
  boolModifiqueImagen = 'N';
  objBanner: any =
    {
      strDescripcion: '',
      strEstado: true,
      strImagen: '',
    }

  objUsuario: any

  constructor(private bannerService: BannerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    toastr.toastrConfig.timeOut = 5000
    this.objUsuario = JSON.parse(localStorage.getItem('usuario'))
    this.objBanner.id = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    if (this.objBanner.id != "0") {
      this.getBanner()
    }
  }

  getBanner() {
    this.bannerService.getBanner(this.objBanner.id, this.objUsuario.ID_USUARIO)
      .subscribe(
        data => {
          if (data['status'] == 204) {
            swal({ title: "Banner no encontrada", text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let rest: any = data['resultado']['resultados'][0]
            this.objBanner.strIdBanner = rest.strIdBanner
            this.objBanner.strDescripcion = rest.strDescripcion
            this.objBanner.strEstado = rest.strEstado == 'ACTIVO' ? true : false
            this.objBanner.strImagen = rest.strImagen
          }
        },
        error => {
          this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
        }
      )
  }

  guardarDatos() {
    this.objBanner.strEstado = this.objBanner.strEstado ? 'ACTIVO' : 'INACTIVO'
    if (this.objBanner.id == 0) {
      this.bannerService.create(this.objBanner, this.objUsuario.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 200) {
              swal({ title: data['resultado']['descripcion'], text: 'Banner creada con exito!', type: "success", showConfirmButton: true })
                .then((result) => {
                  if (result.value)
                    this.iraListado()
                });
            } else {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            }
          },
          error => {
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
          }
        )
    }
    else {
      this.objBanner.strImagen = this.boolModifiqueImagen == 'N' ? null : this.objBanner.strImagen
      this.bannerService.edit(this.objBanner, this.objUsuario.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 200) {
              swal({ title: data['resultado']['descripcion'], text: 'Banner editado con exito!', type: "success", showConfirmButton: true })
                .then((result) => {
                  if (result.value)
                    this.iraListado()
                });
            } else {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            }
          },
          error => {
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
          }
        )
    }
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
      this.objBanner.strImagen = reader.result;
    }
  }
  remove() {
    this.boolModifiqueImagen = 'S'
    this.objBanner.strImagen = null
  }
  iraListado() {
    this.router.navigate(['/tables/banner']);
  }
}
