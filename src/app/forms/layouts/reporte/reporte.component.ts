import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ReporteService } from 'app/_services/reporte.service';
import { ParamService } from 'app/_services/param.service';
import { EmpresaService } from 'app/_services/empresa.service';
import { SucursalService } from 'app/_services/sucursal.service';
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
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  location: Location;
  selectedFileName: string = 'Ningún archivo seleccionado';
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  image: any;

  listRol: any
  listEmpresa: any
  listSucursal: any
  objSelectEmpresa: any = null
  objSelectSucursal: any = null
  arrayParametrosSucursal: any = {
    strEstado: "ACTIVO",
    intIdEmpresa: ""
  }
  reporte: any = {
    titulo: '',
    descripcion: '',
    archivo: '',
    empresa: '',
    sucursal: '',
  }


  user: any

  constructor(
    private reporteServicie: ReporteService,
    private toastr: ToastrService,
    private router: Router,
    private paramService: ParamService,
    private objEmpresaService: EmpresaService,
    private objSucursalService: SucursalService,
    ) {
    this.user = JSON.parse(localStorage.getItem('usuario'))
  }

  ngOnInit() {
    this.getEmpresas()
  }

  guardarDatos() {
    if (this.selectedFileName == null || this.selectedFileName =='Ningún archivo seleccionado'){
        this.toastr.warning('El archivo, es un campo obligatorio', 'Error')
      }
   else  if (this.reporte.titulo == null || this.reporte.titulo == "")  {
        this.toastr.warning('El Título, es un campo obligatorio', 'Error')
      }
   else  if (this.objSelectEmpresa == null || this.objSelectEmpresa == "")  {
        this.toastr.warning('La Empresa, es un campo obligatorio', 'Error')
      }
   else if (this.objSelectSucursal == null || this.objSelectSucursal == "")  {
        this.toastr.warning('La Sucursal, es un campo obligatorio', 'Error')
      }
    else 
    {
        this.reporte.empresa  = this.objSelectEmpresa
        this.reporte.sucursal = this.objSelectSucursal
        //this.reporte.archivo  = this.selectedFileName
        this.reporteServicie.createReporte(this.reporte, this.user.ID_USUARIO)
          .subscribe(
            data => {
                if (data['status'] === 204) {
                    this.toastr.warning('Hubo un error, comuníquese con el dpto. de sistemas', 'Error');
                  } else {
                    // Muestra el mensaje de éxito directamente
                    swal({ title: data['resultado']['descripcion'], text: 'Reporte creado con éxito!', type: 'success', showConfirmButton: true })
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
    this.router.navigate(['/charts/reportes']);
  }

  selectFile() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
    fileInput.addEventListener('change', (event) => {
        const selectedFile = (event.target as HTMLInputElement).files[0];
    
        if (selectedFile) {
            this.reporte.archivo  = selectedFile
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
}
