
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ApplicationRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule,LocationStrategy, HashLocationStrategy,APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule,XHRBackend,Http,Request,RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';

//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-popover';

import { AppComponent } from './app.component';
import { ListenerComponent } from './+listener';
import { UppercaseDirective } from './directive/uppercase.directive';

import { ControlMessagesComponent } from './components/control-messages';
import { LoadingIndicatorComponent} from './components/loading-indicator';

import { SsoService,ValidationService, HttpListenerService,ConstantesService,ConstantesHistService} from './service';

import {InputTextModule,DataTableModule,ButtonModule,DialogModule,MultiSelectModule,
  PanelModule, GrowlModule, CalendarModule, InputMaskModule, CheckboxModule, AutoCompleteModule,
  ConfirmDialogModule, OverlayPanelModule, TooltipModule
} from 'primeng/primeng';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/empty";
import 'rxjs/add/operator/map';

import { environment }     from '../environments/environment';

import { Router} from '@angular/router';
import { routing } from './app.routing';
import { ModalModule } from 'ngx-bootstrap';
import { ConstantesComponent } from './constantes/constantes.component';
import { RegistroConstantesComponent } from './registro-constantes/registro-constantes.component';
import { CargaConstanteManualComponent } from './carga-constante-manual/carga-constante-manual.component';
import { BitacoraComponent } from './bitacora/bitacora.component';

class HttpInterceptor extends Http {
  
      constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router) {
          super(backend, defaultOptions);
      }
  
      request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
          //console.log('url request-->' + url);
          return this.intercept(super.request(url, options));
      }
  
      get(url: string, options?: RequestOptionsArgs): Observable<Response> {
          //console.log('url get-->' + url);
          let localToken = localStorage.getItem('Auth-Token');
          let sessionToken = sessionStorage.getItem('Auth-Token');
          //alert('get');
          if (localToken != null && sessionToken != null && url.indexOf(environment.url_firmador) == -1) {
              if (localToken != sessionToken) {
                  window.top.location.href = environment.urlFrontEndLogin;
              } else {
                  //console.log("intercept get ", this.intercept(super.get(url, this.getRequestOptionArgs(options))));
                  return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
                  //return this.intercept(super.get(url, options));
  
              }
          } else {
              return this.intercept(super.get(url, options));
          }
  
  
      }
  
  
      post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
          console.log('url post-->' + url);
          console.log(body);
          let localToken = localStorage.getItem('Auth-Token');
          let sessionToken = sessionStorage.getItem('Auth-Token');
          console.log('session-->' + sessionToken);
          if (url.indexOf(environment.url_firmador) != -1) {
              return this.intercept(super.post(url, body, options));
          } else if (localToken != null && sessionToken != null) {
              if (localToken != sessionToken) {
                  window.top.location.href = environment.urlFrontEndLogin;
              } else {
                  return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
              }
          } else {
              return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
          }
      }
  
      put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
          let localToken = localStorage.getItem('Auth-Token');
          let sessionToken = sessionStorage.getItem('Auth-Token');
          if (localToken != null && sessionToken != null) {
              if (localToken != sessionToken) {
                  window.top.location.href = environment.urlFrontEndLogin;
              } else {
                  return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
              }
          } else {
              console.log("localToken 22")
              return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
          }
      }
  
      delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
          let localToken = localStorage.getItem('Auth-Token');
          let sessionToken = sessionStorage.getItem('Auth-Token');
          if (localToken != null && sessionToken != null) {
              if (localToken != sessionToken) {
                  window.top.location.href = environment.urlFrontEndLogin;
              } else {
                  return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
              }
          } else {
              return this.intercept(super.delete(url, options));
          }
      }
  
      getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
          if (options == null) {
              options = new RequestOptions();
          }
          if (options.headers == null) {
              options.headers = new Headers();
          }
          //options.headers.append('Content-Type', 'application/json');
          //alert(sessionStorage.getItem("Auth-Token"));        
          let deploymentId = sessionStorage.getItem('deploymentId');
          let definitionId = sessionStorage.getItem('definitionId');
          if(deploymentId != null){
              options.headers.append('deploymentId', deploymentId);
          }
          if(definitionId != null){
              options.headers.append('definitionId', definitionId);            
          }        
          options.headers.append('Auth-Token', sessionStorage.getItem("Auth-Token"));
          options.headers.append('user', sessionStorage.getItem("username"));
          //console.log(options);
          return options;
      }
  
      intercept(observable: Observable<Response>): Observable<Response> {
           //console.log("observable++++1");
          return observable.catch((err, source) => {
              //alert(err);
              if (err.status == 401) {
                  window.top.location.href = environment.urlFrontEndLogin;
                  return Observable.empty();
              } else {
                  //console.log("observable++++");
                  return Observable.throw(err);
              }
          });
  
      }
  }

@NgModule({
  declarations: [
    AppComponent,  
    ControlMessagesComponent,
    LoadingIndicatorComponent,
    ListenerComponent,
    ConstantesComponent,
    RegistroConstantesComponent,
    UppercaseDirective,
    CargaConstanteManualComponent,
    BitacoraComponent
  ],
  imports: [   
    BrowserModule,    
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      ModalModule.forRoot(),
      routing,      
      TabsModule.forRoot(),          
      PopoverModule,                                                     
      InputTextModule,
      DataTableModule,
      ButtonModule,DialogModule,
      CalendarModule, InputMaskModule,
      ConfirmDialogModule, OverlayPanelModule,      
      MultiSelectModule,
      CheckboxModule,    
      TabsModule.forRoot(),
      PanelModule,
      ModalModule.forRoot(),
      GrowlModule,
      AutoCompleteModule,      
      TooltipModule,
      BrowserAnimationsModule,
  ],
  providers: [   
    SsoService,
    ValidationService,
    HttpListenerService, 
    ConstantesService,
    ConstantesHistService,
    {provide:LocationStrategy,  useClass: HashLocationStrategy },
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide:Http,         
        useFactory:  httpFactory,
        deps: [XHRBackend, RequestOptions, Router]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) {
  return  new HttpInterceptor(xhrBackend, requestOptions, router);
}
