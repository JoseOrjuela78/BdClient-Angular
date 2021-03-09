import { Component, OnInit, Input } from '@angular/core';
import { SolicitudModel } from '../../models/solicitud.model';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import {formatCurrency, getCurrencySymbol} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  @Input() solicitudId: string;
  @Input() contraparteId:string;
  @Input() razonSocialId:string;
  solicitud: SolicitudModel;
  ejecutivos: String[];
  tiposSolicitud: String[];
  estados: String[];
  causales: String[];
  now: any;
  cantidad: string;
  consecutivo: string;
  estadoUser: boolean;
  razonSocial: string;
  nit: string;

  constructor( private userSix: UserService) { }

  ngOnInit() {
     //Inicia objeto solicitud
    this.solicitud = new SolicitudModel();

    // obtiene lista de ejecutivos
    this.userSix.obtenerEjecutivosTrue().subscribe((resp:any)=>{
       this.ejecutivos = resp.ejecutivos;
    });

     // obtiene lista de tipos de solicitud
     this.userSix.obtenerTipoSolicitud().subscribe((resp:any)=>{
        this.tiposSolicitud =  resp.tiposSolicitud;
   });

     // obtiene lista de estados
     this.userSix.obtenerEstados().subscribe((resp:any)=>{
     this.estados = resp.estados;
 });

      // obtiene lista de causales
      this.userSix.obtenerCausales().subscribe((resp:any)=>{
         this.causales = resp.causales;
       
    });

    // obtiene datos por solicitud
    
    this.cargarSolicitud(this.solicitudId);
     
    
  }




  updateValue(value: string) {
    let val = parseInt(value, 10);
    if (Number.isNaN(val)) {
    this.cantidad = value
    //console.log('no es numero',this.cantidad);
     } else {
    this.cantidad = formatCurrency(val, 'en-US', getCurrencySymbol('USD', 'wide'));
    //console.log('es un numero',this.cantidad)
     }
}







  solicitudUp(form: NgForm){
    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()

    this.solicitud.contNumeroIdentificacion = this.contraparteId;
    let str = this.solicitud.soliComentarios;
    this.solicitud.soliComentarios = this.encodedSTR(str.toUpperCase());
    
     
    this.userSix.nuevaSolicitud(this.solicitud).subscribe((resp:any)=>{
 
    this.cargarSolicitud(resp.solicitud.soliConsecutivo);
      

    Swal.close();
    return this.estadoUser = false;
    
  },err=>{
    //console.log(err);
    Swal.fire({
      allowOutsideClick: true,
      icon: 'error',
      title: 'Error De Creación',
      
    });
    return this.estadoUser = true;
  })

  
  }


actualizaSolicitud(form: NgForm){
  if(form.invalid){return;}
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:'Actualizando Solicitud...'
          
  });
  Swal.showLoading()

  let str = this.solicitud.soliComentarios;
  this.solicitud.soliComentarios = this.encodedSTR(str.toUpperCase());

  

  this.userSix.actualizarSolicitud(this.solicitud).subscribe((resp:any)=>{

  this.cargarSolicitud(this.consecutivo);
  
    Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        text: resp.message
              
      });
      return this.estadoUser = false;
  },err => {
      
    Swal.fire({
      allowOutsideClick: true,
      icon: 'error',
      title: `Error De Actualización: ${err}`,
      
    });
    return;
});
}


cargarSolicitud(solicitudId: string){

  this.userSix.obtenerSolicitud(solicitudId).subscribe((resp:any)=>{

    this.razonSocial = this.razonSocialId;
    this.nit = resp.solicitud.contNumeroIdentificacion;
    this.solicitud = resp.solicitud;
    this.consecutivo = resp.solicitud.soliConsecutivo;
    this.solicitud.soliConsecutivo = resp.solicitud.soliConsecutivo
    this.solicitud.IdEjecutivo = resp.solicitud.ejecutivoId;
    this.solicitud.IdSolicitud = resp.solicitud.tipoSolicitudId;
    this.now =moment(resp.solicitud.soliFechaExpedicionCcio).format('YYYY-MM-DD');
    this.solicitud.soliFechaExpedicionCcio = this.now;
    this.solicitud.soliCupoActual = resp.solicitud.soliCupoActual;
    this.solicitud.soliCupoSolicitado = resp.solicitud.soliCupoSolicitado;
    this.now =moment(resp.solicitud.soliFechaRadicacion).format('YYYY-MM-DD');
    this.solicitud.soliFechaRadicacion = this.now;
    this.now =moment(resp.solicitud.soliFechaSolucion).format('YYYY-MM-DD');
    this.solicitud.soliFechaSolucion = this.now;
    this.solicitud.soliCupoAprobado = resp.solicitud.soliCupoAprobado;
    this.solicitud.soliCupoAsignado = resp.solicitud.soliCupoAsignado;
    this.now =moment(resp.solicitud.soliFechaEnvioPagare).format('YYYY-MM-DD');
    this.solicitud.soliFechaEnvioPagare = this.now;
    this.now =moment(resp.solicitud.soliFechaRecibidoPagare).format('YYYY-MM-DD');
    this.solicitud.soliFechaRecibidoPagare = this.now;
    this.solicitud.IdEstado = resp.solicitud.estadoId;
    this.solicitud.IdCausal = resp.solicitud.causalId;
    this.solicitud.soliComentarios = resp.solicitud.soliComentarios;
   // console.log(this.solicitud);
    return this.estadoUser = false;

  },err=>{
    //console.log(err);
    return this.estadoUser = true;
  });






}























encodedSTR (str:string) {
  return encodeURIComponent(str).replace('&',escape);
}


}
