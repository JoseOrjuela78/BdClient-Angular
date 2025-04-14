import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {FileUploadModule} from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);


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
import { ViabilidadComponent } from './components/viabilidad/viabilidad.component';
import { ViabRepresentantesComponent } from './components/viab-representantes/viab-representantes.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent, //pagesAdmin
    HomeComponent,
    NavbarComponent,
    ContrapartesComponent,//pagesAnalist
    SolicitudesComponent,//pagesAnalist
    TableComponent,//pagesAnalist
    HistorialComponent,//pagesAnalist
    UsersComponent,//pagesAnalist
    Table2Component,//pagesAnalist
    ConsultasComponent,//pagesAnalist
    DownloadComponent,//pagesAdmin
    MantenimientoComponent,//pagesAdmin
    CargosComponent,//pagesAdmin
    CausalesComponent,//pagesAdmin
    EjecutivosComponent,//pagesAdmin
    EstadosComponent,//pagesAdmin
    TiposIdentificacionComponent,//pagesAdmin
    TiposSolicitudComponent,//pagesAdmin
    CargaMasivaComponent,//pagesAdmin
    CiudadesComponent, 
    ViabilidadComponent,
    ViabRepresentantesComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FileUploadModule
   
    
    
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
