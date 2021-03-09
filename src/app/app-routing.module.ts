import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { ContrapartesComponent } from './components/contrapartes/contrapartes.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { TableComponent } from './components/table/table.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './components/users/users.component';
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


const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'home/:id', component: HomeComponent, canActivate:[AuthGuard],
  children:[
  {path: 'create', component: CreateComponent},
  {path: 'mantenmiento', component: MantenimientoComponent,
  children:[
  {path:'ciudades', component: CiudadesComponent},
  {path:'cargaMasiva', component: CargaMasivaComponent},
  {path:'cargos', component: CargosComponent},
  {path:'causales', component: CausalesComponent},
  {path:'ejecutivos', component: EjecutivosComponent },
  {path:'estados', component: EstadosComponent },
  {path:'tiposIdentificacion', component: TiposIdentificacionComponent },
  {path:'tiposSolicitud', component: TiposSolicitudComponent },
   ]},

  {path: 'usuarios', component: UsersComponent},
  {path: 'contrapartes', component: ContrapartesComponent},
  {path: 'tabla', component: TableComponent},
  
  {path: 'consultas', component: ConsultasComponent},
  {path: 'download', component: DownloadComponent},
   ]},

  {path: 'historial/:id', component: HistorialComponent},
  {path: 'solicitudes', component: SolicitudesComponent},
  {path: '', pathMatch:'full', redirectTo: 'login'},
  {path: '**', pathMatch:'full', redirectTo: 'login'}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
