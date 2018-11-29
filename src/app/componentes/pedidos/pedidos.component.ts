import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public displayedColumns: string[] = ['codigo', 'mesa', 'cliente', 'accion'];
  public pedidos;
  public pedidosParaConfirmar;
  public pedidosParaEntregar;
  public pedidosParaPreparar;
  public pedidosParaTerminar;

  public usuario: any;

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

    this.ListarPedidos();
  }

  ngOnInit() { }

  ConfirmarPedido(codigoPedido) {

    this.ocultarSpinner = false;

    this.conexion.EjecutarConsulta(`UPDATE \`pedidos\` SET \`estado\`=\'tomado\' WHERE \`codigo\`=\'${codigoPedido}\'`).subscribe(
      exito => {

        this.ocultarSpinner = true;

        if ((exito as any).valido == "true") {

          this.ListarPedidos();
          this.notificationsService.info("", "Se ha confirmado el pedido.");
        } else {

          this.notificationsService.error("Error", (exito as any).mensaje);
        }

      },

      error => {

        this.ocultarSpinner = true;
        this.notificationsService.error("Error", error)
      }
    );

    alert(codigoPedido);
  }

  SetearTiempo(item) {

    this.ocultarSpinner = false;
    let consulta = `UPDATE \`pedidos\` SET \`estado\`='preparando',\`tiempo\`=${item.minutos} WHERE \`codigo\`='${item.codigo}'`;

    console.log(item);

    this.conexion.EjecutarConsulta(consulta).subscribe(
      exito => {

        this.ocultarSpinner = true;

        if ((exito as any).valido == "true") {

          this.ListarPedidos();
          this.notificationsService.info("", "Se ha seteado el tiempo al pedido.");
        } else {

          this.notificationsService.error("Error", (exito as any).mensaje);
        }

      },
      error => {

        this.ocultarSpinner = true;
        alert("Error: " + JSON.stringify(error))
      }
    );

  }

  TerminarPedido(item) {

    this.ocultarSpinner = false;
    let columna = "";
    switch (this.usuario.tipo) {
      case 'cocinero':
        columna = "terminado_cocinero";
        break;

      case 'bartender':
        columna = "terminado_bartender";
        break;

      case 'cervecero':
        columna = "terminado_cervecero";
        break;

      default:
        break;
    }

    let consulta = `UPDATE \`pedidos\` SET \`${columna}\`=1 WHERE \`codigo\`='${item.codigo}'`;

    console.log(item);

    this.conexion.EjecutarConsulta(consulta).subscribe(
      exito => {

        this.ocultarSpinner = true;

        if ((exito as any).valido == "true") {

          this.ListarPedidos();
          this.notificationsService.info("", "Se ha terminado el pedido.");
        } else {

          this.notificationsService.error("Error", (exito as any).mensaje);
        }

      },
      error => {

        this.ocultarSpinner = true;
        alert("Error: " + JSON.stringify(error))
      }
    );

  }

  EntregarPedido(indice) {

    console.log(this.pedidosParaEntregar[indice]);

    let pedido = this.pedidosParaEntregar[indice];

    this.ocultarSpinner = false;
    let consulta = `UPDATE \`pedidos\` SET \`estado\`='entregado',\`terminado_cocinero\`=0,\`terminado_bartender\`=0,\`terminado_cervecero\`=0 WHERE \`codigo\`='${pedido.codigo}'`;

    this.conexion.EjecutarConsulta(consulta).subscribe(
      exito => {

        if ((exito as any).valido == "true") {

          let subConsulta = `UPDATE \`mesas\` SET \`estado\`='para cerrar' WHERE \`codigo\`='${pedido.mesa}'`;

          this.conexion.EjecutarConsulta(subConsulta).subscribe(
            exito => {

              this.ocultarSpinner = true;

              if ((exito as any).valido == "true") {

                this.ListarPedidos();
                this.notificationsService.info("", "Se ha entregado el pedido.");
              } else {

                this.notificationsService.error("Error", (exito as any).mensaje);
              }

            },
            error => {

              this.ocultarSpinner = true;
              alert("Error: " + JSON.stringify(error))
            }
          );

        } else {

          this.ocultarSpinner = true;
          this.notificationsService.error("Error", (exito as any).mensaje);
        }

      },
      error => {

        this.ocultarSpinner = true;
        alert("Error: " + JSON.stringify(error))
      }
    );

  }

  ListarPedidos() {

    this.ocultarSpinner = false;

    this.conexion.ListarEntidades("pedidos").subscribe(
      exito => {

        this.pedidos = [];
        this.ocultarSpinner = true;

        console.clear();
        for (let item of (exito as any).entidades) {

          this.pedidos.push(item);
        }

        this.pedidosParaConfirmar = this.pedidos.filter(item => {

          return item.estado == "espera";
        });

        this.pedidosParaPreparar = this.pedidos.filter(item => {

          item.minutos = 15;
          return item.estado == "tomado";
        });

        for (let item of this.pedidosParaPreparar) {
          item.pedido = JSON.parse(item.pedido);
        }

        console.log("pedidos para preparar");
        console.log(this.pedidosParaPreparar);

        this.pedidosParaTerminar = this.pedidos.filter(item => {

          return item.estado == "preparando";
        });

        for (let item of this.pedidosParaTerminar) {
          item.pedido = JSON.parse(item.pedido);
        }

        console.log("pedidos para terminar");
        console.log(this.pedidosParaTerminar);

        this.pedidosParaEntregar = this.pedidos.filter(item => {

          return item.terminado_cocinero == 1 && item.terminado_bartender == 1 && item.terminado_cervecero == 1;
          //return item.estado == "terminado";
        });
      },
      error => {

        this.ocultarSpinner = true;
        alert("Error: " + JSON.stringify(error))
      }
    );
  }

  Sumar(item) {
    item.minutos++;
  }

  Restar(item) {
    if (item.minutos)
      item.minutos--;
  }
}
