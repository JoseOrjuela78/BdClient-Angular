import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { EjecutivosModel } from '../../models/ejecutivos.model';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-ejecutivos',
  templateUrl: './ejecutivos.component.html',
  styleUrls: ['./ejecutivos.component.css']
})
export class EjecutivosComponent implements OnInit {
  activated:Boolean = true;
  ejecutivo: EjecutivosModel;
  nombreEstadoEjecutivo: String;
  constructor(private userservice: UserService, private fileService: FileService) { }

  ngOnInit() {
    this.ejecutivo = new EjecutivosModel();
    this.ejecutivo.ejecActivo = true;
    this.CambioNombre(this.ejecutivo.ejecActivo);
  }

  EjecutivoUp(form:NgForm){

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    

    this.userservice.nuevoEjecutivo(this.ejecutivo).subscribe(resp=>{
      //console.log(resp)
      this.ejecutivo.ejecutivoId = resp.ejecutivo.recordset[0].ejecutivoId;
     
  
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
      this.nombreEstadoEjecutivo = "Inactivo";
   // console.log('true :',this.nombreEstadoCargo);
    }else{
      this.nombreEstadoEjecutivo = "Activo";
    //  console.log('false :',this.nombreEstadoCargo);
    }
  }

  BuscarEjecutivo(item:string){

    let itemx = Number(item);
  
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    
    this.userservice.obtenerEjecutivosItem(itemx) .subscribe((resp:any)=>{
       
    if(item === '' ){
  
  
          Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: `Valor Nulo`,
          
        });
  
        this.ejecutivo.nombreEjecutivo = '';
        this.ejecutivo.ejecActivo = false;
        this.CambioNombre(this.ejecutivo.ejecActivo);
  
        return this.activated = true;
  
       }
  
    if(resp.ejecutivos.length === 0){
  
      this.ejecutivo.nombreEjecutivo = '';
      this.ejecutivo.ejecActivo = false;
      this.CambioNombre(this.ejecutivo.ejecActivo);
      this.activated = true;
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: `No existe Ejecutivo Solicidado`,
        
      });
  
    } else {
       this.ejecutivo.ejecutivoId = resp.ejecutivos[0].ejecutivoId;
       this.ejecutivo.nombreEjecutivo = resp.ejecutivos[0].nombreEjecutivo;
       this.ejecutivo.ejecActivo = resp.ejecutivos[0].ejecActivo;
       this.CambioNombre(this.ejecutivo.ejecActivo);
       this.ejecutivo._id = resp.ejecutivos[0]._id;
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
      this.ejecutivo.nombreEjecutivo = '';
      this.ejecutivo.ejecActivo = false;
      this.CambioNombre(this.ejecutivo.ejecActivo);
      return this.activated = true;
  })
  
  }

  ActualizarEjecutivo(form:NgForm){

    if(form.invalid){return;}
  
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    
  
    this.userservice.actualizarEjecutivo(this.ejecutivo).subscribe((resp: any)=>{
      
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

  downloadEjecutivos() {
    this.fileService.downloadFileEjecutivos().subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      fileSaver.saveAs(blob, 'Ejecutivos.txt');
      Swal.close();      
    }), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }











}
