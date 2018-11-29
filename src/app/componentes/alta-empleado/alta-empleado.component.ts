import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { ConexionService }    from "../../servicios/conexion.service";

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.css']
})
export class AltaEmpleadoComponent implements OnInit {

  public correo;
  public nombre;
  public apellido;
  public clave;
  public tipo;

  public ocultarSpinner = true;
  public options = {
    position: ["top", "right"],
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true
  };

  constructor(private conexion: ConexionService, private notificationsService: NotificationsService) { }

  ngOnInit() { }

  Registrar() {

    if(!this.correo || !this.nombre || !this.apellido || !this.clave || !this.tipo) {
      
      this.notificationsService.info("Ups...", "Todos los campos deben ser completados.");
      return;
    }

    this.ocultarSpinner = false;

    this.conexion.Registrar(this.correo, this.nombre, this.apellido, this.clave, this.tipo).subscribe(
      exito => {

        this.ocultarSpinner = true;

        if((exito as any).valido == "false") {

          this.notificationsService.info("Ups...", (exito as any).mensaje);
        } else {

          this.notificationsService.success("Éxito!", `Se ha dado de alta el ${this.tipo}.`);
          setTimeout(() => location.href = "./principal/inicio", 3100);
        }
      },
      error => {

        this.ocultarSpinner = true;
        this.notificationsService.error("Error", (error as any).mensaje)
      }
    );
  }

}
