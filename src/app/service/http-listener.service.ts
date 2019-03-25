import { Injectable } from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { environment } from '../../environments/environment';
//import { constants }     from '../constant';


@Injectable()
export class HttpListenerService {

  constructor(private http: Http) {}

  getCredentials(codigo:string,token:string): Observable<Response> {
    console.log("getCredentials")
    return this.http.get(environment.urlBackEndSso+'credenciales/' + codigo + '/' + token).map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let data = res.json();
    return data;   
  }

  private handleError (error: any) {
    
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); 
    return Observable.throw(errMsg);
  }

}
