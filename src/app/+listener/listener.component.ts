import { Component, OnInit, OnDestroy} from '@angular/core';
//import { Router ,RouteSegment} from '@angular/router';
import { Router, ActivatedRoute} from '@angular/router';
import {Response } from '@angular/http';
import {HttpListenerService } from '../service';
import { environment }     from '../../environments/environment';
//import { constants }     from '../constant';

@Component({
  selector: 'app-listener',
  templateUrl: 'listener.component.html',
  styleUrls: ['listener.component.css'],
})
export class ListenerComponent implements OnInit, OnDestroy {
  sub: any;
  data: any;

  constructor(private router: Router, private route: ActivatedRoute, private httpListenerService: HttpListenerService) { }

  ngOnInit() {
    sessionStorage.removeItem('Auth-Token');          
    localStorage.removeItem('Auth-Token');          
    console.log('session storage-->'+sessionStorage.getItem('Auth-Token'));
    
    this.sub = this.route.params.subscribe(params => {
      let menu = params['menu'];
      let codigo = params['codigo'];  
      let token = params['token'];
      let role = params['role'];
      this.httpListenerService.getCredentials(codigo, token).subscribe(response => {
        this.data = response;
        console.log('data-->' + JSON.stringify(this.data));
        if (this.data.success) {
          localStorage.setItem('Auth-Token', this.data.result.token);
          sessionStorage.setItem('Auth-Token', this.data.result.token);          
          localStorage.setItem('username', this.data.result.usuario.nombreUsuario);
          sessionStorage.setItem('username', this.data.result.usuario.nombreUsuario);          
          localStorage.setItem('role', role);
          localStorage.setItem('usuarioEmail', this.data.result.usuario.email);
          localStorage.setItem('nit', this.data.result.usuario.perfilUsuario.nit);
          sessionStorage.setItem('nit', this.data.result.usuario.perfilUsuario.nit);
          if (menu.indexOf("&") != -1) {
            menu = menu.replace(/&/g, "/");
            console.log("menu-->" + menu);
          }
          let link = ['/' + menu];
          this.router.navigate(link);
        } else {
          window.top.location.href = environment.urlFrontEndLogin;
        }
      });

    });


    //console.log('token-->'+localStorage.getItem("Auth-Token"));


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  // routerOnActivate(curr: RouteSegment): void {
  //     console.log('param-->'+curr.getParam('modulo'));
  //     console.log('token-->'+curr.getParam('token'));

  //     //
  //     //this.location.replaceState('/'); // clears browser history so they can't navigate with back button
  //     //this.router.navigateByUrl('usuarios');
  //     //this.router.navigate(['usuarios'],curr);
  //     this.router.navigate(['registro-dam']);




  //     //window.location.href = '/usuarios';

  // }

}
