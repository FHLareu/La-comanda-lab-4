import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { ConexionService } from "../../servicios/conexion.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public correo;
  public clave;
  public slcUsuario = 0;

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

  Logear() {

    if (!this.correo || !this.clave) {

      this.notificationsService.info("Ups...", "Todos los campos deben ser completados.");
      return;
    }

    let re = /\S+@\S+\.\S+/;

    if (!(re.test(this.correo))) {
      this.notificationsService.info("Ups...", "Ingrese un correo válido.");
      return;
    }

    this.ocultarSpinner = false;

    this.conexion.Logear(this.correo, this.clave).subscribe(
      exito => {

        if ((exito as any).valido == "false") {

          this.ocultarSpinner = true;
          this.notificationsService.info("Ups...", (exito as any).mensaje);
        } else {

          localStorage.setItem("token", (exito as any).token);
          location.href = "./principal/inicio";
        }
      },
      error => {

        this.ocultarSpinner = true;
        this.notificationsService.error("Error", (error as any).mensaje)
      }
    );
  }

  SetearUsuario() {

    let usuarios = [
      { correo: "socio@correo.com", clave: "111" },
      { correo: "mozo@correo.com", clave: "222" },
      { correo: "cocinero@correo.com", clave: "333" },
      { correo: "bartender@correo.com", clave: "444" },
      { correo: "cervecero@correo.com", clave: "555" },
      { correo: "cliente@correo.com", clave: "666" },
      { correo: "cliente2@correo.com", clave: "777" }
    ];

    this.correo = usuarios[this.slcUsuario].correo;
    this.clave = usuarios[this.slcUsuario].clave;

  }

}
