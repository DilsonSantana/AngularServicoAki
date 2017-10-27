import { Pipe, PipeTransform } from '@angular/core';
import { FotoComponent } from './foto.component';

@Pipe({
    name: 'filtroPorTitulo'
})

export class filtroPorTitulo implements PipeTransform{

    transform(fotos: FotoComponent[], digitado: string) {
       digitado = digitado.toLowerCase() ;
       return fotos.filter( fotos => fotos.titulo.toLowerCase().includes(digitado) )
    }

}