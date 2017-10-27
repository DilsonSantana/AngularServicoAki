import { Component, Input, OnInit, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'painel',
    templateUrl: './painel.component.html',
    styleUrls: ['./painel.component.css']
})

export class PainelComponent {

    elemento: ElementRef;

    constructor(elemento: ElementRef) {
        this.elemento = elemento;
    }

    fadeOut(cb) {
        $(this.elemento.nativeElement).fadeOut(cb);
    }

}