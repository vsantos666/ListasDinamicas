import {Component} from '@angular/core';

export class LoadingPageComponent {
    public loading: boolean;
    constructor(val: boolean) {
        this.loading = val;
    }
    standby() {
        this.loading = true;
    }
    ready() {
        this.loading = false;
    }
}

@Component({
    selector: 'loading-indicator',
    template: `<div id="loading-div-background" style="position: fixed;
    top: 0;left: 0; background: black; opacity: 0.7; width: 100%;
    height: 100%; z-index: 1000; background: rgba(0, 0, 0, 0.40);
    filter: alpha(opacity=50);"><div id="loading-div" style="text-align: 
    center; color:#ffffff; margin-top:200px"><h5>Cargando...</h5> <i class="fa fa-spinner fa-spin" aria-hidden="true" style="font-size:24px;"></i>
    </div></div>
    `
    
})
export class LoadingIndicatorComponent {}
