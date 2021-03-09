import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CargosModel } from '../../models/cargos.model';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  activated:Boolean = true;
  cargo: CargosModel;
  nombreEstadoCargo: String;

  constructor(private userservice: UserService, private fileService: FileService) { }

  ngOnInit() {
    this.cargo = new CargosModel();
    this.cargo.estadoCargo = true;
    this.CambioNombre(this.cargo.estadoCargo);
    }

  cargoUp(form:NgForm){

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    

    this.userservice.nuevoCargo(this.cargo).subscribe(resp=>{
      
     this.cargo.cargoId = resp.cargo.recordset[0].cargoId;
      
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
      this.nombreEstadoCargo = "Inactivo";
   // console.log('true :',this.nombreEstadoCargo);
    }else{
      this.nombreEstadoCargo = "Activo";
    //  console.log('false :',this.nombreEstadoCargo);
    }
  }


BuscarCargo(item:string){

  let itemx = Number(item);

  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:'Espere por favor...'
          
  });
  Swal.showLoading()
  
  this.userservice.obtenerCargosItem(itemx) .subscribe((resp:any)=>{
     
  if(item === '' ){


        Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: `Valor Nulo`,
        
      });

      this.cargo.nombreCargo = '';
      this.cargo.estadoCargo = false;
      this.CambioNombre(this.cargo.estadoCargo)
      return this.activated = true;

     }

  if(resp.cargos.length === 0){

    this.cargo.nombreCargo = '';
    this.cargo.estadoCargo = false;
    this.CambioNombre(this.cargo.estadoCargo)
    this.activated = true;
    Swal.fire({
      allowOutsideClick: true,
      icon: 'error',
      title: `No existe Cargo Solicidado`,
      
    });

  } else {
    this.cargo.cargoId = resp.cargos[0].cargoId;
     this.cargo.nombreCargo = resp.cargos[0].nombreCargo;
     this.cargo.estadoCargo = resp.cargos[0].estadoCargo;
     this.CambioNombre(this.cargo.estadoCargo)
     this.cargo._id = resp.cargos[0]._id;
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
    this.cargo.nombreCargo = '';
    this.cargo.estadoCargo = false;
    this.CambioNombre(this.cargo.estadoCargo)
    return this.activated = true;
})

}

ActualizarCargo(form:NgForm){

  if(form.invalid){return;}

  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:'Espere por favor...'
          
  });
  Swal.showLoading()
  
  this.userservice.actualizarCargo(this.cargo).subscribe((resp: any)=>{
    
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

downloadCargos() {
  this.fileService.downloadFileCargos().subscribe(response => {
    
    let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
    fileSaver.saveAs(blob, 'Cargos.txt');
    Swal.close();      
  }), error => console.log('Error downloading the file'),
               () => console.info('File downloaded successfully');
}












}
