import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { RestauranteService } from 'app/_services/restaurante.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoComidaService } from 'app/_services/tipocomida.service';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-basic',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.scss']
})
export class RestauranteComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  image: any;
  arrayParametros: any = {
    intIdRestaurante: '',
    intIdTipoComida: ''
  }
  restaurante: any = {
    razon_social: '',
    nombre_comercial: '',
    tipo_id: '',
    identificacion: '',
    representante_legal: '',
    direccion_tributaria: '',
    numero_contacto: '',
    url_catalogos: '',
    email: '',
    arrayTipoComida: '',
    estado: true,
    codigo: false,
    esAfiliado: true,
    imagen: '',
    icono: '',
    idRestaurante: '',
    url_redSocial: ''
  }

  usuario: any
  arrayTipoComida: any
  arrayTipoComidaSeleccionada: any
  boolSeleccionarTodosTipoComida: boolean
  constructor(private router: Router,
    private route: ActivatedRoute,
    private restauranteService: RestauranteService,
    private tipocomidaservice: TipoComidaService,
    private toastr: ToastrService
  ) {
    toastr.toastrConfig.timeOut = 5000
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.restaurante.id = this.route.snapshot.paramMap.get('id');
    this.boolSeleccionarTodosTipoComida = false
  }
  getSeleccionarTodoTipoComida() {
    if (this.boolSeleccionarTodosTipoComida) {
      this.arrayTipoComidaSeleccionada = this.arrayTipoComida.map(item => item.ID_TIPO_COMIDA)
    } else {
      this.arrayTipoComidaSeleccionada = []
    }
  }

  getValidarTiposComida() {
    if (this.arrayTipoComidaSeleccionada.length != this.arrayTipoComida.length) {
      this.boolSeleccionarTodosTipoComida = false
    } else {
      this.boolSeleccionarTodosTipoComida = true
    }
  }
  ngOnInit() {
    this.restaurante.usuario = this.usuario.ID_USUARIO
    if (this.restaurante.id != 0) {
      this.restauranteService.getRestaurantesById(this.restaurante.id)
        .subscribe(
          data => {
            if (data['status'] == 404) {
              swal({ title: 'Restaurante no encontrado', text: data['resultado'], type: "error", showConfirmButton: true })
                .then((result) => {
                  if (result.value)
                    this.iraListado()
                });
            } else {
              let rest: any = data['resultado']['resultados'][0]
              this.restaurante.tipo_id = rest.TIPO_IDENTIFICACION
              this.restaurante.identificacion = rest.IDENTIFICACION
              this.restaurante.razon_social = rest.RAZON_SOCIAL
              this.restaurante.nombre_comercial = rest.NOMBRE_COMERCIAL
              this.restaurante.representante_legal = rest.REPRESENTANTE_LEGAL
              this.restaurante.direccion_tributaria = rest.DIRECCION_TRIBUTARIO
              this.restaurante.url_catalogos = rest.URL_CATALOGO
              this.restaurante.url_redSocial = rest.URL_RED_SOCIAL
              this.restaurante.numero_contacto = rest.NUMERO_CONTACTO
              this.restaurante.estado = rest.ESTADO == 'ACTIVO' ? true : false
              this.restaurante.codigo = rest.CODIGO
              this.restaurante.esAfiliado = rest.ES_AFILIADO == 'SI' ? true : false
              this.restaurante.imagen = rest.IMAGEN ? rest.IMAGEN : ''
              this.restaurante.icono = rest.ICONO ? rest.ICONO : ''
              this.restaurante.idRestaurante = rest.ID_RESTAURANTE
              this.getTiposComidaByRestaurante()
            }
          },
          error => {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          }
        )
    }
    this.getTiposComida()
  }
  getTiposComidaByRestaurante() {
    this.arrayParametros.intIdRestaurante = this.restaurante.id
    this.arrayParametros.intIdTipoComida = ""
    this.restauranteService.getComidaRestaurante(this.arrayParametros)
      .subscribe(
        data => {
          if (data['status'] == 204) {
            swal({ title: 'Tipos de comidas no encontrado', text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let arrayTipoComidaRes = data['resultado']['resultados']
            this.arrayTipoComidaSeleccionada = arrayTipoComidaRes.map(item => item.ID_TIPO_COMIDA)
            this.getValidarTiposComida()
          }
        }
      )
  }
  getTiposComida() {
    this.tipocomidaservice.getTiposComida(1)
      .subscribe(
        data => {
          this.arrayTipoComida = data['resultado']['tipoComida']
        },
        error => {

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
  iconURL: any;
  public message: string;

  previewIcon(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (files[0].size > 500000) {
      this.message = "Solo iconos menor a 500 KB";
      this.toastr.warning(this.message, 'Error')
      return;
    }
    if (!mimeType.match('image/jpeg') && !mimeType.match('image/png')) {
      this.message = "Solo archivos .png";
      this.toastr.warning(this.message, 'Error')
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.restaurante.icono = reader.result;
    }
  }

  previewImg(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (files[0].size > 1000000) {
      this.message = "Solo imagenes menor a 1 MB";
      this.toastr.warning(this.message, 'Error')
      return;
    }
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Solo imágenes";
      this.toastr.warning(this.message, 'Error')
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.restaurante.imagen = reader.result;
    }
  }

  removeImg() {
    this.restaurante.imagen = null;
  }

  removeIcon() {
    this.restaurante.icono = null;
  }

  guardarDatos() {
    this.restaurante.estado = this.restaurante.estado ? 'ACTIVO' : 'INACTIVO'
    this.restaurante.codigo = this.restaurante.codigo ? 'SI' : 'NO'
    this.restaurante.esAfiliado = this.restaurante.esAfiliado ? 'SI' : 'NO'
    this.restaurante.arrayTipoComida = this.arrayTipoComidaSeleccionada
    if (this.restaurante.id == 0) {
      this.restauranteService.crearRestaurante(this.restaurante)
        .subscribe(
          data => {
            if (data['status'] == 204) {
              this.toastr.warning('Hubo un error: ' + data['resultado'], 'Error')
            } else {
              swal({ title: this.restaurante.nombre_comercial, text: data['resultado'], type: "success", showConfirmButton: true })
                .then((result) => {
                  if (result.value)
                    this.iraListado()
                });
            }
          },
          error => {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          }
        )
    } else {
      this.restauranteService.modificarRestaurante(this.restaurante)
        .subscribe(
          data => {
            if (data['status'] == 204) {
              this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
            } else {
              swal({ title: this.restaurante.nombre_comercial, text: data['resultado'], type: "success", showConfirmButton: true })
                .then((result) => {
                  if (result.value)
                    this.iraListado()
                });
            }
          },
          error => {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          }
        )
    }
  }

  iraListado() {
    this.router.navigate(['/tables/restaurante']);
  }
}
