import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { Routes, RouterModule }         from '@angular/router';

import { AutorizacionService }          from "../../servicios/autorizacion.service";
import { VerificarTipoService }         from "../../servicios/verificar-tipo.service";

import { MaterialDashboardComponent }   from "../../componentes/material-dashboard/material-dashboard.component";
import { LoginComponent }               from "../../componentes/login/login.component";
import { RegistroComponent }            from "../../componentes/registro/registro.component";
import { PrincipalComponent }           from "../../componentes/principal/principal.component";
import { PageNotFoundComponent }        from "../../componentes/page-not-found/page-not-found.component";
import { PedidosComponent }             from '../../componentes/pedidos/pedidos.component';
import { MesasComponent }               from '../../componentes/mesas/mesas.component';
import { AltaEmpleadoComponent }        from '../../componentes/alta-empleado/alta-empleado.component';
import { HacerPedidoComponent }         from '../../componentes/hacer-pedido/hacer-pedido.component';
import { EstadoPedidoComponent }        from '../../componentes/estado-pedido/estado-pedido.component';

const rutas: Routes = [
  { path: "", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "principal", component: PrincipalComponent, canActivate: [AutorizacionService], children: [
    { path: "inicio", component: MaterialDashboardComponent, canActivate: [AutorizacionService] },
    { path: "pedidos", component: PedidosComponent, canActivate: [AutorizacionService] },
    { path: "hacer-pedido", component: HacerPedidoComponent, canActivate: [AutorizacionService, VerificarTipoService], data: { roles: ["cliente"] } },
    { path: "mesas", component: MesasComponent, canActivate: [AutorizacionService, VerificarTipoService], data: { roles: ["socio", "mozo", "cliente"] } },
    { path: "alta-empleado", component: AltaEmpleadoComponent, canActivate: [AutorizacionService, VerificarTipoService], data: { roles: ["socio"] } },
    { path: "estado-pedido", component: EstadoPedidoComponent, canActivate: [AutorizacionService, VerificarTipoService], data: { roles: ["cliente"] } }
  ] },
  { path: "**", component: PageNotFoundComponent }
 ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(rutas)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RutasModule { }
