import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'app/_services/restaurante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EncuestaService } from 'app/_services/encuesta.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {
  
  listPreguntas:any
  listPreguntasELiminadas:any
  listRestaurante:any
  listOpciones:any
  encuesta:any = {
    titulo:'',
    descripcion:'',
    idrestaurante:'',
    estado:true
  }
  user:any

  constructor(private restauranteService:RestauranteService,
              private encuestaService:EncuestaService,
              private toastr:ToastrService,
              private router:Router,
              private route:ActivatedRoute){
    this.user = JSON.parse(localStorage.getItem('usuario'))
    this.encuesta.id = this.route.snapshot.paramMap.get('id');
    this.listPreguntas = []
    this.listPreguntasELiminadas = []
  }

  ngOnInit(){
    //this.getRestaurantesPorUsuario()
    this.getOpciones()
    if(this.encuesta.id != "0"){
      this.obtenerEncuesta()
      this.obtenerPreguntas()
    }
  }

  obtenerEncuesta(){
    this.encuestaService.getEncuestasById(this.encuesta.id)
    .subscribe(
      data =>{
        if(data['status'] == 404){
          swal({ title: "Encuesta no encontrada", text: data['resultado'],type: "error", showConfirmButton: true })
          .then((result) => {
            if(result.value)
              this.iraListado()
          });
        }else{
          let rest:any = data['resultado']['resultados'][0]
          this.encuesta.idrestaurante  = rest.RESTAURANTE_ID  
          this.encuesta.titulo = rest.TITULO
          this.encuesta.descripcion  =rest.DESCRIPCION
          this.encuesta.estado = rest.ESTADO_ENCUESTA=='ACTIVO'?true:false
        }   
      },
      error =>{
          this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
      }
    )
  }

  obtenerPreguntas(){
    this.encuestaService.getPreguntas(this.encuesta.id)
    .subscribe(
      data =>{
        if(data['status'] == 404){
          swal({ title: "Preguntas no encontradas", text: data['resultado'],type: "error", showConfirmButton: true })
          .then((result) => {
            if(result.value)
              this.iraListado()
          });
        }else{
          let preguntas:any = data['resultado']['resultados']
          preguntas.forEach(element => {
            let pregunta = {
              idpregunta:element['ID_PREGUNTA'],
              pregunta:element['DESCRIPCION_PREGUNTA'],
              opciones:element['ID_OPCION_RESPUESTA'],
              obligatoria:element['OBLIGATORIA'],
              cc:element['CENTRO_COMERCIAL'],
              estado:element['ESTADO_PREGUNTA']
            }
            this.listPreguntas.push(pregunta)
          });      
        }   
      },
      error =>{
          this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
      }
    )
  }

  getRestaurantesPorUsuario(){
    this.restauranteService.getRestaurantes()
        .subscribe(
            data =>{
                this.listRestaurante = data['resultado']['resultados']
            },
            error =>{
                
            }
        )
  }

  getOpciones(){
    this.encuestaService.getOpciones()
        .subscribe(
            data =>{
                this.listOpciones = data['resultado']['opcionRespuesta']
            },
            error =>{
                
            }
        )
  }

  addPregunta(){
    let pregunta = {
      idpregunta:'0',
      pregunta:'',
      opciones:'',
      obligatoria:'SI',
      cc:'NO',
      estado:'ACTIVO'
    }
    this.listPreguntas.push(pregunta)
  }

  removePregunta(item){
    var index = this.listPreguntas.indexOf(item);        
    if (index > -1) {
        if(item['idpregunta'] != "0"){
          item.estado = "INACTIVO"
          this.listPreguntasELiminadas.push(item)
        }
        this.listPreguntas.splice(index, 1);
    }
  }
  
  showOpcionesModal(item){

  }

  guardarDatos(){    
    if(this.listPreguntas == null || this.listPreguntas.length == 0){
      swal({ title: "Datos incompletos", text: "Ingrese al menos una pregunta",type: "warning", showConfirmButton: true });
      return
    }
    this.encuesta.estado = this.encuesta.estado?'ACTIVO':'INACTIVO'
    if(this.encuesta.id == 0){
      this.encuestaService.createEncuesta(this.encuesta,this.user.ID_USUARIO)
      .subscribe(
        data =>{
          if(data['status'] == 404){
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
          }else{
            let idencuesta = data['resultado']['id']
            let arrayOfData = [];
            this.listPreguntas.forEach(element => {
              arrayOfData.push(this.encuestaService.createPregunta(element,idencuesta,this.user.ID_USUARIO))                        
            });
            forkJoin(arrayOfData).subscribe(response => {
              console.log(response)
              swal({ title: this.encuesta.titulo, text: data['resultado']['mensaje'],type: "success", showConfirmButton: true })
              .then((result) => {
                if(result.value)
                  this.iraListado()
              });
            }, error => {
              console.error(error);
            });            
          }        
        },
        error =>{
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
        }
      )
    }else{
      this.encuestaService.editEncuesta(this.encuesta,this.user.ID_USUARIO)
      .subscribe(
        data =>{
          if(data['status'] == 404){
            this.toastr.warning('Hubo un error, comuniquese con el dpto de sistemas','Error')
          }else{
            let arrayOfData = [];
            this.listPreguntas.forEach(element => {
              if(element['idpregunta'] == "0"){
                arrayOfData.push(this.encuestaService.createPregunta(element,this.encuesta.id,this.user.ID_USUARIO))
              }else{
                arrayOfData.push(this.encuestaService.editPregunta(element,this.encuesta.id,this.user.ID_USUARIO))
              }                            
            });
            if(this.listPreguntasELiminadas.length > 0){
              this.listPreguntasELiminadas.forEach(element => {
                arrayOfData.push(this.encuestaService.editPregunta(element,this.encuesta.id,this.user.ID_USUARIO))
              });
            }
            forkJoin(arrayOfData).subscribe(response => {
              console.log(response)
              swal({ title: this.encuesta.titulo, text: data['resultado'],type: "success", showConfirmButton: true })
              .then((result) => {
                if(result.value)
                  this.iraListado()
              });
            }, error => {
              console.error(error);
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
    this.router.navigate(['/tables/encuesta']);
  }
}
