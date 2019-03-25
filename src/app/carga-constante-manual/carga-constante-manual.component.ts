import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantesService} from '../service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-carga-constante-manual',
  templateUrl: './carga-constante-manual.component.html',
  styleUrls: ['./carga-constante-manual.component.css']
})
export class CargaConstanteManualComponent implements OnInit {
  
  constante:any;
  desabilidato:boolean=true;
  file:any;
  displayWarning:boolean=false;    
  msgWarning:string="";
  progressObserver:any;
  displayInfo:boolean=false;    
  msgInfo:string=""; 
  despliegaRespuesta:boolean=false;    
  detalleCarga:string="";

  constructor(private route: ActivatedRoute,private constantesService:ConstantesService) { }

  ngOnInit() {
    this.inicializarConstante();    
    this.route.params.subscribe(params => {
      let id = params['id'];
      let nit = localStorage.getItem('nit');
      
      if (id != undefined) {              
        setTimeout(() => {
          this.constantesService.getConstanteById(id)
          .subscribe(constantes => {
            console.log(constantes);            
            this.constante = constantes;                                                                                                                   
          })
        });
      }
    });
  }

  formatFecha(fecha){
    if (fecha!=null){
      return new Date(fecha);                    
    }
    return "";
  }

  inicializarConstante(){
    this.constante = {nombre:"",tipoAduana:{codigo:"1",descripcion:"REGIONAL LA PAZ"},administracion:{codigo:"211",descripcion:"AEROPUERTO EL ALTO"},
    descripcion:"",tipoConstante:{codigo:"",descripcion:""},fechaDesde:"",fechaHasta:"",observaciones:"",entidades:[]};    
  }

  uploadFile = function(files) {
		var FileExt = (files.target.files[0].name).substring((files.target.files[0].name).lastIndexOf('.') + 1, files.target.files[0].name.length);
		if (FileExt.toLowerCase() == "xls" || FileExt.toLowerCase() == "xlsx") {
			console.log("Espermitido");
      this.file = files.target.files;      
		}else{      
      this.displayWarning = true;
      this.msgWarning = "Solo se permiten archivos con extencion .xls o .xlsx.";   
      (<HTMLInputElement>document.getElementById('uploadFileEntidad')).value = '';         
		}
  };
  
  autoHide(type) {
    setTimeout(() => {
      console.log(type)
      if (type == 'warning') {
        this.displayWarning = false;
      } else if (type == 'info') {
        this.displayInfo = false;
      } 
    }, 3000);
  }
  
  cargaMasivaEntidades = function () {

    var current = this;
    this.upload(environment.urlBackEndListasDinamicas + 'constantes/cargaEntidades',this.file).then(function (d) {
      //La respuesta del back end la volvemos un JSON
      current.displayInfo = true;
      current.msgInfo = "Se cargaron los datos";  
      current.despliegaRespuesta=true;
      current.detalleCarga = d;
      //console.log(d);
      
                                                              

    });   
    

  }


  public upload (url: string, files: File[]): Promise<any> {
    return new Promise((resolve, reject) => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i], files[i].name);
            formData.append("id", this.constante.id);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        };

        //FileUploadService.setUploadUpdateInterval(500);
        xhr.upload.onprogress = (event) => {
            let progress = Math.round(event.loaded / event.total * 100);
            //this.progressObserver.next(progress);
        };

        xhr.open('POST', url, true);
        xhr.send(formData);
    });
}

}
