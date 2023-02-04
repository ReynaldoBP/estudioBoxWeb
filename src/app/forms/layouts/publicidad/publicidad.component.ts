import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicidadService } from 'app/_services/publicidad.service';
import { ParamService } from 'app/_services/param.service';
import { TipoComidaService } from 'app/_services/tipocomida.service';
import { forkJoin } from 'rxjs';
import { GeocodeService } from 'app/_services/geocode.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

export interface Person {
  id: string;
  isActive: boolean;
  age: number;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-basic',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.scss']
})
export class PublicidadComponent implements OnInit {
  location: Location;
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  image: any;

  listRol: any
  listPais: any
  listProvincia: any
  listCiudad: any
  listParroquia: any
  listTipoComida: any
  listTipoComidaSelected: any

  publicidad: any = {
    descripcion: '',
    genero: '',
    edadminima: '',
    edadmaxima: '',
    idpais: '',
    idprovincia: '',
    idciudad: '',
    idparroquia: '',
    estado: true,
    imagen: '',
    orientacion: 'HORIZONTAL',
    eliminar: 'N',
  }

  user: any
  chkTODOStipocomida: boolean
  geocoder: any
  geolocation: any

  constructor(private publicidadService: PublicidadService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private paramService: ParamService,
    private tipocomidaservice: TipoComidaService,
    private geocodeService: GeocodeService) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
    this.publicidad.id = this.route.snapshot.paramMap.get('id');
    this.listTipoComidaSelected = []
    this.chkTODOStipocomida = false
  }

  seleccTodoTipoComida() {
    if (this.chkTODOStipocomida) {
      this.listTipoComidaSelected = this.listTipoComida.map(item => item.ID_TIPO_COMIDA)
    } else {
      this.listTipoComidaSelected = []
    }
  }

  verificaTodosTipoComida() {
    if (this.listTipoComidaSelected.length != this.listTipoComida.length) {
      this.chkTODOStipocomida = false
    } else {
      this.chkTODOStipocomida = true
    }
  }

  ngOnInit() {
    this.getPais()
    this.getTiposComida()
    if (this.publicidad.id != "0") {
      this.obtenerPublicidad()
    }
  }

  obtenerPublicidad() {
    this.publicidadService.getById(this.publicidad.id)
      .subscribe(
        data => {
          if (data['status'] == 204) {
            swal({ title: "Publicidad no encontrada", text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let rest: any = data['resultado']['resultados'][0]
            this.publicidad.descripcion = rest.DESCRIPCION
            this.publicidad.genero = rest.GENERO
            this.publicidad.edadminima = rest.EDAD_MINIMA
            this.publicidad.edadmaxima = rest.EDAD_MAXIMA
            this.publicidad.idpais = rest.PAIS
            this.publicidad.idprovincia = rest.PROVINCIA
            this.publicidad.idciudad = rest.CIUDAD
            this.publicidad.idparroquia = rest.PARROQUIA
            this.publicidad.estado = rest.ESTADO == 'ACTIVO' ? true : false
            this.publicidad.imagen = rest.IMAGEN
            this.publicidad.orientacion = rest.ORIENTACION
            this.getProvincia(this.publicidad.idpais)
            this.getCiudad(this.publicidad.idprovincia)
            this.getParroquia(this.publicidad.idciudad)
            this.getTiposComidaByPublicidad()
          }
        },
        error => {
          this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
        }
      )
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
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
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
      //this.imgURL = reader.result; 
      this.publicidad.imagen = reader.result;
    }
  }

  remove() {
    //this.imgURL = null
    this.publicidad.imagen = null
  }
  eliminarDatos() {
    this.publicidad.estado = this.publicidad.estado ? 'ACTIVO' : 'INACTIVO'
    swal({
      title: '¿Está seguro de eliminar la publicidad?',
      text: "¡No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success btn-raised mr-5',
      cancelButtonClass: 'btn btn-danger btn-raised',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.publicidadService.deletePublicidadComida(this.publicidad.id)
          .subscribe(
            data2 => {
              if (data2['status'] == 204) {
                this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
              } else {
                this.publicidad.eliminar = 'S'
                this.publicidadService.edit(this.publicidad, this.user.ID_USUARIO)
                  .subscribe(
                    data => {
                      if (data['status'] == 204) {
                        this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
                      } else {
                        swal(
                          '¡Eliminado!',
                          'Publicidad eliminada de forma permanente',
                          'success'
                        )
                        this.iraListado()
                      }
                    },
                    error => {
                      this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
                    }
                  )
              }
            },
            error => {
              this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
            }
          )
      }
      else {
        swal(
          'Cancelado',
          'Publicidad no a sido eliminada',
          'error'
        )
      }
    });


  }
  guardarDatos() {
    this.publicidad.estado = this.publicidad.estado ? 'ACTIVO' : 'INACTIVO'
    if (this.publicidad.id == 0) {
      if (this.publicidad.imagen == null || this.publicidad.imagen == "") {
        this.toastr.warning('La Imágen, es un campo obligatorio', 'Error')
      }
      else {
        this.publicidadService.create(this.publicidad, this.user.ID_USUARIO)
          .subscribe(
            data => {
              if (data['status'] == 204) {
                this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
              } else {
                let arrayOfData = [];
                this.listTipoComidaSelected.forEach(element => {
                  arrayOfData.push(this.publicidadService.createPublicidadComida(data['resultado']['id'], element, this.user.ID_USUARIO))
                });
                forkJoin(arrayOfData).subscribe(response => {
                  swal({ title: data['resultado']['descripcion'], text: 'Publicidad creada con éxito!', type: "success", showConfirmButton: true })
                    .then((result) => {
                      if (result.value)
                        this.iraListado()
                    });
                }, error => {
                  console.error(error);
                });
              }
            },
            error => {
              this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
            }
          )
      }
    } else {
      this.publicidadService.edit(this.publicidad, this.user.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 204) {
              this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
            } else {
              this.publicidadService.deletePublicidadComida(this.publicidad.id)
                .subscribe(
                  data2 => {
                    if (data2['status'] == 204) {
                      this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
                    } else {
                      let arrayOfData = [];
                      this.listTipoComidaSelected.forEach(element => {
                        arrayOfData.push(this.publicidadService.createPublicidadComida(this.publicidad.id, element, this.user.ID_USUARIO))
                      });
                      forkJoin(arrayOfData).subscribe(response => {
                        swal({ title: this.publicidad.descripcion, text: data['resultado'], type: "success", showConfirmButton: true })
                          .then((result) => {
                            if (result.value)
                              this.iraListado()
                          });
                      }, error => {
                        console.error(error);
                      });

                    }
                  },
                  error => {
                    this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
                  }
                )
            }
          },
          error => {
            this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
          }
        )
    }
  }

  iraListado() {
    this.router.navigate(['/tables/publicidad']);
  }

  getPais() {
    this.paramService.getPais().subscribe(
      data => {
        if (data != null) {
          this.listPais = data['resultado']['pais'];
          if (this.publicidad.id == "0") {
            this.getLocation()
          }
        }
      },
      error => {
        this.toastr.warning("Error en el servidor, comuniquise con Sistemas")
      });
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.findLocation(position.coords.latitude, position.coords.longitude)
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  findLocation(lat, lng) {
    this.geocodeService.geocodeAddress(lat, lng)
      .subscribe((geolocation) => {
        console.log(geolocation)
        this.geolocation = geolocation
        if (this.geolocation.pais != null) {
          let pais = this.listPais.find(item => item['PAIS_NOMBRE'].toUpperCase() == this.geolocation.pais.toUpperCase())
          if (pais != null) {
            this.publicidad.idpais = pais.ID_PAIS
            this.getProvincia(this.publicidad.ID_PAIS)
          }
        }
      }
      );
  }
  getProvincia(value: any) {
    if (this.publicidad.id == "0") {
      this.publicidad.idprovincia = ''
      this.publicidad.idciudad = ''
    }

    this.paramService.getProvincia(value).subscribe(
      data => {
        if (data != null) {
          this.listProvincia = data['resultado']['provincia'];
          if (this.geolocation != null && this.geolocation.provincia != null) {
            let provincia = this.listProvincia.find(item => item['PROVINCIA_NOMBRE'].toUpperCase() == this.geolocation.provincia.toUpperCase())
            if (provincia != null) {
              this.publicidad.idprovincia = provincia.ID_PROVINCIA
              this.getCiudad(this.publicidad.idprovincia)
            }
          }
        }
      },
      error => {
        this.toastr.warning("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getCiudad(value: any) {
    if (this.publicidad.id == "0") {
      this.publicidad.idciudad = ''
    }

    this.paramService.getCiudad(value).subscribe(
      data => {
        if (data != null) {
          this.listCiudad = data['resultado']['ciudad'];
          if (this.geolocation != null && this.geolocation.ciudad != null) {
            let ciudad = this.listCiudad.find(item => item['CIUDAD_NOMBRE'].toUpperCase() == this.geolocation.ciudad.toUpperCase())
            if (ciudad != null) {
              this.publicidad.idciudad = ciudad.ID_CIUDAD
              this.getParroquia(this.publicidad.idciudad)
            }
          }
        }
      },
      error => {
        this.toastr.warning("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getParroquia(value: any) {
    if (this.publicidad.id == "0") {
      this.publicidad.idparroquia = ''
    }

    this.paramService.getParroquia(value).subscribe(
      data => {
        if (data != null) {
          this.listParroquia = data['resultado']['Parroquia'];
          if (this.geolocation != null && this.geolocation.parroquia != null) {
            let parroquia = this.listParroquia.find(item => item['PARROQUIA_NOMBRE'].toUpperCase() == this.geolocation.parroquia.toUpperCase())
            if (parroquia != null) {
              this.publicidad.idparroquia = parroquia.ID_PARROQUIA
            }
          }
          this.geolocation = null
        }
      },
      error => {
        this.toastr.warning("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getTiposComida() {
    this.tipocomidaservice.getTiposComida(1)
      .subscribe(
        data => {
          this.listTipoComida = data['resultado']['tipoComida']
        },
        error => {

        }
      )
  }

  getTiposComidaByPublicidad() {
    this.publicidadService.getTiposComidaByPublicidad(this.publicidad.id)
      .subscribe(
        data => {
          let listado = data['resultado']['resultados']
          this.listTipoComidaSelected = listado.map(item => item.ID_TIPO_COMIDA)
          this.verificaTodosTipoComida()
        },
        error => {

        }
      )
  }

}
