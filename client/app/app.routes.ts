import { RouterModule, Routes } from '@angular/router';
import { CadastroPrestadorComponent } from './cadastro-prestador/cadastro-prestador.component';
import { ConfirmarCadastroComponent } from './confirmar-cadastro/confirmar-cadastro.component';
import { CadastreSeComponent } from './cadastre/cadastre.component';
import { ListagemComponent } from './listagem/listagem.component';
import { FotoComponent } from './foto/foto.component';


const appRoutes: Routes = [
    { path: '', component: ListagemComponent },
    { path: 'cadastroPrestador', component: CadastroPrestadorComponent },
    { path: 'confirmarCadastro', component: ConfirmarCadastroComponent },
    { path: 'cadastre', component: CadastreSeComponent },
    { path: '**', component: ListagemComponent }
]

export const routing = RouterModule.forRoot(appRoutes);