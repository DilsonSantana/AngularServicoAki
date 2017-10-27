import { Component, Input, HostListener, Directive, ViewChild, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Categoria } from '../domain/categoria/categoria';
import { Tipo } from '../domain/tipo/tipo';
import { Servico } from '../domain/servico/servico';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro-prestador',
    templateUrl: './cadastro-prestador.component.html',
    styleUrls: ['./cadastro-prestador.component.css']
})


export class CadastroPrestadorComponent implements OnInit {
    @ViewChild('f') formCadastro: NgForm;
    meuFormPrincipal: FormGroup;
    salvar: boolean = false;

    @Input() public nomeCompleto: string;
    @Input() public nomeEmpresa: string;
    @Input() public email: string;
    @Input() public cidade: string;
    @Input() public endereco: string;
    @Input() public numero: number;
    @Input() public estado: string;
    @Input() public cnpj: number;
    @Input() public senha: string;
    @Input() public confirmarSenha: string;

    //ARRAY
    public categorias: Array<Categoria>;
    public tipos: Array<Tipo>;
    public servicos: Array<Servico>;
    public servicosSelecionados: Array<Servico>;

    //CATEGORIAS
    public construcao: Categoria;
    public informatica: Categoria;
    public transporte: Categoria;
    public vazio: Categoria;

    //TIPOS
    public manutencao: Tipo;
    public desenvolvimento: Tipo;
    public redes: Tipo;
    public impressoras: Tipo;
    public monitoramento: Tipo;

    //SERVICOS
    public notebook: Servico;
    public impressora: Servico;
    public computador: Servico;
    public cabeamento: Servico;
    public instalacaoRoteador: Servico;

    public route: ActivatedRoute;
    public router: Router;


ngOnInit(){
    this.meuFormPrincipal = new FormGroup({
            'nomeCompleto': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])),
            'nomeEmpresa': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])),
            'email': new FormControl('', Validators.compose([Validators.required])),
            'endereco': new FormControl('', Validators.compose([Validators.required])),
            'numero': new FormControl('', Validators.compose([Validators.required, this.verificaNumero.bind(this)])),
            'cidade': new FormControl('', Validators.compose([Validators.required])),
            'estado': new FormControl('', Validators.compose([Validators.required])),
            'cnpj': new FormControl(null, [Validators.required, this.verificaCNPJ.bind(this)]),
            'senha': new FormControl(null, Validators.compose([Validators.required])),
            'confirmarSenha': new FormControl(null, Validators.compose([Validators.required, this.verificarSenhaIguais.bind(this)]))
        });
        this.meuFormPrincipal.reset();
        this.criarItens();
}

    constructor(fb: FormBuilder, route: ActivatedRoute, router: Router) {

        this.route = route;
        this.router = router;

    }

    criarItens() {
        //SERVICOS
        this.notebook = { name: "Notebook", checked: false };
        this.impressora = { name: "Impressora", checked: false };
        this.computador = { name: "Computador", checked: false };
        this.cabeamento = { name: "Cabeamento", checked: false };
        this.instalacaoRoteador = { name: "InstalacaoRoteador", checked: false };

        //TIPOS
        this.desenvolvimento = { name: "Desenvolvimento", checked: false, servico: [] };
        this.manutencao = { name: "Manutencao", checked: false, servico: [this.notebook, this.impressora, this.computador,] };
        this.redes = { name: "Redes", checked: false, servico: [this.cabeamento, this.instalacaoRoteador] };
        this.impressoras = { name: "Impressora", checked: false, servico: [] };
        this.monitoramento = { name: "Monitoramento", checked: false, servico: [] };

        //CATEGORIAS
        this.construcao = { name: "Construcao", tipo: [] }
        this.informatica = {
            name: "Informatica", tipo: [
                this.desenvolvimento,
                this.manutencao,
                this.redes,
                this.impressoras,
                this.monitoramento
            ]
        }
        this.transporte = { name: "Transporte", tipo: [] }
        this.vazio = { name: "", tipo: [] }

        //ARRAY <CATEGORIA>
        this.categorias = [this.vazio, this.construcao, this.informatica, this.transporte];
        this.tipos = [];
        this.servicos = [];
        this.servicosSelecionados = [];
        this.salvar = false;

        // console.log(this.categorias);

        // console.log(this.meuFormPrincipal.get('confirmarSenha').value);
    }

    carregarTipos(event, categoria) {
        this.categorias.forEach(element => {
            element.tipo = this.limparCheckBox(element.tipo);
            this.tipos = this.limparCheckBox(this.tipos);
            this.servicos = this.limparCheckBox(this.servicos);
            this.servicosSelecionados = this.limparCheckBox(this.servicosSelecionados);
            this.salvar = false;

            if (element.name != "") {
                if (element.name == categoria) {
                    this.tipos = element.tipo;
                }
            } else {
                this.tipos = [];
                this.servicos = [];
                this.servicosSelecionados = [];
            }
        });
        event.preventDefault();
    }

    carregarServicos(event) {
        this.servicos = [];
        this.servicosSelecionados = [];
        this.salvar = false;
        this.tipos.forEach(element => {
            if (element.name == event.target.defaultValue) {
                if (event.target.checked) {
                    element.checked = true;
                } else {
                    element.checked = false;
                }
            }
            if (element.checked) {
                element.servico.forEach(servico => {
                    if (!servico.name.match("/")) {
                        servico.name = element.name + "/" + servico.name;
                    }
                    this.servicos.push(servico);

                    if (servico.checked) {
                        this.servicosSelecionados.push(servico);
                    }
                });
            } else {
                element.servico = this.limparCheckBox(element.servico);

            }
        });
        event.preventDefault();
    }

    carregarServicosSelecionados(event) {
        // console.log(event);
        this.servicosSelecionados = [];
        this.servicos.forEach(element => {
            if (element.name == event.target.defaultValue) {
                if (event.target.checked) {
                    element.checked = true;
                } else {
                    element.checked = false;
                }
            }
            if (element.checked) {
                this.servicosSelecionados.push(element);
                this.salvar = true;
            } else {
                element.checked = false;
            }
        });


        event.preventDefault();
    }

    private limparCheckBox(lista: Array<any>) {
        lista.forEach(element => {
            element.checked = false;
        });
        return lista;
    }

    concluirCadastro() {
        console.log(this.meuFormPrincipal);
        // if (this.verificarSenha()) {
        // this.router.navigate(['confirmarCadastro']);
        // }
        //console.log(this.formCadastro.value);
    }
    // control: FormControl): { [s: string]: boolean }
    verificarSenha() {
        try {
            console.log(this.meuFormPrincipal.get('senha').value);
            console.log(this.meuFormPrincipal.get('confirmarSenha').value);

            if (this.meuFormPrincipal.get('senha').value == this.meuFormPrincipal.get('confirmarSenha').value) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.log(error);
        }
    }

    verificarSenhaIguais(control: FormControl): { [s: string]: boolean } {
        if (!this.verificarSenha()) {
            return { 'confirmarSenha': false };
        } else {
            return null;
        }
    }




    verificaNumero(control: FormControl): { [s: string]: boolean } {

        try {
            if (this.meuFormPrincipal.get('numero').value == 0) {
                return { 'numero': false };
            } else if (this.meuFormPrincipal.get('numero').value == null) {
                return { 'numero': false };
            } else if (this.meuFormPrincipal.get('numero').value == '') {
                return { 'numero': false };
            } else {
                return null;
            }
        } catch (error) {
            console.log("erro em verificar numero");
        }

    }

    verificaCNPJ(control: FormControl): { [s: string]: boolean } {
        // console.log(control);
        if ((control.value < 9999999999999) && (control.value > 1)) {
            return { 'ControlCNPJ': false };
        } else if (control.value == null) {
            return null;
        } else if (control.value > 99999999999999) {
            return { 'ControlCNPJ': false };
        } else {
            return null;
        }
    }

}