import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ConstantesService} from '../service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { Message, CalendarModule, ConfirmationService } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';
import { ControlMessagesComponent } from '../components/control-messages/control-messages.component';
import { LoadingIndicatorComponent, LoadingPageComponent } from '../components/loading-indicator';
import { environment } from '../../environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-registro-constantes',
  templateUrl: './registro-constantes.component.html',
  styleUrls: ['./registro-constantes.component.css']
})
export class RegistroConstantesComponent extends LoadingPageComponent implements OnInit {

  @ViewChild('modalEntidades') public modalEntidad: ModalDirective;
  @ViewChild('modalMessage') public modalMessage: ModalDirective;
  @ViewChild('modalPublish') public modalPublis: ModalDirective;
  
    //@ViewChild("dt")public dt: DataTable;
  constante: any;  
  entidad:any;  
  entidadAterior:any;  
  entidades:any;  
  esEdicion:boolean=false;
  esFormEdicion:boolean=false;
  indexEdit:any;
  fechaI:any;
  fechaf:any;
  fechaTipo:any;
  tipoDatoList:any;
  tipoRiesgoList:any;
  response:any;
  cForm: any;
  eForm: any;
  sForm: any;
  displayWarning:boolean=false;  
  displayInfo:boolean=false;  
  msgWarning:string="";
  msgInfo:string="";
  displayError:boolean=false;  
  msgError:string="";
  contador:number=0;    
  displayUpload:boolean=false;    
  despliegaRespuesta:boolean=false;      
  displayInfo2:boolean=false;  
  msgInfo2:string="";  
  entidadUpload:any;
  

  constructor(private constantesService:ConstantesService,private route: ActivatedRoute,
    private _fb: FormBuilder,private router: Router) { 
      super(false);
    this.cForm = this._fb.group({
      'txtNombre': ['', Validators.required],
      'txtDescripcion': ['', Validators.required],
      'selTipo': [{ value: '' }, [Validators.required]],      
      'calFecDesde': [''],
      'calFecHasta': [''],
      'txtObservaciones': [''],
    });
    
    this.eForm = this._fb.group({      
      'calFecDesdeEnt': [''],
      'calFecHastaEnt': [''],
      'txtObservacionesEnt': [''],
      'selTipoRiesgo': [''],
      'txtSolicitante': [''],
    });    

    this.sForm = this._fb.group({      
      'calFecDesdeCons': ['', Validators.required],
      'calFecHastaCons': ['', Validators.required],      
    });    
  }

  ngOnInit() {
    this.inicializarTipoDato();
    this.inicializarConstante();    
    this.inicializarEntidad();
    this.inicializarTipoRiesgo();
    this.route.params.subscribe(params => {
      let id = params['id'];
      let nit = localStorage.getItem('nit');
      
      if (id != undefined) {              
        setTimeout(() => {
          this.constantesService.getConstanteById(id)
          .subscribe(constantes => {
            console.log(constantes);
            this.esFormEdicion = true;
            this.constante = constantes;                        
            this.entidades=this.constante.entidades;                 
            //para los selects
            this.constante.tipoConstante = this.tipoDatoList[this.tipoDatoList.map(function (e) { return e.codigo; }).indexOf(this.constante.tipoConstante.codigo)];                         

            this.constante.fechaDesde = this.formatFecha(this.constante.fechaDesde);

            this.constante.fechaHasta = this.formatFecha(this.constante.fechaHasta);
            
            for (let data of this.entidades) {
              data.modificado = false;
              data.fechaDesde = this.formatFecha(data.fechaDesde);
              data.fechaHasta = this.formatFecha(data.fechaHasta);
              if(this.constante.tipoConstante.codigo == '4'){
                data.valor = this.formatFecha(data.valor);
              }
            }

            this.addControls();

            console.log("las entidades: "+this.entidades);
            
          })
        });
      }
    });
    
  }

  cargaEntidades(){

    this.constantesService.getConstanteById(this.constante.id)
    .subscribe(constantes => {
      console.log(constantes);
      this.esFormEdicion = true;
      this.constante = constantes;                        
      this.entidades=this.constante.entidades;                 
      //para los selects
      this.constante.tipoConstante = this.tipoDatoList[this.tipoDatoList.map(function (e) { return e.codigo; }).indexOf(this.constante.tipoConstante.codigo)];                         

      this.constante.fechaDesde = this.formatFecha(this.constante.fechaDesde);

      this.constante.fechaHasta = this.formatFecha(this.constante.fechaHasta);
      
      for (let data of this.entidades) {
        data.modificado = false;
        data.fechaDesde = this.formatFecha(data.fechaDesde);
        data.fechaHasta = this.formatFecha(data.fechaHasta);
        if(this.constante.tipoConstante.codigo == '4'){
          data.valor = this.formatFecha(data.valor);
        }
      }

      this.addControls();

      console.log("las entidades: "+this.entidades);
      
    })

  }

  formatFecha(fecha){
    if (fecha!=null){
      return new Date(fecha);                          
    }
    return "";
  }

  addModalEntidad(): void {   
    console.log("las entidades: "+this.entidades);
    if(this.constante.tipoConstante.codigo != ""){
      this.esEdicion=false; 
      this.inicializarEntidad();         
      this.modalEntidad.show();
    }else{
      this.displayWarning = true;
      this.msgWarning = "Debe seleccionar el tipo de lista.";      
    }
  }
  hideModalEntidad(): void {
    if(this.esEdicion){      
      this.entidadAterior = this.constantesService.getData();        
      this.entidadAterior.fechaDesde = this.fechaI;
      this.entidadAterior.fechaHasta = this.fechaf;   
      if(this.constante.tipoConstante.codigo == '4'){
        this.entidadAterior.valor = this.fechaTipo;   
      }   
      this.entidades[this.indexEdit] = this.entidadAterior;
    }    
    if(this.entidades!=null){
      this.refreshDT();    
    }
    this.modalEntidad.hide();        
  }

  addEntidad(): void {   
    if (!this.eForm.valid) {      
      console.log(this.cForm.dirty);
      this.displayWarning = true;
      this.msgWarning = "Debe completar el los datos de la entidad";      
      return;
    }    
    if(this.entidades == null) {
      this.entidades = [];
      this.entidades.push(this.entidad);
    }else{
      this.entidades.push(this.entidad);
    }    
    console.log("quesera"+this.entidades);  
    this.refreshDT();
    this.modalEntidad.hide();        
  }

  editEntidad(): void {   
    if (!this.eForm.valid) {      
      console.log(this.cForm.dirty);
      this.displayWarning = true;
      this.msgWarning = "Debe completar el los datos de la entidad";      
      return;
    }   
    if(this.entidad.id!=null){
      this.entidad.usuarioUltimaEdicion= sessionStorage.getItem("username");
      this.entidad.fechaUltimaEdicion= new Date();
      this.entidad.modificado = true;
    }
    this.entidades[this.indexEdit] = this.entidad;
    console.log(this.entidades);    
    this.refreshDT();
    this.modalEntidad.hide();        
  }

  deleteEntidad(index){
    this.indexEdit = index;
    this.modalMessage.show();
    this.msgWarning = "¿Esta seguro de eliminar la entidad?";    
  }

  acceptDelete(){
    this.entidades.splice(this.indexEdit, 1);   
    this.refreshDT(); 
    this.modalMessage.hide();
  }
  cancelDelete(){
    //this.refreshDT();
    this.modalMessage.hide();    
  }

  editModalEntidad(data,index){      
    this.indexEdit = index;
    this.esEdicion=true;     
    if(this.constante.tipoConstante.codigo == '4'){
      this.fechaTipo = data.valor;    
      data.valor = "";
    }
    this.fechaI = data.fechaDesde;     
    this.fechaf= data.fechaHasta;
    data.fechaDesde = "";
    data.fechaHasta = "";
    let json = JSON.stringify(data);          
    this.entidad = JSON.parse(json);
    this.entidad.fechaDesde = this.fechaI;
    this.entidad.fechaHasta = this.fechaf;
    if(this.constante.tipoConstante.codigo == '4'){
      this.entidad.valor = this.fechaTipo;
    }
    this.constantesService.setData(JSON.parse(json));    
    //cambiamos el valor del tipo riesgo
    if(this.entidad.tipoRiesgo!=null){
      this.entidad.tipoRiesgo = this.tipoRiesgoList[this.tipoRiesgoList.map(function (e) { return e.codigo; }).indexOf(this.entidad.tipoRiesgo.codigo)];                             
    }        
    this.modalEntidad.show();    
  }

  inicializarConstante(){
    this.constante = {nombre:"",tipoAduana:{codigo:"1",descripcion:"REGIONAL LA PAZ"},administracion:{codigo:"211",descripcion:"AEROPUERTO EL ALTO"},
    descripcion:"",tipoConstante:{codigo:"",descripcion:""},fechaDesde:"",fechaHasta:"",observaciones:"",entidades:[]};    
  }

  inicializarEntidad(){
    this.entidad = {valor:"",tipoRiesgo:{codigo:"",descripcion:""},solicitante:"",fechaDesde:"",fechaHasta:"",observaciones:""};
  }

  inicializarEntidadUpload(){
    this.entidadUpload = {valor:"",tipoRiesgo:{codigo:"",descripcion:""},solicitante:"",fechaDesde:"",fechaHasta:"",observaciones:""};
  }

  inicializarTipoDato(){
    this.tipoDatoList = [{codigo:"1",descripcion:"TEXTO"},{codigo:"2",descripcion:"NUMERO ENTERO"},{codigo:"3",descripcion:"NUMERO DECIMAL"},{codigo:"4",descripcion:"FECHA"}];
  }

  inicializarTipoRiesgo(){
    this.tipoRiesgoList = [{codigo:"1",descripcion:"UNO"},{codigo:"2",descripcion:"DOS"},{codigo:"3",descripcion:"TRES"},{codigo:"4",descripcion:"CUATRO"}];
  }

  createConstante(){
    if (!this.cForm.valid) {
      console.log(this.cForm.dirty);
      this.displayWarning = true;
      this.msgWarning = "Debe completar el registro";
      return false;
    }        
    console.log(this.constante);
    this.constante.entidades = this.entidades;    
    this.loading = true;
    this.constantesService.createConstanteData(this.constante).subscribe(response => {
      this.response = response;
      console.log(this.response);        
          if (this.response.ok == true && this.response.status == 200) {
            let objId = JSON.parse(this.response._body);            
            let message = response.headers._headers.get('x-ingreso-params')[0];            
            this.loading = false;            
            this.displayInfo = true;
            this.msgInfo = message;                        
          } else {
            let message = response.headers._headers.get('x-ingreso-params')[0];
            this.loading = false;
            this.displayWarning = true
            this.msgWarning = message;            
          }
    }, (error: any) => {
      this.loading = false;
      this.displayError = true
      this.msgError = error;
    });
  }

  editConstante(){
    if (!this.cForm.valid) {
      console.log(this.cForm.dirty);
      this.displayWarning = true;
      this.msgWarning = "Debe completar el registro";
      return false;
    }   
    console.log(this.constante);
    this.constante.entidades = this.entidades;
    this.loading = true;
    this.constantesService.editContstanteData(this.constante).subscribe(response => {
      this.response = response;
      console.log(this.response);
      if (this.response.ok == true && this.response.status == 200) {
        let objId = JSON.parse(this.response._body);            
        let message = response.headers._headers.get('x-ingreso-params')[0];            
        this.loading = false;            
        this.displayInfo = true;
        this.msgInfo = message;                   
      } else {
        let message = response.headers._headers.get('x-ingreso-params')[0];
        this.loading = false;
        this.displayWarning = true
        this.msgWarning = message;            
      }
    }, (error: any) => {
      this.loading = false;
      this.displayError = true
      this.msgError = error;
    });
  }

  changeTipo(){    
    console.log("waaaaaaaaaaaaaaaaaaaaa: " +this.contador);
    this.addControls();
    if(this.contador<2 && this.esFormEdicion){
      
    }else{
      this.entidades = null;
    }    
    this.contador++;
  }

  onlyNumberKey(event) {
    console.log()
      let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;    
  }

  onlyDecimalNumberKey(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
  }

  autoHide(type) {
    setTimeout(() => {
      console.log(type)
      if (type == 'warning') {
        this.displayWarning = false;
      } else if (type == 'error') {
        this.displayError = false;
      } else if (type == 'info') {
        this.displayInfo = false;
        let link = ['/constantes'];
        this.router.navigate(link);    
      }else if (type == 'info2') {
        this.displayInfo2 = false;            
      }
    }, 3000);
  }

  addControls(){
    this.eForm.removeControl('txtValorText');
    this.eForm.removeControl('txtValorNumber');
    this.eForm.removeControl('txtValorDecimal');
    this.eForm.removeControl('calValor');
    switch(this.constante.tipoConstante.codigo){
      case '1':
        this.eForm.addControl('txtValorText' , new FormControl('', Validators.required));      
        break;
      case '2':
        this.eForm.addControl('txtValorNumber' , new FormControl('', Validators.required));
        break;
      case '3':
        this.eForm.addControl('txtValorDecimal' , new FormControl('', Validators.required)); 
        break;
      case '4':
        this.eForm.addControl('calValor' , new FormControl('', Validators.required));    
        break;
    }   
  }  


  refreshDT(){    
    let ent = [...this.entidades]
    this.entidades = ent;
  }

  downloadConstante() {
    console.log("downloadDoc"+this.constante.id)
    if(this.constante.id != null){
      window.open(environment.urlBackEndSalida +"reporte/constantes/xlsx?idDocumento="+this.constante.id);                                                      
    }else{
      this.displayWarning = true
      this.msgWarning = "Necesita guardar el registro para exportar los datos";    
    }
  }

  uploadConstante(){
    console.log("downloadDoc"+this.constante.id)
    if(this.constante.id != null){
      this.displayUpload=true;
      
    }else{
      this.displayWarning = true
      this.msgWarning = "Necesita guardar el registro para importar los datos";    
    }
  }

  uploadConstanteCancel(){
    this.displayUpload=false;
    this.cargaEntidades();
  }

  uploadFile = function(files) {
		var FileExt = (files.target.files[0].name).substring((files.target.files[0].name).lastIndexOf('.') + 1, files.target.files[0].name.length);
		if (FileExt.toLowerCase() == "xls" || FileExt.toLowerCase() == "xlsx") {
			console.log("Espermitido");
      this.file = files.target.files;   
      this.fileAll = files;
		}else{      
      this.displayWarning = true;
      this.msgWarning = "Solo se permiten archivos con extencion .xls o .xlsx.";   
      (<HTMLInputElement>document.getElementById('uploadFileEntidad')).value = '';         
		}
  };

  cargaMasivaEntidades = function () {

    const target: DataTransfer = <DataTransfer>(this.fileAll.target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      let data = XLSX.utils.sheet_to_json(ws);        

      console.log("haber q es: "+ JSON.stringify(data));
      let a = JSON.stringify(data);

      let b = JSON.parse(a);
      console.log("haber q es2: "+ b[0].TIPO_RIESGO);

      this.uploadClient(b);
      
    };
    reader.readAsBinaryString(target.files[0]);
    
        /*var current = this;
        this.loading = true;
        this.upload(environment.urlBackEndListasDinamicas + 'constantes/cargaEntidades',this.file).then(function (d) {
          //La respuesta del back end la volvemos un JSON
          current.displayInfo2 = true;
          current.msgInfo2 = "Se cargaron los datos";  
          current.despliegaRespuesta=true;
          current.detalleCarga = d;

          current.cargaEntidades();
          current.loading=false;
          //console.log(d);                                                                                
        }, (error: any) => {
          this.loading = false;
          this.displayError = true
          this.msgError = error;
        });               */
  };

  uploadClient(data:any){
    if(this.entidades == null) {
      this.entidades = [];      
    }    
    for (let value of data) {        
      this.inicializarEntidadUpload();
      //this.entidadUpload 
      if (value.ID!=null){
        this.entidadUpload.id = value.ID;
      }
      if (value.VALOR!=null){
        if(this.constante.tipoConstante.codigo == '4'){
          this.entidadUpload.valor = this.formatFecha(value.VALOR);
        }else{
          this.entidadUpload.valor = value.VALOR;
        }        
      }
      if (value.TIPO_RIESGO!=null){
        for (let tipo of this.tipoRiesgoList) {  
          if(tipo.descripcion == value.TIPO_RIESGO){
            this.entidadUpload.tipoRiesgo = tipo;
            break;
          }
        }                        
      }
      if (value.SOLICITANTE!=null){
        this.entidadUpload.solicitante = value.SOLICITANTE;
      }
      if (value.FECHA_DESDE!=null){

        //this.entidadUpload.fechaDesde = value.FECHA_DESDE;
        this.entidadUpload.fechaDesde = this.formatFecha(value.FECHA_DESDE);
      }
      if (value.FECHA_HASTA!=null){
        //this.entidadUpload.fechaHasta = value.FECHA_HASTA;
        this.entidadUpload.fechaHasta = this.formatFecha(value.FECHA_HASTA);
      }
      if (value.OBSERVACIONES!=null){
        this.entidadUpload.observaciones = value.OBSERVACIONES;
      }     
      if (value.OPERACION!=null){
        switch(value.OPERACION){
          case 'A':
            this.entidadUpload.modificado = false;
            this.entidad = this.entidadUpload;
            this.entidades.push(this.entidad);
            break;
          case 'M':            
            for (let i = 0; this.entidades.length;i++) {  
              if(this.entidades[i].id == this.entidadUpload.id){
                this.entidades[i].valor = this.entidadUpload.valor;
                this.entidades[i].tipoRiesgo = this.entidadUpload.tipoRiesgo;
                this.entidades[i].solicitante = this.entidadUpload.solicitante;
                this.entidades[i].fechaDesde = this.entidadUpload.fechaDesde;
                this.entidades[i].fechaHasta = this.entidadUpload.fechaHasta;
                this.entidades[i].observaciones = this.entidadUpload.observaciones;                
                this.entidades[i].modificado = true;                
                break;
              }
            }  
            break;
          case 'B':
            for (let i = 0; this.entidades.length;i++) {  
              if(this.entidades[i].id == this.entidadUpload.id){
                this.entidades.splice(i, 1);                               
                break;
              }
            }                          
            break;          
        }                 
      }     
    }
    this.refreshDT()    
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
  snapshotConstante(){
    console.log("downloadDoc"+this.constante.id)
    if(this.constante.id != null){
      if (!this.cForm.valid) {
        console.log(this.cForm.dirty);
        this.displayWarning = true;
        this.msgWarning = "Debe completar el registro";
        return false;
      }   
      this.constante.fechaDesde = "";
      this.constante.fechaHasta = "";
      this.modalPublis.show();         
    }else{
      this.displayWarning = true
      this.msgWarning = "Necesita guardar el registro para generar un snapshot";    
    }

  }
  aceptSnapshot(){
    if (!this.sForm.valid) {
      console.log(this.cForm.dirty);
      this.displayWarning = true;
      this.msgWarning = "Debe completar el registro";
      return false;
    }   
    this.modalPublis.hide();
    this.constante.entidades = this.entidades;
    this.loading = true;  
    this.constantesService.generateConstanteData(this.constante).subscribe(response => {
      this.response = response;
      console.log(this.response);
      if (this.response.ok == true && this.response.status == 200) {        
        let objId = JSON.parse(this.response._body);            
        let message = response.headers._headers.get('x-ingreso-params')[0];            
        this.loading = false;            
        this.displayInfo = true;
        this.msgInfo = message;                   
      } else {
        let message = response.headers._headers.get('x-ingreso-params')[0];        
        this.loading = false;
        this.displayWarning = true
        this.msgWarning = message;            
      }
    }, (error: any) => {      
      this.loading = false;
      this.displayError = true
      this.msgError = error;
    });
    
  }

  cancelSnapshot(){
    this.constante.fechaDesde = "";
    this.constante.fechaHasta = "";
    this.modalPublis.hide();
  }
}
