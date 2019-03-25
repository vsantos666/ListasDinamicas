import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class ConstantesService {
  
  data:any;

  constructor(private http: Http) { }

  getData(){
    return this.data;
  }

  setData(data:any){
    this.data=data;
  }

  createConstanteData(data): Observable<any> {
    return this.http.post(environment.urlBackEndListasDinamicas + 'constantes',data).map(this.extractResponse)
      .catch(this.handleError);
  }

  editContstanteData(data): Observable<any> {
    return this.http.put(environment.urlBackEndListasDinamicas + 'constantes',data).map(this.extractResponse)
      .catch(this.handleError);
  }

  getConstantes(): Observable<any> {
    return this.http.get(environment.urlBackEndListasDinamicas + 'constantes/documentos')
    .map(this.extractData).catch(this.handleError);
  }

  deleteConstantes(id: string): Observable<any> {
    return this.http.delete(environment.urlBackEndListasDinamicas + 'constantes/' + id).map(this.extractData)
      .catch(this.handleError);
  }

  getConstanteById(id: string): Observable<any> {
    return this.http.get(environment.urlBackEndListasDinamicas + 'constantes/'+id).map(this.extractData)
      .catch(this.handleError);
  }

  generateConstanteData(data): Observable<any> {
    return this.http.post(environment.urlBackEndListasDinamicas + 'constantes/snapshot',data).map(this.extractResponse)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    //let res= res.json();
    return res.json();
    //return body || { };    
  }

  private extractDataList(res: Response) {
    let body = res.json();
    return body.result || {};
  }

  private extractResponse(res: Response) {
    console.log(res);
    return res;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
