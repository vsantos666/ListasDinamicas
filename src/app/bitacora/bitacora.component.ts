import { Component, OnInit } from '@angular/core';
import { ConstantesHistService} from '../service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {


  verResultado:boolean=false;
  usuario:string="";
  fecha:string="";
  nombreLista:string="";
  listConstantesHist:any;
  bitacoraList:any;
  bitacora:any;

  constructor(private constantesHistService:ConstantesHistService ) { }

  ngOnInit() {
  }

  limpiar(){
    this.verResultado = false;
    this.usuario="";
    this.fecha="";
    this.nombreLista="";

  }

  buscarBitacora(){
    this.bitacoraList = [];
    let a = "?";    
    if(this.usuario!=""){
      a = a + "user="+this.usuario;
    }
    if(this.fecha!=""){            
      let b = new Date(this.fecha);      
      let fechaFinal = b.toLocaleString().split(" ");
      let fechaFinal2 = fechaFinal[0].replace("/","-");
      fechaFinal2 = fechaFinal2.replace("/","-");
      console.log(fechaFinal2);
      a = a + "&fecha="+fechaFinal2;
    }
    if(this.nombreLista!=""){
      a = a + "&nombreLista="+this.nombreLista;
    }

    this.constantesHistService.getConstantesHist(a)
    .subscribe(constantesHist => {
    this.listConstantesHist = constantesHist
      console.log(this.listConstantesHist);      
      console.log("antes");
      for(let constantesHist of this.listConstantesHist){        
        console.log("ITERA1");
        for(let value of constantesHist.cambios){
          console.log("ITERA2");
          this.initBitacora();    
          this.bitacora.id = value.idReferencia;
          this.bitacora.valorAnterior = value.valorAnterior;
          this.bitacora.valorActual = value.valorActual
          this.bitacora.operacion = value.operacion;
          this.bitacora.usuario = constantesHist.usuario;
          this.bitacora.fecha = constantesHist.fecha;    
          this.bitacora.nombre = constantesHist.nombre;   
          //if(this.bitacoraList == null) {
//            this.bitacoraList = [];
            //this.bitacoraList.push(this.bitacora);
          //}else{
            this.bitacoraList.push(this.bitacora);
          //}             
        }
      } 
      this.refreshDT();
    });
    this.verResultado = true;    
  }

  initBitacora(){
    this.bitacora={idReferencia:"",nombre:"",valorAnterior:"",valorActual:"",usuario:"",fecha:"",operacion:""};
  }

  refreshDT(){    
    let bitList = [...this.bitacoraList]
    this.bitacoraList = bitList;
  }

}
