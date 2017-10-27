import { NgModule } from '@angular/core';
import { FotoComponent } from './foto.component';
import { filtroPorTitulo } from './foto.pipes';
import { FotoService } from './foto.service';

@NgModule({
    declarations: [ FotoComponent, filtroPorTitulo ],
    exports: [ FotoComponent, filtroPorTitulo ],
    providers: [FotoService]
})

export class FotoModule { }