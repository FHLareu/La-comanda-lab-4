import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../servicios/conexion.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

  public mesas: Array<any>;
  public mesasParaMostrar: Array<any>;
  public usuario: any;

  public displayedColumns: string[] = ['codigo', 'estado', 'accion'];
  public dataSource;

  public ocultarSpinner = true;
  public options = {
    position: ["top", "right"],
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true
  };

  constructor(private conexion: ConexionService, private notificationsService: NotificationsService) {

    let JWTHelper = new JwtHelperService();
    this.usuario = JWTHelper.decodeToken(localStorage.getItem("token"));
    let tieneMesa = false;

    if (this.usuario.tipo == "socio") {
      this.displayedColumns.splice(2, 0, 'cliente');
    }

    if (this.usuario.tipo == "cliente") {

      this.conexion.ListarEntidades("usuarios").subscribe(
        exito => {

          for (let item of (exito as any).entidades) {

            if (item.correo == this.usuario.correo) {

              if (item.mesa) {
                tieneMesa = true;
              }

              break;
            }
          }

          if (tieneMesa) {

            location.href = "./**";
          }
        },
        error => {

          alert("Error: " + JSON.stringify(error))
        }
      );
    }

    this.ListarMesas();

  }

  ngOnInit() { }

  OcuparMesa(codigoMesa) {

    this.ocultarSpinner = false;

    this.conexion.EjecutarConsulta(`UPDATE \`mesas\` SET \`cliente\`=\'${this.usuario.correo}\', \`estado\`='ocupada' WHERE \`codigo\`=\'${codigoMesa}\'`).subscribe(
      exito => {

        if ((exito as any).valido == "true") {

          this.conexion.EjecutarConsulta(`UPDATE \`usuarios\` SET \`mesa\`=\'${codigoMesa}\' WHERE \`correo\`=\'${this.usuario.correo}\'`).subscribe(
            exito => {

              this.ocultarSpinner = true;

              if ((exito as any).valido == "true") {

                this.notificationsService.success("Bien!", `Haz ocupado la mesa ${codigoMesa}. Redireccionando a la página principal.`);
                setTimeout(() => location.href = "./principal/inicio", 3100);
              } else {

                this.notificationsService.error("Error", (exito as any).mensaje);
              }
            },
            error => {

              this.ocultarSpinner = true;
              this.notificationsService.error("Error", error)
            }
          );
        } else {

          this.ocultarSpinner = true;
          this.notificationsService.error("Error", (exito as any).mensaje);
        }

      },

      error => {

        this.ocultarSpinner = true;
        this.notificationsService.error("Error", error)
      }
    );
  }

  CerrarMesa(codigoMesa) {

    this.ocultarSpinner = false;
    let consulta = `UPDATE \`mesas\` SET \`cliente\`=\'sin cliente\', \`estado\`='libre' WHERE \`codigo\`=\'${codigoMesa.codigo}\'`;

    this.conexion.EjecutarConsulta(consulta).subscribe(
      exito => {

        if ((exito as any).valido == "true") {

          let subConsulta = `DELETE FROM \`pedidos\` WHERE \`correo\`='${codigoMesa.cliente}'`;

          this.conexion.EjecutarConsulta(subConsulta).subscribe(
            exito => {

              if ((exito as any).valido == "true") {

                let subSubConsulta = `UPDATE \`usuarios\` SET \`mesa\`=null WHERE \`correo\`=\'${codigoMesa.cliente}\'`;

                this.conexion.EjecutarConsulta(subSubConsulta).subscribe(
                  exito => {

                    this.ocultarSpinner = true;

                    if ((exito as any).valido == "true") {

                      this.ListarMesas();
                      this.notificationsService.info("Éxito", "Se ha liberado la mesa.");
                    } else {

                      this.ocultarSpinner = true;
                      this.notificationsService.error("Error", (exito as any).mensaje);
                    }
                  },
                  error => {

                    alert("Error: " + JSON.stringify(error))
                  }
                );

              } else {

                this.ocultarSpinner = true;
                this.notificationsService.error("Error", (exito as any).mensaje);
              }
            },
            error => {

              alert("Error: " + JSON.stringify(error))
            }
          );


        } else {

          this.ocultarSpinner = true;
          this.notificationsService.error("Error", (exito as any).mensaje);
        }
      },
      error => {

        alert("Error: " + JSON.stringify(error))
      }
    );
  }

  ListarMesas() {

    this.conexion.ListarEntidades("mesas").subscribe(
      exito => {

        this.mesas = (exito as any).entidades;

        switch (this.usuario.tipo) {

          case 'socio':
            this.mesasParaMostrar = this.mesas;
            break;

          case 'cliente':
            this.mesasParaMostrar = this.mesas.filter(item => {

              return item.estado == "libre";
            });
            break;

          default:
            break;
        }

        this.dataSource = this.mesasParaMostrar;

      },
      error => alert("Error: " + JSON.stringify(error))
    );

  }

}