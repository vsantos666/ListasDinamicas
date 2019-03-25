import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class ConstantesHistService {


  constructor(private http: Http) { }

  getConstantesHist(data:string): Observable<any> {
    return this.http.get(environment.urlBackEndListasDinamicas + 'constantesHist/dataTable'+data)
    .map(this.extractData).catch(this.handleError);
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
