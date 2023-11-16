import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicidadService } from 'app/_services/publicidad.service';
import { ParamService } from 'app/_services/param.service';
import { EmpresaService } from 'app/_services/empresa.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { AreaService } from 'app/_services/area.service';
import { EncuestaService } from 'app/_services/encuesta.service';
import { forkJoin } from 'rxjs';
import { GeocodeService } from 'app/_services/geocode.service';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';


@Component({
  selector: 'app-basic',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.scss']
})
export class PublicidadComponent implements OnInit {
  location: Location;
  selectedFileName: string = 'Ningún archivo seleccionado';
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  image: any;
  selectedFileNames: string[] = [];
  listRol: any
  listEmpresa: any
  listSucursal: any
  listArea: any
  listEncuesta: any
  objSelectEmpresa: any = null
  objSelectSucursal: any = null
  objSelectArea: any = null
  objSelectEncuesta: any = null
  arrayParametrosSucursal: any = {
    strEstado: "ACTIVO",
    intIdEmpresa: ""
  }
  arrayParametrosArea: any = {
    strEstado: "ACTIVO",
    intIdSucursal: ""
  }
  arrayParametrosEncuesta: any = {
    strEstado: "ACTIVO",
    intIdArea: ""
  }
  publicidad: any = {
    titulo: '',
    descripcion: '',
    archivo: '',
    empresa: '',
    sucursal: '',
    area: '',
    encuesta: '',
    tiempo: '',
  }


  user: any

  constructor(
    private PublicidadServicie: PublicidadService,
    private toastr: ToastrService,
    private router: Router,
    private paramService: ParamService,
    private objEmpresaService: EmpresaService,
    private objSucursalService: SucursalService,
    private objAreaService: AreaService,
    private objEncuestaService: EncuestaService,
  ) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
  }

  ngOnInit() {
    this.getEmpresas()
  }

  guardarDatos() {
    if (this.selectedFileNames.length == 0) {
      this.toastr.warning('El archivo, es un campo obligatorio', 'Error')
    }
    else if (this.publicidad.titulo == null || this.publicidad.titulo == "") {
      this.toastr.warning('El Título, es un campo obligatorio', 'Error')
    }
    else if (this.objSelectEmpresa == null || this.objSelectEmpresa == "") {
      this.toastr.warning('La Empresa, es un campo obligatorio', 'Error')
    }
    else if (this.objSelectSucursal == null || this.objSelectSucursal == "") {
      this.toastr.warning('La Sucursal, es un campo obligatorio', 'Error')
    }
    else if (this.objSelectArea == null || this.objSelectArea == "") {
      this.toastr.warning('El Area, es un campo obligatorio', 'Error')
    }
    else if (this.objSelectEncuesta == null || this.objSelectEncuesta == "") {
      this.toastr.warning('La Encuesta, es un campo obligatorio', 'Error')
    }
    else if (this.publicidad.tiempo == null || this.publicidad.tiempo == "") {
      this.toastr.warning('El campo Tiempo, Favor agregar valor en segundos', 'Error')
    }
    else {
      this.publicidad.empresa = this.objSelectEmpresa
      this.publicidad.sucursal = this.objSelectSucursal
      this.publicidad.area = this.objSelectArea
      this.publicidad.encuesta = this.objSelectEncuesta

      //this.reporte.archivo  = this.selectedFileName
      this.PublicidadServicie.createPublicidad(this.publicidad, this.user.intIdUsuario)
        .subscribe(
          data => {
            if (data['status'] === 204) {
              this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error');
            } else {
              // Muestra el mensaje de éxito directamente
              swal({ title: data['resultado']['descripcion'], text: 'Publicidad creada con éxito!', type: 'success', showConfirmButton: true })
                .then((result) => {
                  if (result.value) {
                    this.iraListado();
                  }
                });
            }
          },
          error => {
            this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error')
          }
        )
    }
  }


  iraListado() {
    this.router.navigate(['/charts/publicidad']);
  }

  selectFiles() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
    fileInput.addEventListener('change', (event) => {
      /*const selectedFile = (event.target as HTMLInputElement).files[0];
      if (selectedFile) {
          this.publicidad.archivo  = selectedFile
      }*/
      const selectedFiles = (event.target as HTMLInputElement).files;
      if (selectedFiles.length > 0 && selectedFiles.length <= 3) {
        if (!this.publicidad.archivo) {
          this.publicidad.archivo = [];
        }
        if (selectedFiles) {
          for (let i = 0; i < selectedFiles.length; i++) {
            this.publicidad.archivo.push(selectedFiles[i]); // Agrega cada archivo al arreglo
          }
        }
      } else {
        // Si no se seleccionan exactamente 3 archivos, muestra un mensaje de error o realiza alguna acción adecuada.
        this.toastr.warning('Hubo un error, por favor seleccionar de 1 a 3 imagenes.', 'Error')
        // También puedes restablecer la entrada de archivos o tomar alguna otra medida según tus necesidades.
        this.selectedFileNames = [];
      }


    });
  }

  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFileName = fileInput.files[0].name;
    } else {
      this.selectedFileName = 'Ningún archivo seleccionado';
    }
  }

  onFilesSelected(event: any) {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      this.selectedFileNames = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        this.selectedFileNames.push(selectedFiles[i].name);
      }
    }
  }

  getEmpresas() {
    this.objEmpresaService.getEmpresa('NO')
      .subscribe(
        data => {
          if (data['intStatus'] != 200) {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          } else {
            this.listEmpresa = data["arrayEmpresa"]
            this.listSucursal = data[""]
          }
        },
        error => {
          this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
        }
      )
  }

  getSucursales() {
    this.objSelectSucursal = null
    if (this.objSelectEmpresa != undefined) {
      this.arrayParametrosSucursal.intIdEmpresa = this.objSelectEmpresa
      this.objSucursalService.getSucursal(this.arrayParametrosSucursal)
        .subscribe(
          data => {
            this.listSucursal = data["arraySucursal"]
          },
          error => {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          }
        )
    }
  }
  getArea() {
    this.objSelectArea = null
    if (this.objSelectSucursal != undefined) {
      this.arrayParametrosArea.intIdSucursal = this.objSelectSucursal
      this.objAreaService.getArea(this.arrayParametrosArea)
        .subscribe(
          data => {
            this.listArea = data["arrayArea"]
          },
          error => {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          }
        )
    }
  }

  getEncuesta() {
    this.objSelectEncuesta = null
    if (this.objSelectArea != undefined) {
      this.arrayParametrosEncuesta.intIdArea = this.objSelectArea
      this.objEncuestaService.getEncuesta(this.arrayParametrosEncuesta)
        .subscribe(
          data => {
            this.listEncuesta = data["arrayEncuesta"]
          },
          error => {
            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
          }
        )
    }
  }

  getFormattedFileNames(): string {
    return this.selectedFileNames.map(fileName => `${fileName}<br>`).join('');
  }
}
