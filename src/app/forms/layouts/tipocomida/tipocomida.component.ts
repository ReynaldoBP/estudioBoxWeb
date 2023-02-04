import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { UsuarioService } from 'app/_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoComidaService } from 'app/_services/tipocomida.service';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-basic',
  templateUrl: './tipocomida.component.html',
  styleUrls: ['./tipocomida.component.scss']
})
export class TipoComidaComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  image: any;  

  listRol:any

  tipocomida: any = {
    descripcion: '',
    estado:true
  }

  user:any

  constructor(private tipoComidaService:TipoComidaService,
             private toastr:ToastrService,
             private router:Router,
             private route:ActivatedRoute){
      this.user = JSON.parse(localStorage.getItem('usuario'))
      this.tipocomida.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(){
    if(this.tipocomida.id != 0){
      this.tipoComidaService.getTiposComidaById(this.tipocomida.id)
      .subscribe(
        data =>{
          if(data['status'] == 404){
            swal({ title: 'Tipo de Comida no encontrado', text: data['resultado'],type: "error", showConfirmButton: true })
            .then((result) => {
              if(result.value)
                this.iraListado()
            });
          }else{
            let rest:any = data['resultado']['tipoComida'][0]
            this.tipocomida.descripcion  = rest.DESCRIPCION_TIPO_COMIDA
            this.tipocomida.estado  = rest.ESTADO=='ACTIVO'?true:false
          }        
        },
        error =>{
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
        }
      )      
    }
  }

  // Angular2 File Upload
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log(e)
    console.log(this.uploader)
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
    console.log(e)
    console.log(this.uploader)
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

  remove(){
    this.imgURL = null
  }  

  guardarDatos(){    
    this.tipocomida.estado = this.tipocomida.estado?'ACTIVO':'INACTIVO'
    if(this.tipocomida.id == 0){
      this.tipoComidaService.create(this.tipocomida,this.user.ID_USUARIO)
      .subscribe(
        data =>{
          if(data['status'] == 404){
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
          }else{
            swal({ title: this.tipocomida.descripcion, text: data['resultado'],type: "success", showConfirmButton: true })
            .then((result) => {
              if(result.value)
                this.iraListado()
            });
          }        
        },
        error =>{
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
        }
      )
    }else{
      this.tipoComidaService.edit(this.tipocomida,this.user.ID_USUARIO)
      .subscribe(
        data =>{
          if(data['status'] == 404){
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
          }else{
            swal({ title: this.tipocomida.descripcion, text: data['resultado'],type: "success", showConfirmButton: true })
            .then((result) => {
              if(result.value)
                this.iraListado()
            });
          }        
        },
        error =>{
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
        }
      )
    }    
  }

  iraListado(){
    this.router.navigate(['/tables/tipocomida']);
  }
}
