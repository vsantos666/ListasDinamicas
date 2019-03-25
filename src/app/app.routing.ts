import { Routes, RouterModule }  from '@angular/router';

import { ListenerComponent } from './+listener';
import { ConstantesComponent } from './constantes/constantes.component';
import { RegistroConstantesComponent } from './registro-constantes/registro-constantes.component';
import { CargaConstanteManualComponent } from './carga-constante-manual/carga-constante-manual.component';
import { BitacoraComponent } from './bitacora/bitacora.component';


export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
  //http://localhost:4200/#/listener/declaration/declaration/532921a2-7f60-46e8-b01c-64ff77f530c1/IMP
    path: 'listener/:menu/:codigo/:token/:role',
    component: ListenerComponent
  },
  {
    //http://localhost:4200/#/listener/declaration/declaration/532921a2-7f60-46e8-b01c-64ff77f530c1/IMP
    path: 'constantes',
    component: ConstantesComponent
  },
  {
    //http://localhost:4200/#/listener/declaration/declaration/532921a2-7f60-46e8-b01c-64ff77f530c1/IMP
    path: 'registroConstantes',
    component: RegistroConstantesComponent
  },
  {
    path: 'registroConstantes/:id',
    component: RegistroConstantesComponent
  },
  {    
    path: 'cargaConstanteManual/:id',
    component: CargaConstanteManualComponent
  },
  {    
    path: 'bitacora',
    component: BitacoraComponent
  }
];


export const routing = RouterModule.forRoot(appRoutes);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
