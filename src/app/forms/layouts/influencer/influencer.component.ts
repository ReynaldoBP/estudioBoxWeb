import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { RestauranteService } from 'app/_services/restaurante.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'app/_services/cliente.service';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-basic',
  templateUrl: './influencer.component.html',
  styleUrls: ['./influencer.component.scss']
})
export class InfluencerComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  image: any;  

  influencer: any = {
    id_cliente:'',
    estado:true,
    icono:''
  }

  usuario:any
  listCliente:any

  constructor(private router:Router,
              private route:ActivatedRoute,
              private clienteService:ClienteService,
              private toastr:ToastrService
              ){
    toastr.toastrConfig.timeOut = 5000
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.influencer.id = this.route.snapshot.paramMap.get('id');
    
  }

  ngOnInit(){
    this.influencer.usuario = this.usuario.ID_USUARIO
    if(this.influencer.id != 0){
      this.clienteService.getInfluencerById(this.influencer.id)
      .subscribe(
        data =>{
          if(data['status'] == 404){
            swal({ title: 'Influencer no encontrado', text: data['resultado'],type: "error", showConfirmButton: true })
            .then((result) => {
              if(result.value)
                this.iraListado()
            });
          }else{
            let rest:any = data['resultado']['resultados'][0]
            this.influencer.id_cliente  = rest.ID_CLIENTE
            this.influencer.estado  = rest.ESTADO=='ACTIVO'?true:false
            this.influencer.icono = rest.IMAGEN?rest.IMAGEN:''
          }        
        },
        error =>{
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
        }
      )      
    }
    this.getClientes()
  }

  getClientes(){
    this.clienteService.getClientesAdmin()
      .subscribe(
          data =>{    
              this.listCliente = data['resultado']['resultados']
          },
          error =>{
              
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
    if(files[0].size > 50000){
      this.message = "Solo iconos menor a 50 KB";
      this.toastr.warning(this.message,'Error')
      return;
    }
    if (mimeType.match(/image\/([\S])+.icon?/) == null) {
      this.message = "Solo archivos .ico";
      this.toastr.warning(this.message,'Error')
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      //this.iconURL = reader.result;
      this.influencer.icono = reader.result
    }
  }

  removeIcon(){
    this.influencer.icono = null
  }  

  guardarDatos(){  
    //this.influencer.icono = this.iconURL
    this.influencer.estado = this.influencer.estado?'ACTIVO':'INACTIVO'
    if(this.influencer.id == 0){
      this.clienteService.crearInfluencer(this.influencer)
      .subscribe(
        data =>{
          if(data['status'] == 404){
            this.toastr.warning('Hubo un error: ' + data['resultado'],'Error')
          }else{
            swal({ title: this.influencer.id, text: data['resultado'],type: "success", showConfirmButton: true })
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
      this.clienteService.modificaInfluencer(this.influencer)
      .subscribe(
        data =>{
          if(data['status'] == 404){
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
          }else{
            swal({ title: this.influencer.id, text: data['resultado'],type: "success", showConfirmButton: true })
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
    this.router.navigate(['/tables/influencer']);
  }
}
