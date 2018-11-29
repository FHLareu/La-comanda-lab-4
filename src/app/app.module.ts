import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { FormsModule }                from '@angular/forms';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';
import { HttpClientModule }           from '@angular/common/http';
import { LayoutModule }               from '@angular/cdk/layout';

import { SimpleNotificationsModule }  from 'angular2-notifications';

import { RutasModule }                from "./modulos/rutas/rutas.module";
import { CustomMaterialModule }       from "./modulos/custom-material/custom-material.module";

import { ConexionService }            from "./servicios/conexion.service";
import { AutorizacionService }        from "./servicios/autorizacion.service";
import { RetornarAccionesService }    from "./servicios/retornar-acciones.service";
import { JwtHelperService }           from "@auth0/angular-jwt";

import { AppComponent }               from './app.component';
import { RegistroComponent }          from './componentes/registro/registro.component';
import { LoginComponent }             from './componentes/login/login.component';
import { PrincipalComponent }         from './componentes/principal/principal.component';
import { PageNotFoundComponent }      from './componentes/page-not-found/page-not-found.component';
import { MaterialNavComponent }       from './componentes/material-nav/material-nav.component';
import { MaterialDashboardComponent } from './componentes/material-dashboard/material-dashboard.component';
import { MesasComponent }             from './componentes/mesas/mesas.component';
import { AltaEmpleadoComponent }      from './componentes/alta-empleado/alta-empleado.component';
import { PedidosComponent }           from './componentes/pedidos/pedidos.component';
import { HacerPedidoComponent }       from './componentes/hacer-pedido/hacer-pedido.component';
import { EstadoPedidoComponent }      from './componentes/estado-pedido/estado-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    PageNotFoundComponent,
    LoginComponent,
    PrincipalComponent,
    MaterialNavComponent,
    MaterialDashboardComponent,
    MesasComponent,
    AltaEmpleadoComponent,
    PedidosComponent,
    HacerPedidoComponent,
    EstadoPedidoComponent
  ],
  imports: [
    BrowserModule,
    RutasModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    ConexionService,
    AutorizacionService,
    JwtHelperService,
    RetornarAccionesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
