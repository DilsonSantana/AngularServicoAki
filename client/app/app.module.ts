import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FotoModule } from './foto/foto.module';
import { PainelModule } from './painel/painel.module';
import { HttpModule } from '@angular/http'
import 'rxjs/add/operator/map';
import { CadastroPrestadorComponent } from './cadastro-prestador/cadastro-prestador.component';
import { ListagemComponent } from './listagem/listagem.component';
import { routing } from './app.routes'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotaoModule } from './botao/botao.module';
import { CadastreSeComponent } from './cadastre/cadastre.component';
import { ConfirmarCadastroComponent } from './confirmar-cadastro/confirmar-cadastro.component';
import { CustomFormsModule } from './validator/index';

@NgModule({
    imports: [
        BrowserModule,
        FotoModule,
        PainelModule,
        HttpModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        BotaoModule,
        CustomFormsModule
    ],
    declarations: [
        AppComponent, 
        CadastroPrestadorComponent, 
        ListagemComponent, 
        CadastreSeComponent,
        ConfirmarCadastroComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }