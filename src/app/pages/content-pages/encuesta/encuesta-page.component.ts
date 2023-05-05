import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioService } from 'app/_services/usuario.service';
import { EncuestaService } from 'app/_services/encuesta.service';
import swal from 'sweetalert2';

//import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-encuesta-page',
    templateUrl: './encuesta-page.component.html',
    styleUrls: ['./encuesta-page.component.scss']
})

export class EncuestaPageComponent {
    arrayParametrosPregunta: any = { intIdEncuesta: null }
    intIdEncuesta = ""
    objEncuesta: any = {
        strTitulo: 'Encuesta de satisfacción del cliente',
        strDescripcion: 'asd',
        strCorreo: '',
        strAnioNacimiento: ''
    }
    objData: any = {
        intIdEncuesta: null,
        arrayPregunta: null,
        strUsrSesion: "",
        strCorreo: "",
        strGenero: "Seleccione su Género",
        strEdad: ""
    }
    arrayGenero: any
    arrayPregunta: any
    loading: any = false;
    constructor(private objEncuestaService: EncuestaService,
        //private toastr: ToastrService,
        private objUsuarioService: UsuarioService) {
        this.arrayPregunta = []
        this.arrayGenero = ["Seleccione su Género", "Masculino", "Femenino", "Otros"]
    }
    ngOnInit(): void {
        const urlParams = new URLSearchParams(window.location.search);
        this.intIdEncuesta = urlParams.get('intIdEncuesta')
        this.verPreguntas()
    }
    verPreguntas() {
        this.loading = true
        this.arrayParametrosPregunta.intIdEncuesta = this.intIdEncuesta
        console.log(this.intIdEncuesta)
        if (this.intIdEncuesta.length == 0) {
            swal({ title: "Error", text: "No se pudo cargar las preguntas con los parámetros enviados.", type: "error", showConfirmButton: true })
                .then((result) => {
                    if (result.value)
                        location.reload();
                });
        }
        else {
            console.log(this.arrayParametrosPregunta)
            this.objEncuestaService.getPregunta(this.arrayParametrosPregunta)
                .subscribe(
                    data => {
                        this.loading = false
                        if (data["intStatus"] == 200) {
                            this.arrayPregunta = data["arrayPregunta"]
                        }
                        else {
                            swal({ title: "", text: data["strMensaje"], type: "error", showConfirmButton: true })
                                .then((result) => {
                                    if (result.value)
                                        location.reload();
                                });
                        }
                    },
                    error => {

                    }
                )
        }
    }
    guardarDatos() {
        this.loading = true
        const objRadio = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');
        let arrayTempRespuesta = []
        const objJsonPregunta = {
        }
        objRadio.forEach((arrayItemRadio) => {
            if (arrayItemRadio.checked) {
                arrayTempRespuesta = arrayItemRadio.id.split("_")
                console.log("intIdPregunta: " + arrayTempRespuesta[1] + " | intRespuesta: " + arrayTempRespuesta[2])
                let objJsonRespuesta = { [arrayTempRespuesta[1]]: arrayTempRespuesta[2] }
                Object.assign(objJsonPregunta, objJsonRespuesta);
            }
        });
        const objText = document.querySelectorAll<HTMLInputElement>('input[type="text"]');
        let arrayTempRespuestaText = []
        objText.forEach((arrayItemText) => {
            if (arrayItemText.id != 'strCorreo' && arrayItemText.id != 'strEdad') {
                arrayTempRespuestaText = arrayItemText.id.split("_")
                console.log("intIdPregunta: " + arrayTempRespuestaText[1] + " | intRespuesta: " + arrayItemText.value)
                let objJsonRespuesta = { [arrayTempRespuestaText[1]]: arrayItemText.value }
                Object.assign(objJsonPregunta, objJsonRespuesta);
            }
        });
        this.objData.intIdEncuesta = this.intIdEncuesta
        this.objData.arrayPregunta = objJsonPregunta
        this.objData.strUsrSesion = "anonimoEncuestaWeb"
        console.log(this.objData)
        this.objEncuestaService.createRespuesta(this.objData)
            .subscribe(
                data => {
                    this.loading = false
                    if (data["intStatus"] == 200) {
                        swal({ title: "", text: data["strMensaje"], type: "success", showConfirmButton: true })
                            .then((result) => {
                                if (result.value)
                                    location.reload();
                            });
                    }
                    else {
                        swal({ title: "", text: data["strMensaje"], type: "error", showConfirmButton: true })
                            .then((result) => {
                                if (result.value)
                                    location.reload();
                            });
                    }
                },
                error => {

                }
            )

    }
}