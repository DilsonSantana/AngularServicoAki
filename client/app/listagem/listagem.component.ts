import { Component } from '@angular/core';
import { FotoService } from '../foto/foto.service';
import { PainelComponent } from '../painel/painel.component';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'

})

export class ListagemComponent {

    fotos: Object[] = [];
    service: FotoService;
    mensagem: string = '';

    constructor(service: FotoService) {
        this.service = service;
        this.service
            .lista()
            .subscribe(fotos => {
                this.fotos = fotos;
                console.log(fotos);
            }, erro => {
                console.log(erro);
            })
    }

    remove(foto, painel: PainelComponent) {
        this.service
            .remove(foto)
            .subscribe(() => {

                painel.fadeOut(() => {

                    this.mensagem = 'Foto removida com sucesso.';
                    let novasFotos = this.fotos.slice(0);
                    let indice = novasFotos.indexOf(foto);
                    novasFotos.splice(indice, 1);
                    this.fotos = novasFotos;
                })

            },
            erro => {
                this.mensagem = 'Houve um erro ao remover a foto.';
                console.log(erro);
            });
    }
}