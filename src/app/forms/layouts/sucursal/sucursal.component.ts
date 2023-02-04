import { Component, OnInit } from '@angular/core';
import { ParamService } from 'app/_services/param.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SucursalService } from 'app/_services/sucursal.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { RestauranteService } from 'app/_services/restaurante.service';
import { CentroComercialService } from 'app/_services/centroComercial.service';
import { GeocodeService } from 'app/_services/geocode.service';
import { ClienteService } from 'app/_services/cliente.service';
import { stringify } from '@angular/core/src/util';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-basic',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
})
export class SucursalComponent implements OnInit {

  location: Location;

  listRestaurante: any
  listPais: any
  listProvincia: any
  listCiudad: any
  listParroquia: any
  usuario: any
  sucursal: any = {
    id_restaurante: null,
    id_centro_comercial: null,
    id_cliente: null,
    nombre: '',
    numero_contacto: '',
    esmatriz: false,
    estado_fact: true,
    direccion: '',
    id_pais: '',
    id_provincia: '',
    id_ciudad: '',
    id_parroquia: '',
    lat: 0,
    lng: 0,
    estado: true,
    escentrocomercial: false,
    horarioAtencionLunesIni: "00:00",
    horarioAtencionLunesFin: "23:59",
    horarioAtencionMartesIni: "00:00",
    horarioAtencionMartesFin: "23:59",
    horarioAtencionMiercolesIni: "00:00",
    horarioAtencionMiercolesFin: "23:59",
    horarioAtencionJuevesIni: "00:00",
    horarioAtencionJuevesFin: "23:59",
    horarioAtencionViernesIni: "00:00",
    horarioAtencionViernesFin: "23:59",
    horarioAtencionSabadoIni: "00:00",
    horarioAtencionSabadoFin: "23:59",
    horarioAtencionDomingoIni: "00:00",
    horarioAtencionDomingoFin: "23:59",
    eliminar: 'N',
  }
  restauranteSelecc: any

  geocoder: any
  geolocation: any
  objCentroComercial: any =
    {
      intIdCC: null,
      strNombre: '',
      strDireccion: '',
      strEstado: true,
      strUsuarioCreacion: ''
    }
  arrayCentroComercial: any
  arrayCliente: any
  constructor(private paramService: ParamService,
    private router: Router,
    private route: ActivatedRoute,
    private sucursalService: SucursalService,
    private restauranteService: RestauranteService,
    private objCC: CentroComercialService,
    private objClienteService: ClienteService,
    private toastr: ToastrService,
    private geocodeService: GeocodeService,) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.sucursal.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getPais()
    if (this.usuario.DESCRIPCION_TIPO_ROL == 'ADMINISTRADOR') {
      this.getRestaurantes()
      this.getListadoCentroComercial()
      this.getListadoCliente()
    } else {
      this.getRestaurantesPorUsuario(this.usuario.ID_USUARIO)
    }
    this.sucursal.usuario = this.usuario.ID_USUARIO
    if (this.sucursal.id != "0") {
      this.obtenerSucursal()
    }
  }

  getListadoCliente() {
    this.objClienteService.getClientesAdmin()
      .subscribe(
        data => {
          this.arrayCliente = data['resultado']['resultados'].filter(arrayItem => arrayItem.TIPO_CLIENTE == "PROMOTOR")
        },
        error => {
        }
      )
  }


  obtenerSucursal() {
    this.sucursalService.getSucursalById(this.sucursal.id)
      .subscribe(
        data => {
          if (data['status'] == 404) {
            swal({ title: "Sucursal no encontrada", text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let rest: any = data['resultado']['resultados'][0]
            this.sucursal.id_restaurante = rest.RESTAURANTE_ID
            this.sucursal.nombre = rest.DESCRIPCION
            this.sucursal.numero_contacto = rest.NUMERO_CONTACTO
            this.sucursal.direccion = rest.DIRECCION
            this.sucursal.lat = Number.parseFloat(rest.LATITUD)
            this.sucursal.lng = Number.parseFloat(rest.LONGITUD)
            this.sucursal.esmatriz = rest.ES_MATRIZ == 'ACTIVO' ? true : false
            this.sucursal.estado_fact = rest.ESTADO_FACTURACION == 'ACTIVO' ? true : false
            this.sucursal.id_pais = rest.PAIS
            this.sucursal.id_provincia = rest.PROVINCIA
            this.sucursal.id_ciudad = rest.CIUDAD
            this.sucursal.id_parroquia = rest.PARROQUIA
            this.sucursal.escentrocomercial = rest.EN_CENTRO_COMERCIAL == 'SI' ? true : false
            this.sucursal.id_centro_comercial = rest.CENTRO_COMERCIAL_ID
            this.sucursal.id_cliente = rest.CLIENTE_ID
            this.sucursal.horarioAtencionLunesIni = rest.HORA_LUNES_INI != "00:00" ? rest.HORA_LUNES_INI : "00:00"
            this.sucursal.horarioAtencionLunesFin = rest.HORA_LUNES_FIN != "00:00" ? rest.HORA_LUNES_FIN : "23:59"
            this.sucursal.horarioAtencionMartesIni = rest.HORA_MARTES_INI != "00:00" ? rest.HORA_MARTES_INI : "00:00"
            this.sucursal.horarioAtencionMartesFin = rest.HORA_MARTES_FIN != "00:00" ? rest.HORA_MARTES_FIN : "23:59"
            this.sucursal.horarioAtencionMiercolesIni = rest.HORA_MIERCOLES_INI != "00:00" ? rest.HORA_MIERCOLES_INI : "00:00"
            this.sucursal.horarioAtencionMiercolesFin = rest.HORA_MIERCOLES_FIN != "00:00" ? rest.HORA_MIERCOLES_FIN : "23:59"
            this.sucursal.horarioAtencionJuevesIni = rest.HORA_JUEVES_INI != "00:00" ? rest.HORA_JUEVES_INI : "00:00"
            this.sucursal.horarioAtencionJuevesFin = rest.HORA_JUEVES_FIN != "00:00" ? rest.HORA_JUEVES_FIN : "23:59"
            this.sucursal.horarioAtencionViernesIni = rest.HORA_VIERNES_INI != "00:00" ? rest.HORA_VIERNES_INI : "00:00"
            this.sucursal.horarioAtencionViernesFin = rest.HORA_VIERNES_FIN != "00:00" ? rest.HORA_VIERNES_FIN : "23:59"
            this.sucursal.horarioAtencionSabadoIni = rest.HORA_SABADO_INI != "00:00" ? rest.HORA_SABADO_INI : "00:00"
            this.sucursal.horarioAtencionSabadoFin = rest.HORA_SABADO_FIN != "00:00" ? rest.HORA_SABADO_FIN : "23:59"
            this.sucursal.horarioAtencionDomingoIni = rest.HORA_DOMINGO_INI != "00:00" ? rest.HORA_DOMINGO_INI : "00:00"
            this.sucursal.horarioAtencionDomingoFin = rest.HORA_DOMINGO_FIN != "00:00" ? rest.HORA_DOMINGO_FIN : "23:59"
            this.getProvincia(this.sucursal.id_pais)
          }
        },
        error => {
          this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
        }
      )
  }

  getRestaurantesPorUsuario(idusuario: string) {
    this.restauranteService.getRestaurantesByUsuario(idusuario)
      .subscribe(
        data => {
          this.listRestaurante = data['resultado']['resultados']
          if (this.listRestaurante != null && this.listRestaurante.length > 0)
            this.sucursal.id_restaurante = this.listRestaurante[0].ID_RESTAURANTE
        },
        error => {

        }
      )
  }

  getListadoCentroComercial() {
    this.objCentroComercial.strUsuarioCreacion = this.usuario.ID_USUARIO;
    this.objCC.get(this.objCentroComercial)
      .subscribe(
        data => {
          if (this.sucursal.id == 0) {
            this.arrayCentroComercial = data['resultado']['resultados'].filter(arrayItem => arrayItem.strEstado == "ACTIVO")
          }
          else {
            this.arrayCentroComercial = data['resultado']['resultados']
          }
        },
        error => {
        }
      )
  }

  getRestaurantes() {
    this.restauranteService.getRestaurantes()
      .subscribe(
        data => {
          this.listRestaurante = data['resultado']['resultados']
        },
        error => {

        }
      )
  }

  getPais() {
    this.paramService.getPais().subscribe(
      data => {
        if (data != null) {
          this.listPais = data['resultado']['pais'];
          if (this.sucursal.id == "0") {
            this.getLocation()
          }
        }
      },
      error => {
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getProvincia(value: any) {
    if (this.sucursal.id == "0") {
      this.sucursal.id_provincia = ''
      this.sucursal.id_ciudad = ''
      this.sucursal.id_parroquia = ''
    }

    this.paramService.getProvincia(value).subscribe(
      data => {
        if (data != null) {
          this.listProvincia = data['resultado']['provincia'];
          if (this.geolocation != null && this.geolocation.provincia != null) {
            let provincia = this.listProvincia.find(item => item['PROVINCIA_NOMBRE'].toUpperCase() == this.geolocation.provincia.toUpperCase())
            if (provincia != null) {
              this.sucursal.id_provincia = provincia.ID_PROVINCIA
              this.getCiudad(this.sucursal.id_provincia)
            }
          }
        }
      },
      error => {
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getCiudad(value: any) {
    if (this.sucursal.id == "0") {
      this.sucursal.id_ciudad = ''
      this.sucursal.id_parroquia = ''
    }

    this.paramService.getCiudad(value).subscribe(
      data => {
        if (data != null) {
          this.listCiudad = data['resultado']['ciudad'];
          if (this.geolocation != null && this.geolocation.ciudad != null) {
            let ciudad = this.listCiudad.find(item => item['CIUDAD_NOMBRE'].toUpperCase() == this.geolocation.ciudad.toUpperCase())
            if (ciudad != null) {
              this.sucursal.id_ciudad = ciudad.ID_CIUDAD
              this.getParroquia(this.sucursal.id_ciudad)
            }
          }
        }
      },
      error => {
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getParroquia(value: any) {
    if (this.sucursal.id == "0") {
      this.sucursal.id_parroquia = ''
    }

    this.paramService.getParroquia(value).subscribe(
      data => {
        if (data != null) {
          this.listParroquia = data['resultado']['Parroquia'];
          if (this.geolocation != null && this.geolocation.parroquia != null) {
            let parroquia = this.listParroquia.find(item => item['PARROQUIA_NOMBRE'].toUpperCase() == this.geolocation.parroquia.toUpperCase())
            if (parroquia != null) {
              this.sucursal.id_parroquia = parroquia.ID_PARROQUIA
            }
          }
          this.geolocation = null
        }
      },
      error => {
        console.log("Error en el servidor, comuniquise con Sistemas")
      });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.sucursal.lat = position.coords.latitude;
          this.sucursal.lng = position.coords.longitude;
          this.findLocation(this.sucursal.lat, this.sucursal.lng)
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
            this.sucursal.id_pais = pais.ID_PAIS
            this.getProvincia(this.sucursal.ID_PAIS)
          }
        }
      }
      );
  }

  mapClick(coords: object) {
    this.sucursal.lat = coords['coords']['lat']
    this.sucursal.lng = coords['coords']['lng']
    this.findLocation(this.sucursal.lat, this.sucursal.lng)
  }

  iraListado() {
    this.router.navigate(['/tables/sucursal']);
  }
  eliminarDatos() {
    this.sucursal.estado = this.sucursal.estado ? 'ACTIVO' : 'INACTIVO'
    this.sucursal.estado_fact = this.sucursal.estado_fact ? 'ACTIVO' : 'INACTIVO'
    this.sucursal.escentrocomercial = this.sucursal.escentrocomercial ? 'SI' : 'NO'
    this.sucursal.esmatriz = this.sucursal.esmatriz ? 'SI' : 'NO'
    swal({
      title: '¿Está seguro de eliminar la sucursal?',
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
        this.sucursal.eliminar = 'S'
        this.sucursalService.modificarSucursal(this.sucursal)
          .subscribe(
            data => {
              if (data['status'] == 204) {
                this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
              } else {
                swal(
                  '¡Eliminado!',
                  'Sucursal eliminada de forma permanente',
                  'success'
                )
                this.iraListado()
              }
            },
            error => {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            }
          )
      }
      else {
        swal(
          'Cancelado',
          'Sucursal no a sido eliminada',
          'error'
        )
      }
    });

  }
  guardarDatos() {
    this.sucursal.estado = this.sucursal.estado ? 'ACTIVO' : 'INACTIVO'
    this.sucursal.estado_fact = this.sucursal.estado_fact ? 'ACTIVO' : 'INACTIVO'
    this.sucursal.escentrocomercial = this.sucursal.escentrocomercial ? 'SI' : 'NO'
    this.sucursal.esmatriz = this.sucursal.esmatriz ? 'SI' : 'NO'
    if (this.sucursal.id == 0) {
      this.sucursalService.crearSucursal(this.sucursal)
        .subscribe(
          data => {
            if (data['status'] == 204) {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            } else {
              swal({ title: this.sucursal.nombre, text: data['resultado'], type: "success", showConfirmButton: true })
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
      this.sucursalService.modificarSucursal(this.sucursal)
        .subscribe(
          data => {
            if (data['status'] == 204) {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            } else {
              swal({ title: this.sucursal.nombre, text: data['resultado'], type: "success", showConfirmButton: true })
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
    }
  }

  seleccRestaurante(obj: any) {
    this.restauranteSelecc = this.listRestaurante.find(element => element['ID_RESTAURANTE'] == obj)['NOMBRE_COMERCIAL']
  }

  getCentroComercial(evt) {
    var target = evt.target;
    if (target.checked) {
      this.sucursal.escentrocomercial = true;
    } else {
      this.sucursal.escentrocomercial = false;
    }
  }
  hideCentroComercial(evt) {
    var target = evt.target;
    if (target.checked) {
      this.sucursal.escentrocomercial = false;
    } else {
      this.sucursal.escentrocomercial = true;
    }
  }
}
