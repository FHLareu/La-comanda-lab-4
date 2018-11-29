import { Component, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { RetornarAccionesService } from "../../servicios/retornar-acciones.service";

@Component({
  selector: 'app-componentes/material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.css']
})
export class MaterialDashboardComponent {

  public acciones;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {

      // return [
      //     { cols: 1, rows: 1, img: "palabras.jpg", texto: 'Palabras',               link: './principal/palabras',            posicion: 'right', mensaje: `Una cadena de caracteres aleatorios se mostrará en pantalla. Tienes pocos segundos para replicarla. Escribirla correctamente hará que sumes un punto, pero al primer error despídete de tu record!` },
      //     { cols: 1, rows: 1, img: "AA.jpg",       texto: 'Agilidad aritmética',    link: './principal/agilidad-aritmetica', posicion: 'left',  mensaje: `¿Eres bueno con las matemáticas? Demuestralo resolviendo una serie de operaciones aritmeticas aleatorias. Un resultado correcto dara pie a otra operacion, pero si te equivocas en una: GAME OVER!` },
      //     { cols: 1, rows: 1, img: "AeN.jpg",      texto: 'Adivina el número',      link: './principal/adivina-el-numero',   posicion: 'right', mensaje: `¿Asi que te crees uno de los pocos afortunados que nacieron con un sexto sentido? Sácalo a la luz adivinando un número que se genera aleatoriamente. Adivinar un número hara que sumes un punto y me custione mas seriamente realizarte estudios cientificos para determinar si es cierto eso del sexto sentido.` },
      //     { cols: 1, rows: 1, img: "anagrama.jpg", texto: 'Anagrama',               link: './principal/anagrama',            posicion: 'left',  mensaje: `Una palabra se elegirá de forma aleatoria y se mostrará desordenada en la pantalla. Tu misión es la de descifrar esa palabra! Tienes 5 intentos para resolver la mayor cantidad posible.` },          
      //     { cols: 2, rows: 1, img: "puntajes.jpg", texto: 'Puntajes',               link: './principal/puntajes',            posicion: 'above', mensaje: `Ve los puntajes de todos los jugadores en cada juego.` }
      // ];

      return this.acciones;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private retornarAcciones: RetornarAccionesService) {

    this.acciones = this.retornarAcciones.RetornarAcciones();

  }

  Redireccionar(url: string) { location.href = url; }
}
