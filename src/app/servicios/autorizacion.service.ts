import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService implements CanActivate{

  canActivate() {

    let retorno;
    let jwtHelper = new JwtHelperService();

    try {

      jwtHelper.decodeToken(localStorage.getItem("token"));
      retorno = true;
    } catch (error) {

      location.href = "./";
      retorno = false;
    }

    return retorno;
  }

  constructor() { }
}
