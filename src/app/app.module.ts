import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';


import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContrapartesComponent } from './components/contrapartes/contrapartes.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { TableComponent } from './components/table/table.component';
import { HistorialComponent } from './components/historial/historial.component';
import { UsersComponent } from './components/users/users.component';
import { Table2Component } from './components/table2/table2.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { DownloadComponent } from './components/download/download.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { CargosComponent } from './components/cargos/cargos.component';
import { CausalesComponent } from './components/causales/causales.component';
import { EjecutivosComponent } from './components/ejecutivos/ejecutivos.component';
import { EstadosComponent } from './components/estados/estados.component';
import { TiposIdentificacionComponent } from './components/tipos-identificacion/tipos-identificacion.component';
import { TiposSolicitudComponent } from './components/tipos-solicitud/tipos-solicitud.component';
import { CargaMasivaComponent } from './components/carga-masiva/carga-masiva.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent,
    HomeComponent,
    NavbarComponent,
    ContrapartesComponent,
    SolicitudesComponent,
    TableComponent,
    HistorialComponent,
    UsersComponent,
    Table2Component,
    ConsultasComponent,
    DownloadComponent,
    MantenimientoComponent,
    CargosComponent,
    CausalesComponent,
    EjecutivosComponent,
    EstadosComponent,
    TiposIdentificacionComponent,
    TiposSolicitudComponent,
    CargaMasivaComponent,
    CiudadesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
