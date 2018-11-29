import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";

import { JwtHelperService } from "@auth0/angular-jwt";

import { PageNotFoundComponent } from "../componentes/page-not-found/page-not-found.component";

@Injectable({
  providedIn: 'root'
})
export class VerificarTipoService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {

    let retorno: boolean = false;
    let JWTHelper = new JwtHelperService();
    let token: any;
    let roles = route.data["roles"];

    token = JWTHelper.decodeToken(localStorage.getItem("token"));

    for (let item of roles) {

      if (item == token.tipo) {

        retorno = true;
        break;
      }
    }

    if (!retorno)
      this.router.navigate([PageNotFoundComponent]);

    return retorno;
  }
}
