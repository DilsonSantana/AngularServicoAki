import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})

export class CadastroComponent {

    foto: FotoComponent = new FotoComponent();
    meuForm: FormGroup;
    route: ActivatedRoute;
    router: Router;
    id: string = '';
    mensagem: string = '';

    constructor(fb: FormBuilder, route: ActivatedRoute, router: Router) {

        this.route = route;
        this.router = router;

        this.meuForm = fb.group({
            nomeCompleto: [''],
            nomeEmpresa: [''],
            email: [''],
            endereco: [''],
            numero: [''],
            cidade: [''],
            estado: [''],
            cnpj: [''],
            senha: [''],
            confirmarSenha: ['']
        })
    }

}