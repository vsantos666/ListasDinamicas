import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';

@Component({
  selector: 'control-messages',
  template: '<div class="error" *ngIf="errorMessage !== null">{{errorMessage}}</div>'
//  template: `<div>{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  //errorMessage: string;

  @Input()
  submitted = false;
  
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if ((this.control.errors.hasOwnProperty(propertyName) && this.control.touched) || this.submitted) {
      //if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {

        var element = document.getElementById("div1");
        //console.log(this.control.errors.hasOwnProperty(propertyName) && this.control.touched);
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}