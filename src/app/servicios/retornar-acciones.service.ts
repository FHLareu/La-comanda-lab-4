import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class RetornarAccionesService {

  constructor() { }

  RetornarAcciones() {

    let acciones = [];
    let JWTHelper = new JwtHelperService();

    let tipo = (JWTHelper.decodeToken(localStorage.getItem("token"))).tipo;

    switch (tipo) {
      case 'socio':
        acciones = [
          { cols: 1, rows: 1, img: "nuevo-empleado.jpg", texto: 'Agregar un empleado', link: './principal/alta-empleado' },
          { cols: 1, rows: 1, img: "pedido.jpg", texto: 'Ver los pedidos', link: './principal/pedidos' },
          { cols: 2, rows: 1, img: "mesa.jpg", texto: 'Cerrar mesa', link: './principal/mesas' }
        ];
        break;

      case 'mozo':
        acciones = [
          { cols: 2, rows: 2, img: "pedido.jpg", texto: 'Gestionar pedidos', link: './principal/pedidos' }
        ];
        break;

      case 'cocinero':
        acciones = [
          { cols: 2, rows: 2, img: "pedido.jpg", texto: 'Tomar pedidos', link: './principal/pedidos' }
        ];
        break;

      case 'bartender':
        acciones = [
          { cols: 2, rows: 2, img: "pedido.jpg", texto: 'Tomar pedidos', link: './principal/pedidos' }
        ];
        break;

      case 'cervecero':
        acciones = [
          { cols: 2, rows: 2, img: "pedido.jpg", texto: 'Tomar pedidos', link: './principal/pedidos' }
        ];
        break;

      case 'cliente':
        acciones = [
          { cols: 1, rows: 1, img: "mesa.jpg", texto: 'Ocupar una mesa', link: './principal/mesas' },
          { cols: 1, rows: 1, img: "pedido.jpg", texto: 'Hacer un pedido', link: './principal/hacer-pedido' },
          { cols: 1, rows: 1, img: "estado-pedido.jpg", texto: 'Ver estado del pedido', link: './principal/palabras' },
          { cols: 1, rows: 1, img: "pagar.jpg", texto: 'Pagar', link: './principal/palabras' }
        ];
        break;

      default:
        break;
    }

    return acciones;

  }
}