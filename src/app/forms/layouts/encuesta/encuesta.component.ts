import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EncuestaService } from 'app/_services/encuesta.service';
import { EmpresaService } from 'app/_services/empresa.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { AreaService } from 'app/_services/area.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  objListaPreguntas: any
  listPreguntasELiminadas: any
  listRestaurante: any
  listOpciones: any
  objEncuesta: any = {
    intIdEncuesta: '',
    strTitulo: '',
    strDescripcion: '',
    strPermiteFirma: '',
    strPermiteDatoAdicional: '',
    intIdArea: '',
    strEstado: true
  }
  arrayParametrosPreguntas: any = {
    intIdEncuesta: ""
  }
  arrayParametrosOpciones: any = {
    strEstado: ''
  }
  arrayParametrosEncuestas: any = {
    intIdEncuesta: '',
    intIdUsuario: '',
    boolAgrupar: "NO",
  }
  user: any
  objSelectEmpresa: any = null
  arrayEmpresa: any
  objParametrosEmpresa: any = {
    strEstado: "ACTIVO",
    strContador: "NO"
  }
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
    intIdSucursal: ""
  }
  constructor(private encuestaService: EncuestaService,
    private objEmpresaService: EmpresaService,
    private objSucursalService: SucursalService,
    private objAreaService: AreaService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
    this.objEncuesta.intIdEncuesta = this.route.snapshot.paramMap.get('id');
    this.objListaPreguntas = []
    this.listPreguntasELiminadas = []
  }

  ngOnInit() {
    this.getTipoOpcionRespuesta()
    if (this.objEncuesta.intIdEncuesta != "0") {
      this.getEncuesta()
      this.getPregunta()
    }
    else {
      this.getEmpresas()
    }
  }
  getEmpresas() {
    this.objParametrosEmpresa.strContador = "NO"
    this.objParametrosEmpresa.strEstado = "ACTIVO"
    if (this.user.strTipoRol == "EMPRESA") {
      this.objParametrosEmpresa.intIdUsuario = this.user.intIdUsuario
    }
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
    this.objParametrosSucursal.intIdEmpresa = this.objSelectEmpresa
    this.objSucursalService.getSucursal(this.objParametrosSucursal)
      .subscribe(
        data => {
          this.arraySucursal = data["arraySucursal"]
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getArea() {
    this.arrayParametrosArea.intIdSucursal = this.objSelectSucursal
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

  getEncuesta() {
    this.arrayParametrosEncuestas.intIdEncuesta = this.objEncuesta.intIdEncuesta
    this.arrayParametrosEncuestas.intIdUsuario = this.user.intIdUsuario
    this.encuestaService.getEncuesta(this.arrayParametrosEncuestas)
      .subscribe(
        data => {
          if (data['intStatus'] != 200) {
            swal({ title: "Encuesta no encontrada", text: data['resultado'], type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let rest: any = data['arrayEncuesta']
            this.objEncuesta.strTitulo = rest[0].strTitulo
            this.objEncuesta.strDescripcion = rest[0].strDescripcion
            this.objEncuesta.strEstado = rest[0].strEstado == 'ACTIVO' ? true : false
            this.objEncuesta.strPermiteDatoAdicional = rest[0].strPermiteDatoAdicional == 'Si' ? true : false
            this.objEncuesta.strPermiteFirma = rest[0].strPermiteFirma == 'Si' ? true : false
            this.objSelectEmpresa = rest[0].intIdEmpresa
            this.objSelectSucursal = rest[0].intIdSucursal
            this.objSelectArea = rest[0].intIdArea
            this.getEmpresas()
            this.getSucursales()
            this.getArea()
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }
  getPregunta() {
    this.arrayParametrosPreguntas.intIdEncuesta = this.objEncuesta.intIdEncuesta
    this.encuestaService.getPregunta(this.arrayParametrosPreguntas)
      .subscribe(
        data => {
          if (data['intStatus'] != 200) {
            swal({ title: "Preguntas no encontradas", text: 'Hubo un error, por favor comuníquese con el departamento de sistemas.', type: "error", showConfirmButton: true })
              .then((result) => {
                if (result.value)
                  this.iraListado()
              });
          } else {
            let preguntas: any = data['arrayPregunta']
            preguntas.forEach(element => {
              let pregunta = {
                intIdPregunta: element['intIdPregunta'],
                strPregunta: element['strPregunta'],
                intIdTipoOpcionRespuesta: element['intIdTipoOpcionRespuesta'],
                strValorDesplegable: element['strValorDesplegable'],
                intCantidadEstrellas: element['intCantidadEstrellas'],
                strEsObligatoria: element['strEsObligatoria'],
                strEstado: element['strEstado']
              }
              this.objListaPreguntas.push(pregunta)
            });
          }
        },
        error => {
          this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
        }
      )
  }

  getTipoOpcionRespuesta() {
    this.arrayParametrosOpciones.strEstado = 'ACTIVO'
    this.encuestaService.getTipoOpcionRespuesta(this.arrayParametrosOpciones)
      .subscribe(
        data => {
          this.listOpciones = data['arrayTipoOpcionRespuesta']
        },
        error => {

        }
      )
  }

  addPregunta() {
    let pregunta = {
      intIdPregunta: '0',
      strPregunta: '',
      intIdTipoOpcionRespuesta: '',
      strEsObligatoria: 'SI',
      strEstado: 'ACTIVO'
    }
    this.objListaPreguntas.push(pregunta)
  }

  removePregunta(item) {
    var index = this.objListaPreguntas.indexOf(item);
    if (index > -1) {
      if (item['intIdPregunta'] != "0") {
        item.strEstado = "INACTIVO"
        this.listPreguntasELiminadas.push(item)
      }
      this.objListaPreguntas.splice(index, 1);
    }
  }

  showOpcionesModal(item) {

  }

  guardarDatos() {
    if (this.objListaPreguntas == null || this.objListaPreguntas.length == 0) {
      swal({ title: "Datos incompletos", text: "Ingrese al menos una pregunta", type: "warning", showConfirmButton: true });
      return
    }
    if (this.objSelectArea == null) {
      swal({ title: "Datos incompletos", text: "Debe seleccionar un Area", type: "warning", showConfirmButton: true });
      return
    }
    this.objEncuesta.strEstado = this.objEncuesta.strEstado ? 'ACTIVO' : 'INACTIVO'
    this.objEncuesta.strPermiteDatoAdicional = this.objEncuesta.strPermiteDatoAdicional ? 'Si' : 'No'
    this.objEncuesta.strPermiteFirma = this.objEncuesta.strPermiteFirma ? 'Si' : 'No'
    this.objEncuesta.intIdArea = this.objSelectArea
    if (this.objEncuesta.intIdEncuesta == 0) {
      this.encuestaService.createEncuesta(this.objEncuesta)
        .subscribe(
          data => {
            if (data["intStatus"] != 200) {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            } else {
              let intIdEncuesta = data["intIdEncuesta"]
              let arrayOfData = [];
              this.objListaPreguntas.forEach(element => {
                console.log(element)
                if (element['intIdPregunta'] == "0") {
                  arrayOfData.push(this.encuestaService.createPregunta(element, intIdEncuesta, this.user.intIdUsuario))
                } else {
                  arrayOfData.push(this.encuestaService.editPregunta(element, intIdEncuesta, this.user.intIdUsuario))
                }
              });
              if (this.listPreguntasELiminadas.length > 0) {
                this.listPreguntasELiminadas.forEach(element => {
                  arrayOfData.push(this.encuestaService.editPregunta(element, intIdEncuesta, this.user.intIdUsuario))
                });
              }
              forkJoin(arrayOfData).subscribe(response => {
                swal({ title: this.objEncuesta.strTitulo, text: data['resultado'], type: "success", showConfirmButton: true })
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
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
          }
        )
    } else {
      this.objEncuesta.intIdUsuario = this.user.intIdUsuario
      this.encuestaService.editEncuesta(this.objEncuesta)
        .subscribe(
          data => {
            if (data['intStatus'] != 200) {
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            } else {
              let arrayOfData = [];
              this.objListaPreguntas.forEach(element => {
                console.log(element)
                if (element['intIdPregunta'] == "0") {
                  arrayOfData.push(this.encuestaService.createPregunta(element, this.objEncuesta.intIdEncuesta, this.user.intIdUsuario))
                } else {
                  arrayOfData.push(this.encuestaService.editPregunta(element, this.objEncuesta.intIdEncuesta, this.user.intIdUsuario))
                }
              });
              if (this.listPreguntasELiminadas.length > 0) {
                this.listPreguntasELiminadas.forEach(element => {
                  arrayOfData.push(this.encuestaService.editPregunta(element, this.objEncuesta.intIdEncuesta, this.user.intIdUsuario))
                });
              }
              forkJoin(arrayOfData).subscribe(response => {
                swal({ title: this.objEncuesta.strTitulo, text: data['resultado'], type: "success", showConfirmButton: true })
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
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
          }
        )
    }
  }

  /*  guardarDatos() {
      if (this.objListaPreguntas == null || this.objListaPreguntas.length == 0) {
        swal({ title: "Datos incompletos", text: "Ingrese al menos una pregunta", type: "warning", showConfirmButton: true });
        return
      }
      this.encuesta.estado = this.encuesta.estado ? 'ACTIVO' : 'INACTIVO'
      if (this.encuesta.id == 0) {
        this.encuestaService.createEncuesta(this.encuesta, this.user.intIdUsuario)
          .subscribe(
            data => {
              if (data['status'] == 404) {
                this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
              } else {
                let idencuesta = data['resultado']['id']
                let arrayOfData = [];
                this.objListaPreguntas.forEach(element => {
                  arrayOfData.push(this.encuestaService.createPregunta(element, idencuesta, this.user.intIdUsuario))
                });
                forkJoin(arrayOfData).subscribe(response => {
                  swal({ title: this.encuesta.titulo, text: data['resultado']['mensaje'], type: "success", showConfirmButton: true })
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
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            }
          )
      } else {
        this.encuestaService.editEncuesta(this.encuesta, this.user.intIdUsuario)
          .subscribe(
            data => {
              if (data['intStatus'] != 200) {
                this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
              } else {
                let arrayOfData = [];
                this.objListaPreguntas.forEach(element => {
                  if (element['idpregunta'] == "0") {
                    arrayOfData.push(this.encuestaService.createPregunta(element, this.encuesta.id, this.user.intIdUsuario))
                  } else {
                    arrayOfData.push(this.encuestaService.editPregunta(element, this.encuesta.id, this.user.intIdUsuario))
                  }
                });
                if (this.listPreguntasELiminadas.length > 0) {
                  this.listPreguntasELiminadas.forEach(element => {
                    arrayOfData.push(this.encuestaService.editPregunta(element, this.encuesta.id, this.user.intIdUsuario))
                  });
                }
                forkJoin(arrayOfData).subscribe(response => {
                  swal({ title: this.encuesta.titulo, text: data['resultado'], type: "success", showConfirmButton: true })
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
              this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas', 'Error')
            }
          )
      }
    }*/

  iraListado() {
    this.router.navigate(['/tables/encuesta']);
  }
}
