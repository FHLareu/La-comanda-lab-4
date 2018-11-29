import { Component, OnInit }  from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { ConexionService }    from "../../servicios/conexion.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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

  ngOnInit() {  }

  Registrar() {

    if(!this.correo || !this.nombre || !this.apellido || !this.clave) {
      
      this.notificationsService.info("Ups...", "Todos los campos deben ser completados.");
      return;
    }

    let re = /\S+@\S+\.\S+/;

    if (!(re.test(this.correo))) {
      this.notificationsService.info("Ups...", "Ingrese un correo válido.");
      return;
    }

    if(!this.tipo) {
      this.tipo = "cliente";
    }

    this.ocultarSpinner = false;

    this.conexion.Registrar(this.correo, this.nombre, this.apellido, this.clave, this.tipo).subscribe(
      exito => {

        this.ocultarSpinner = true;

        if((exito as any).valido == "false") {

          this.notificationsService.info("Ups...", (exito as any).mensaje);
        } else {

          this.notificationsService.success("Bien!", "Se ha creado tu usuario. En breves te dirigiremos a la página de logueo.");
          setTimeout(() => location.href = "./", 3100);
        }
      },
      error => {

        this.ocultarSpinner = true;
        this.notificationsService.error("Error", (error as any).mensaje)
      }
    );
  }

}
