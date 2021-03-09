import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { TipoSolicitudModel } from '../../models/tiposSolicitud.model';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-tipos-solicitud',
  templateUrl: './tipos-solicitud.component.html',
  styleUrls: ['./tipos-solicitud.component.css']
})
export class TiposSolicitudComponent implements OnInit {
  activated:Boolean = true;
  tipoSolicitud: TipoSolicitudModel;
  nombreEstadoTipoSolicitud: String;

  constructor(private userservice: UserService, private fileService: FileService) { }

  ngOnInit() {
    this.tipoSolicitud = new TipoSolicitudModel();
    this.tipoSolicitud.estadoTipoSolicitud = true;
    this.CambioNombre(this.tipoSolicitud.estadoTipoSolicitud);
  }

  TipoSolicitudUp(form:NgForm){

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    

    this.userservice.nuevoTipoSolicitud(this.tipoSolicitud).subscribe(resp=>{
      //console.log(resp)
      this.tipoSolicitud.tipoSolicitudId = resp.tSolicitud.recordset[0].tipoSolicitudId;;
      
      
      Swal.close();
      return this.activated = false;

    },err => {
      
       Swal.fire({
         allowOutsideClick: true,
         icon: 'error',
         title: 'Error De Creación',
         
       });
   });

    
    
  }

  CambioNombre(estado:Boolean){
    if(!estado){
      this.nombreEstadoTipoSolicitud = "Inactivo";
   // console.log('true :',this.nombreEstadoCargo);
    }else{
      this.nombreEstadoTipoSolicitud = "Activo";
    //  console.log('false :',this.nombreEstadoCargo);
    }
  }


  BuscarTipoSolicitud(item:string){

    let itemx = Number(item);
  
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    
    this.userservice.obtenerTiposSolicitudItem(itemx) .subscribe((resp:any)=>{
       
    if(item === '' ){
  
  
          Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: `Valor Nulo`,
          
        });
  
        this.tipoSolicitud.nombreSolicitud = '';
        this.tipoSolicitud.estadoTipoSolicitud = false;
        this.CambioNombre(this.tipoSolicitud.estadoTipoSolicitud);
        return this.activated = true;
  
       }
  
    if(resp.tiposSolicitud.length === 0){
  
      this.tipoSolicitud.nombreSolicitud = '';
      this.tipoSolicitud.estadoTipoSolicitud = false;
      this.CambioNombre(this.tipoSolicitud.estadoTipoSolicitud);
      this.activated = true;
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: `No existe Tipo Solicidado`,
        
      });
  
    } else {
      this.tipoSolicitud.tipoSolicitudId = resp.tiposSolicitud[0].tipoSolicitudId;
       this.tipoSolicitud.nombreSolicitud = resp.tiposSolicitud[0].nombreSolicitud;
       this.tipoSolicitud.estadoTipoSolicitud = resp.tiposSolicitud[0].estadoTipoSolicitud;
       this.CambioNombre(this.tipoSolicitud.estadoTipoSolicitud)
       this.tipoSolicitud._id = resp.tiposSolicitud[0]._id;
      // console.log(this.cargo)
       Swal.close();
       return this.activated = false;
    }
         
    },(err:any) => {
        
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: `Error de Busqueda`,
        
      });
      this.tipoSolicitud.nombreSolicitud = '';
      this.tipoSolicitud.estadoTipoSolicitud = false;
      this.CambioNombre(this.tipoSolicitud.estadoTipoSolicitud);
      return this.activated = true;
  })
  
  }


  ActualizarTipoSolicitud(form:NgForm){

    if(form.invalid){return;}
  
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    
  
    this.userservice.actualizarTipoSolicitud(this.tipoSolicitud).subscribe((resp: any)=>{
      
      //console.log(resp);
     
      Swal.close();
     
  
    },err => {
      
       Swal.fire({
         allowOutsideClick: true,
         icon: 'error',
         title: `Error De Actualización ${err}`,
         
       });
   });
  
  
  
  }


  downloadTiposSolicitud() {
    this.fileService.downloadFileTipoSolicitud().subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      fileSaver.saveAs(blob, 'TiposDeSolicitud.txt');
      Swal.close();      
    }), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
  













}
