import { Component, OnInit,ViewChild } from '@angular/core';
import {DataTable, MenuItem} from 'primeng/primeng';
import {Column, LazyLoadEvent} from 'primeng/primeng';
import { ConstantesService} from '../service';
import { Router} from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-constantes',
  templateUrl: './constantes.component.html',
  styleUrls: ['./constantes.component.css']
})
export class ConstantesComponent implements OnInit {

  @ViewChild('modalMessage') public modalMessage: ModalDirective;
  listConstantes: any;
  indexEdit:any;
  msgWarning:string="";

  response: any = null;

  constructor(private constantesService:ConstantesService,private router: Router) { }

  ngOnInit() {
    this.loadComponentes();
  }

  loadComponentes() {
    let estados: Array<String> = ["BORRADOR"];

    this.constantesService.getConstantes()
      .subscribe(constantes => {
      this.listConstantes = constantes
        console.log(this.listConstantes);
      });
  }

  deleteConstante(index){
    this.indexEdit = index;
    this.modalMessage.show();
    var str = "";
    var result = str.link("https://www.w3schools.com");
    this.msgWarning = "¿Esta seguro de eliminar la constante? "+ result;     
  }

  acceptDelete(){
    this.constantesService.deleteConstantes(this.indexEdit)
    .subscribe(response => {
      this.response = response
      console.log(response);
      this.loadComponentes();
    }) 
    this.modalMessage.hide();
  }
  cancelDelete(){
    this.modalMessage.hide();    
  }

  editConstante(id: string) {
    console.log("editDoc"+id)
    let link = ['/registroConstantes/' + id];
    this.router.navigate(link);    
  }

  uploadConstante(id: string) {
    console.log("uploadDoc"+id)
    let link = ['/cargaConstanteManual/' + id];
    this.router.navigate(link);    
  }

  downloadConstante(id: string) {
    console.log("downloadDoc"+id)
    window.open(environment.urlBackEndSalida +"reporte/constantes/xlsx?idDocumento="+id);                                                      
  }

}
