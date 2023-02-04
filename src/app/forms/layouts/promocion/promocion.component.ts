import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { RestauranteService } from 'app/_services/restaurante.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { PromocionService } from 'app/_services/promocion.service';
import { CuponService } from 'app/_services/cupon.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'app/_services/excel.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-basic',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.scss']
})
export class PromocionComponent implements OnInit {
  arrayCodigo: any
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  image: any;
  isActivoComboClear = true;
  strListadoCodigo: any
  listRol: any
  objEstadoCodigo: any
  strNombreExcel: any
  strNombrePromocion: any
  strEstadoFiltro: any
  promocion: any = {
    idrestaurante: '',
    idsucursal: '',
    desripcion: '',
    identificacion: '',
    puntos: '',
    aceptaglobal: true,
    estado: true,
    codigo: false,
    excel: '',
    imagen: '',
    tenedor: false,
    eliminar: '.N',
    idTipoPromocion: 1,
    idCupon: '',
    cantDiasVigencia:0
  }
  objModalCodigo: NgbModalRef
  listRestaurante: any
  user: any
  isVisible: any
  isVisibleCodigo: any
  arrayTipoPromocion: any
  arrayCupon: any
  constructor(private promocionService: PromocionService,
    private excelService: ExcelService,
    private restauranteService: RestauranteService,
    private sucursalService: SucursalService,
    private objCuponService: CuponService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
    this.objEstadoCodigo = ["ACTIVO", "ELIMINADO", "CANJEADO"]
    this.strEstadoFiltro = "ACTIVO"
    this.arrayCodigo = []
    this.user = JSON.parse(localStorage.getItem('usuario'))
    this.promocion.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.user.DESCRIPCION_TIPO_ROL == 'ADMINISTRADOR') {
      this.getRestaurantes()
      this.isActivoComboClear = true
    } else {
      this.getRestaurantesPorUsuario(this.user.ID_USUARIO)
      this.isActivoComboClear = false
    }
    if (this.promocion.id != "0") {
      this.obtenerPromocion()
    }
    this.getTipoPromocion()
    this.getCuponPorTipo()
  }

  handleChange(evt) {
    var target = evt.target;
    if (target.checked) {
      this.isVisible = true;
      this.promocion.puntos = 0;
    } else {
      this.isVisible = false;
      this.promocion.puntos = this.promocion.puntos;
    }
  }

  handleChange2(evt) {
    var target = evt.target;
    if (target.checked) {
      this.isVisible = false;
      this.promocion.puntos = this.promocion.puntos;
    } else {
      this.isVisible = true;
      this.promocion.puntos = 0;
    }
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
  excelURL: any;
  public message: string;
  showModalBox: boolean = false;
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Solo imágenes";
      this.toastr.warning(this.message, 'Error')
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.promocion.imagen = reader.result;
      //this.imgURL = reader.result; 
    }
  }

  remove() {
    this.promocion.imagen = null
    //this.imgURL = null
  }
  /**
   * Documentación para la función 'previewExcel'
   * Método encargado de validar si el archivo es .csv según los parámetros recibidos.
   * 
   * @author Kevin Baque
   * @version 1.0 17-08-2020
   */
  previewExcel(files) {
    if (files.length === 0)
      return;
    var strNombreFile = files[0].name;
    var mimeType = files[0].type;
    console.log(mimeType);
    if (mimeType.match(/excel\/*/) == null && mimeType.match(/csv\/*/) == null) {
      this.message = "Solo archivos .csv";
      this.toastr.warning(this.message, 'Error')
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.promocion.excel = reader.result;
    }
    document.getElementById('objLabelExcel').innerHTML = strNombreFile;
  }
  /**
   * Documentación para la función 'removeExcel'
   * Método encargado de borrar el archivo .csv.
   * 
   * @author Kevin Baque
   * @version 1.0 17-08-2020
   */
  removeExcel() {
    this.excelURL = null
    this.promocion.excel = null
  }

  /**
   * Documentación para la función 'getCodigoPromocion'
   * Método encargado de obtener los códigos según los parámetros recibidos.
   * 
   * @author Kevin Baque
   * @version 1.0 17-08-2020
   */
  getCodigoPromocion(objModalCodigo) {
    if (this.promocion.id != 0) {
      this.strListadoCodigo = null
      this.promocionService.getCodigoPromocion(this.promocion, this.user.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 404) {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            }
            else {
              let arrayResultado = data['resultado']['resultados']
              this.strListadoCodigo = arrayResultado.map(item => {
                let objData =
                {
                  ID_CODIGO_PROMOCION: item.ID_CODIGO_PROMOCION,
                  CODIGO: item.CODIGO,
                  ESTADO: item.ESTADO,
                  BANDERA_ESTADO: item.BANDERA_ESTADO == 'SI' ? true : false,
                  BANDERA_CANJEADO: item.BANDERA_CANJEADO == 'SI' ? true : false,
                  FE_CREACION: item.FE_CREACION != null ? item.FE_CREACION : '',
                  CLIENTE: item.CLIENTE != null ? item.CLIENTE : ''
                }
                return objData
              })
              this.arrayCodigo = data['resultado']['resultados']
              this.objModalCodigo = this.modalService.open(objModalCodigo, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
            }
          },
          error => {
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
          }
        )
    }
  }

  /**
   * Documentación para la función 'editCodigoPromocion'
   * Método encargado de editar los códigos según los parámetros recibidos.
   * 
   * @author Kevin Baque
   * @version 1.0 17-08-2020
   */
  editCodigoPromocion(intIdCodigoPromocion: string, strAccion: string) {
    if (this.promocion.id != 0) {
      this.promocionService.editCodigoPromocion(intIdCodigoPromocion, strAccion, this.promocion, this.user.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 404) {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            }
            else if (data['status'] == 409) {
              this.toastr.warning(data['resultado'], 'Error')
            }
            else {
              this.objModalCodigo.close()
              swal({ title: this.promocion.descripcion, text: data['resultado'], type: "success", showConfirmButton: true });
            }
          },
          error => {
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
          }
        )
    }
  }
  eliminarDatos() {
    this.promocion.estado = this.promocion.estado ? 'ACTIVO' : 'INACTIVO'
    this.promocion.aceptaglobal = this.promocion.aceptaglobal ? 'SI' : 'NO'
    this.promocion.tenedor = this.promocion.tenedor ? 'SI' : 'NO'
    this.promocion.codigo = this.promocion.codigo ? 'SI' : 'NO'
    swal({
      title: '¿Está seguro de eliminar la promoción?',
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
        this.promocion.eliminar = 'S'
        this.promocionService.edit(this.promocion, this.user.ID_USUARIO)
          .subscribe(
            data => {
              if (data['status'] == 404) {
                this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
              }
              else if (data['status'] == 409) {
                this.toastr.warning(data['resultado'], 'Error')
              }
              else {
                swal(
                  '¡Eliminado!',
                  'Promoción eliminada de forma permanente',
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
          'Promoción no a sido eliminada',
          'error'
        )
      }
    });

  }



  /**
   * Documentación para la función 'guardarDatos'
   * Método encargado de guardar la promoción según los parámetros recibidos.
   * 
   * @author Kevin Baque
   * @version 1.0 17-08-2020 - Se agrega bandera de código.
   * @ince 1.0
   */
  guardarDatos() {
    this.promocion.estado = this.promocion.estado ? 'ACTIVO' : 'INACTIVO'
    this.promocion.aceptaglobal = this.promocion.aceptaglobal ? 'SI' : 'NO'
    this.promocion.tenedor = this.promocion.tenedor ? 'SI' : 'NO'
    this.promocion.codigo = this.promocion.codigo ? 'SI' : 'NO'
    if (this.promocion.idTipoPromocion == "" || this.promocion.idTipoPromocion == undefined) {
      this.toastr.warning('El campo Tipo es obligatorio.', 'Error')
      return
    }

    if (this.promocion.id == 0) {
      this.promocionService.create(this.promocion, this.user.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 404) {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            }
            else if (data['status'] == 409) {
              this.toastr.warning(data['resultado'], 'Error')
            }
            else {
              swal({ title: this.promocion.descripcion, text: data['resultado'], type: "success", showConfirmButton: true })
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
      this.promocionService.edit(this.promocion, this.user.ID_USUARIO)
        .subscribe(
          data => {
            if (data['status'] == 404) {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            }
            else if (data['status'] == 409) {
              this.toastr.warning(data['resultado'], 'Error')
            }
            else {
              swal({ title: this.promocion.descripcion, text: data['resultado'], type: "success", showConfirmButton: true })
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
  /**
   * Documentación para la función 'obtenerPromocion'
   * Método encargado de obtener la promoción según los parámetros recibidos.
   * 
   * @author Kevin Baque
   * @version 1.0 17-08-2020 - Se agrega el retorno de bandera de código, excel.
   * @ince 1.0
   */
  obtenerPromocion() {
    this.promocionService.getById(this.promocion.id)
      .subscribe(
        data => {
          if (data['status'] == 404) {
            swal({ title: "Promocion no encontrada", text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let rest: any = data['resultado']['resultados'][0]
            this.promocion.idrestaurante = rest.ID_RESTAURANTE
            this.promocion.idsucursal = rest.ID_SUCURSAL
            this.promocion.descripcion = rest.DESCRIPCION_TIPO_PROMOCION
            this.promocion.puntos = rest.CANTIDAD_PUNTOS
            this.isVisible = rest.PREMIO == 'SI' ? true : false
            this.promocion.estado = rest.ESTADO == 'ACTIVO' ? true : false
            this.promocion.codigo = rest.CODIGO == 'SI' ? true : false
            this.promocion.aceptaglobal = rest.ACEPTA_GLOBAL == 'SI' ? true : false
            this.promocion.imagen = rest.IMAGEN
            this.promocion.excel = rest.EXCEL
            this.promocion.tenedor = rest.PREMIO == 'SI' ? true : false
            this.isVisibleCodigo = rest.CODIGO == 'SI' ? true : false
            this.promocion.idTipoPromocion = rest.ID_TIPO_PROMOCION
            this.promocion.idCupon = rest.ID_CUPON
            this.promocion.cantDiasVigencia = rest.CANT_DIAS_VIGENCIA
            //this.getValidaCodigo()
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
            this.promocion.idrestaurante = this.listRestaurante[0].ID_RESTAURANTE
        },
        error => {

        }
      )
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

  removeImg() {
    this.imgURL = null
    this.promocion.imagen = null
  }

  iraListado() {
    this.router.navigate(['/tables/promocion']);
  }
  /**
   * Documentación para la función 'getValidaCodigo'
   * Método encargado de mostrar/ocultar la fila donde se ingresa los códigos en la promoción.
   * 
   * @author Kevin Baque
   * @version 1.0 17-08-2020
   */
  getValidaCodigo() {
    if (this.listRestaurante != undefined && this.listRestaurante.length > 0) {
      this.listRestaurante.forEach(arrayItem => {
        if (this.promocion.idrestaurante == arrayItem.ID_RESTAURANTE) {
          this.isVisibleCodigo = arrayItem.CODIGO
        }
      });
      if (!this.isVisibleCodigo) {
        this.promocion.codigo = false
        this.promocion.excel = ''
      }
    }
  }
  /**
   * Documentación para la función 'exportAsXLSX'
   * Método encargado de exportar a excel los códigos en la promoción.
   * 
   * @author Kevin Baque
   * @version 1.0 17-08-2020
   */
  exportAsXLSX() {
    let objCodigoPromocion = this.arrayCodigo.map(item => {
      let obj = {
        CODIGO: item.CODIGO,
        ESTADO: item.ESTADO,
        CLIENTE: item.CLIENTE,
        FE_CANJEADO: item.FE_CREACION
      }
      return obj
    })
    this.strNombrePromocion = this.promocion.descripcion.replace(/ /g, "_")
    this.strNombreExcel = 'codigos_promocion_' + this.strNombrePromocion
    this.excelService.exportAsExcelFile(objCodigoPromocion, this.strNombreExcel);
  }

  getTipoPromocion() {
    this.promocionService.getTipoPromocion(this.user.ID_USUARIO)
      .subscribe(
        data => {
          this.arrayTipoPromocion = data['resultado']['resultados']
        },
        error => {

        }
      )
  }
  getCuponPorTipo() {
    this.objCuponService.getCuponPorTipo('PREMIO_ESPECIAL', 'NO', this.user.ID_USUARIO)
      .subscribe(
        data => {
          if (data['status'] == 200) {
            this.arrayCupon = data['resultado']['resultados']
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getDesactivarCupon() {
    this.promocion.idCupon = undefined
  }

}
