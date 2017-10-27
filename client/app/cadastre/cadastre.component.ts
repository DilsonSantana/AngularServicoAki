import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastre',
    templateUrl: './cadastre.component.html'
})
export class CadastreSeComponent {

    route: ActivatedRoute;
    router: Router;

     constructor(route: ActivatedRoute, router: Router){

        this.route = route;
        this.router = router;

     }

     paginaCadastroPrestador(){
        this.router.navigate(['cadastroPrestador']);
     }
}
