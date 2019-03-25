import { Component,ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  viewContainerRef : ViewContainerRef;
  
    constructor(viewContainerRef : ViewContainerRef){
      this.viewContainerRef = viewContainerRef;
    }
}
