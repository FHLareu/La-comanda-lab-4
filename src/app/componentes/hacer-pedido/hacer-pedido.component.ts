import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-hacer-pedido',
  templateUrl: './hacer-pedido.component.html',
  styleUrls: ['./hacer-pedido.component.css']
})
export class HacerPedidoComponent implements OnInit {

  public displayedColumns: string[] = ['imagen', 'nombre', 'precio', 'cantidad'];
  public dataSource;
  public total: number = 0;

  public usuario: any;
  public mesaUsuario;

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

    this.total = 0;
    this.dataSource = [
      { imagen: "milanesa.jpg", nombre: "Milanesas", precio: 30, cantidad: 0, tipo: "cocinero" },
      { imagen: "ravioles.jpg", nombre: "Ravioles", precio: 40, cantidad: 0, tipo: "cocinero" },
      { imagen: "puchero.jpg", nombre: "Puchero", precio: 120, cantidad: 0, tipo: "cocinero" },
      { imagen: "mariscos.jpg", nombre: "Mariscos", precio: 60, cantidad: 0, tipo: "cocinero" },
      { imagen: "vino.jpg", nombre: "Vino añejo", precio: 70, cantidad: 0, tipo: "cervecero" },
      { imagen: "champan.jpg", nombre: "Champán", precio: 200, cantidad: 0, tipo: "cervecero" },
      { imagen: "gaseosa.jpg", nombre: "Gaseosa", precio: 40, cantidad: 0, tipo: "bartender" },
      { imagen: "jugo.jpg", nombre: "Jugo", precio: 15, cantidad: 0, tipo: "bartender" },
      { imagen: "milkshake.jpg", nombre: "Milkshake", precio: 32, cantidad: 0, tipo: "bartender" }
    ];

    this.ocultarSpinner = false;

    this.conexion.ListarEntidades("usuarios").subscribe(
      exito => {

        this.ocultarSpinner = true;

        for (let item of (exito as any).entidades) {

          if (item.correo == this.usuario.correo) {

            this.mesaUsuario = item.mesa;
            break;
          }
        }

        if(!this.mesaUsuario) {
          location.href = "./**";
        }

      },
      error => {

        this.ocultarSpinner = true;
        alert("Error: " + JSON.stringify(error))
      }
    );

  }

  ngOnInit() { }

  Sumar(indice) {
    this.dataSource[indice].cantidad++;
    this.CalcularTotal();
  }

  Restar(indice) {

    if (this.dataSource[indice].cantidad) {
      this.dataSource[indice].cantidad--;
      this.CalcularTotal();
    }
  }

  CalcularTotal() {

    this.total = this.dataSource.reduce((valorAnterior, valorActual, indice) => {

      if (indice > 1)
        return valorAnterior + valorActual.cantidad * valorActual.precio;
      else
        return valorAnterior.cantidad * valorAnterior.precio + valorActual.cantidad * valorActual.precio;
    });
  }

  HacerPedido() {

    let pedidoAux = this.dataSource.filter(item => {

      return item.cantidad > 0;
    });

    let pedido = JSON.stringify(pedidoAux);
    let randomString = this.RandomString(5, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    let valido = false;
    let hizoPedidoParaCocinero = 1;
    let hizoPedidoParaBartender = 1;
    let hizoPedidoParaCervecero = 1;

    for (let item of pedidoAux) {
      if(item.tipo == "cocinero") { hizoPedidoParaCocinero = 0; continue; }
      if(item.tipo == "bartender") { hizoPedidoParaBartender = 0; continue; }
      if(item.tipo == "cervecero") { hizoPedidoParaCervecero = 0; continue; }
    }

    let consulta = `INSERT INTO \`pedidos\`(\`codigo\`, \`nombre_cliente\`, \`apellido_cliente\`, \`mesa\`, \`pedido\`, \`estado\`, \`terminado_cocinero\`, \`terminado_bartender\`, \`terminado_cervecero\`, \`correo\`) VALUES (
      '${randomString}',
      '${this.usuario.nombre}',
      '${this.usuario.apellido}',
      '${this.mesaUsuario}',
      '${pedido}',
      'espera',
      ${hizoPedidoParaCocinero},
      ${hizoPedidoParaBartender},
      ${hizoPedidoParaCervecero},
      '${this.usuario.correo}')`;

    if (this.mesaUsuario) {

      for (let item of this.dataSource) {

        if (item.cantidad > 0) {
          valido = true;
        }
      }

      if (valido) {

        this.ocultarSpinner = false;

        this.conexion.EjecutarConsulta(consulta).subscribe(
          exito => {

            this.ocultarSpinner = true;

            if ((exito as any).valido == "true") {

              this.ocultarSpinner = true;
              this.notificationsService.success("Bien!", `Se ha registrado tu pedido. Redireccionando a principal.`);
              setTimeout(() => location.href = "./principal/inicio", 3100);
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
      } else {

        this.notificationsService.info("Ups...", `Selecciona por lo menos un elemento.`);
      }
    }
  }

  RandomString(length, chars) {
    var result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }


}
