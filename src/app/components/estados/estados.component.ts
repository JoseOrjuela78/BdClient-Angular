import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { EstadosModel } from '../../models/estados.model';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {

  activated:Boolean = true;
  estado: EstadosModel;
  nombreEstadoActivo: String;

  constructor(private userservice: UserService, private fileService: FileService) { }

  ngOnInit() {
    this.estado = new EstadosModel();
    this.estado.estadoActivo = true;
    this.CambioNombre(this.estado.estadoActivo);
  }

  EstadoUp(form:NgForm){

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    

    this.userservice.nuevoEstado(this.estado).subscribe(resp=>{
      
      this.estado.estadoId = resp.estado.recordset[0].estadoId;
      
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
    this.nombreEstadoActivo = "Inactivo";
 // console.log('true :',this.nombreEstadoCargo);
  }else{
    this.nombreEstadoActivo = "Activo";
  //  console.log('false :',this.nombreEstadoCargo);
  }
}

BuscarEstado(item:string){

  let itemx = Number(item);

  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:'Espere por favor...'
          
  });
  Swal.showLoading()
  
  this.userservice.obtenerEstadosItem(itemx).subscribe((resp:any)=>{
     
  if(item === '' ){


        Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: `Valor Nulo`,
        
      });

      this.estado.nombreEstado = '';
      this.estado.estadoActivo = false;
      this.CambioNombre(this.estado.estadoActivo)
      return this.activated = true;

     }

  if(resp.estados.length === 0){

    this.estado.nombreEstado = '';
    this.estado.estadoActivo = false;
    this.CambioNombre(this.estado.estadoActivo)
    this.activated = true;
    Swal.fire({
      allowOutsideClick: true,
      icon: 'error',
      title: `No existe Estado Solicidado`,
      
    });

  } else {
    this.estado.estadoId = resp.estados[0].estadoId;
     this.estado.nombreEstado = resp.estados[0].nombreEstado;
     this.estado.estadoActivo = resp.estados[0].estadoActivo;
     this.CambioNombre(this.estado.estadoActivo)
     this.estado._id = resp.estados[0]._id;
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
    this.estado.nombreEstado = '';
    this.estado.estadoActivo = false;
    this.CambioNombre(this.estado.estadoActivo)
    return this.activated = true;
})

}

ActualizarEstado(form:NgForm){

  if(form.invalid){return;}

  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:'Espere por favor...'
          
  });
  Swal.showLoading()
  

  this.userservice.actualizarEstado(this.estado).subscribe((resp: any)=>{
    
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

downloadEstados() {
  this.fileService.downloadFileEstados().subscribe(response => {
    
    let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
    fileSaver.saveAs(blob, 'Estados.txt');
    Swal.close();      
  }), error => console.log('Error downloading the file'),
               () => console.info('File downloaded successfully');
}







}
