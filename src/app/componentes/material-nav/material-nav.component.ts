import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

import { RetornarAccionesService } from "../../servicios/retornar-acciones.service";

@Component({
  selector: 'app-material-nav',
  templateUrl: './material-nav.component.html',
  styleUrls: ['./material-nav.component.css']
})
export class MaterialNavComponent {

  public nombre;
  public apellido;
  public tipo;
  public acciones;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private retornarAcciones: RetornarAccionesService) { 

    let JWTHelper = new JwtHelperService();
    let token;

    token = JWTHelper.decodeToken(localStorage.getItem("token"));
    this.nombre = token.nombre;
    this.apellido = token.apellido;
    this.tipo = token.tipo;
    this.acciones = this.retornarAcciones.RetornarAcciones();
  }

  Logout() {
    
    localStorage.clear()
    location.href = "./";
  }
  
}
