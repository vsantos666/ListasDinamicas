import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import { constants }     from '../constant';
import { environment } from '../../environments/environment';

@Injectable()
export class SsoService {

  data: any;

  constructor(private http: Http) { }

  verificarToken(): void {
    let localToken = localStorage.getItem('Auth-Token');
    let sessionToken = sessionStorage.getItem('Auth-Token');
    //console.log('local-->',localToken);
    //console.log("session-->",sessionToken);
    
    if(localToken!=sessionToken){
         window.top.location.href = environment.urlFrontEndLogin;    
    }


    if (localStorage.getItem('Auth-Token') == undefined) {
      window.top.location.href = environment.urlFrontEndLogin;
    } else {
      this.getVerificarToken().subscribe(response => {
        this.data = response;
        if (this.data.success == false) {
          window.top.location.href = environment.urlFrontEndLogin;
        }
      });
    }
  }


  getVerificarToken(): Observable<Response> {
    return this.http.get(environment.urlBackEndSso + 'autenticar/verificar/' + localStorage.getItem('Auth-Token') + "?id=" + Math.random() * 123456789).
      map(this.extractData).catch(this.handleError);

  }

  private extractData(res: Response) {
    let data = res.json();
    return data;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  

}
