import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { TipoIdentificionModel } from '../../models/tiposIdentificacion.model';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-tipos-identificacion',
  templateUrl: './tipos-identificacion.component.html',
  styleUrls: ['./tipos-identificacion.component.css']
})
export class TiposIdentificacionComponent implements OnInit {
  activated:Boolean = true;
  tipoIdentificacion: TipoIdentificionModel;
  nombreEstadoTipoId: String;

  constructor(private userservice: UserService, private fileService: FileService) { }

  ngOnInit() {
    this.tipoIdentificacion = new TipoIdentificionModel();
    this.tipoIdentificacion.estadotipoDocumento = true;
    this.CambioNombre(this.tipoIdentificacion.estadotipoDocumento);
  }

  TipoIdUp(form:NgForm){

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    

    this.userservice.nuevoTipoIdentificacion(this.tipoIdentificacion).subscribe(resp=>{
      
      this.tipoIdentificacion.tipoId = resp.tipoIdentificacion.recordset[0].tipoId;

           
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

  CambioNombre(estado: Boolean){
    if(!estado){
      this.nombreEstadoTipoId = "Inactivo";
   // console.log('true :',this.nombreEstadoCargo);
    }else{
      this.nombreEstadoTipoId = "Activo";
    //  console.log('false :',this.nombreEstadoCargo);
    }
  }

  BuscarTipoIdentificacion(item:string){

  
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    
    this.userservice.obtenerTiposIdentificacionItem(item).subscribe((resp:any)=>{
      
    if(item === '' ){
  
  
          Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: `Valor Nulo`,
          
        });
  
        this.tipoIdentificacion.tipoDocumento = '';
        this.tipoIdentificacion.estadotipoDocumento = false;
        this.CambioNombre(this.tipoIdentificacion.estadotipoDocumento);
  
        return this.activated = true;
  
       }
  
    if(resp.tiposIdentificacion.length === 0){
  
      this.tipoIdentificacion.tipoDocumento = '';
      this.tipoIdentificacion.estadotipoDocumento = false;
      this.CambioNombre(this.tipoIdentificacion.estadotipoDocumento);
      this.activated = true;
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: `No existe Tipo Identificación Solicidado`,
        
      });
  
    } else {
       this.tipoIdentificacion.tipoId = resp.tiposIdentificacion[0].tipoId;
       this.tipoIdentificacion.tipoDocumento = resp.tiposIdentificacion[0].tipoDocumento;
       this.tipoIdentificacion.estadotipoDocumento = resp.tiposIdentificacion[0].estadotipoDocumento;
       this.CambioNombre(this.tipoIdentificacion.estadotipoDocumento);
       this.tipoIdentificacion._id = resp.tiposIdentificacion[0]._id;
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
      this.tipoIdentificacion.tipoDocumento = '';
      this.tipoIdentificacion.estadotipoDocumento = false;
      this.CambioNombre(this.tipoIdentificacion.estadotipoDocumento);
      return this.activated = true;
  })
  
  }

  ActualizarTipoId(form:NgForm){

    if(form.invalid){return;}
  
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    
  
    this.userservice.actualizarTiposIdentificacion(this.tipoIdentificacion).subscribe((resp: any)=>{
      
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

  downloadTipoId() {
    this.fileService.downloadFileTipoId().subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      fileSaver.saveAs(blob, 'TiposIdentificacion.txt');
      Swal.close();      
    }), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }











}
