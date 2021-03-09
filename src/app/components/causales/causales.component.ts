import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CausalesModel } from '../../models/causales.model';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-causales',
  templateUrl: './causales.component.html',
  styleUrls: ['./causales.component.css']
})
export class CausalesComponent implements OnInit {

  activated:Boolean = true;
  causal: CausalesModel;
  nombreEstadoCausal: String;

  constructor(private userservice: UserService, private fileService: FileService) { }

  ngOnInit() {
    this.causal = new CausalesModel();
    this.causal.estadoCausal = true;
    this.CambioNombre(this.causal.estadoCausal);
  }

  causalUp(form:NgForm){

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    

    this.userservice.nuevoCausal(this.causal).subscribe(resp=>{
      
      this.causal.causalId = resp.causal.recordset[0].causalId;
      
     
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
      this.nombreEstadoCausal = "Inactivo";
   // console.log('true :',this.nombreEstadoCargo);
    }else{
      this.nombreEstadoCausal = "Activo";
    //  console.log('false :',this.nombreEstadoCargo);
    }
  }

  BuscarCausal(item:string){

    let itemx = Number(item);
  
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    
    this.userservice.obtenerCausalItem(itemx) .subscribe((resp:any)=>{
       
    if(item === '' ){
  
  
          Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: `Valor Nulo`,
          
        });
  
        this.causal.nombreCausal = '';
        this.causal.estadoCausal = false;
        this.CambioNombre(this.causal.estadoCausal);
       
  
        return this.activated = true;
  
       }
  
    if(resp.causales.length === 0){
  
      this.causal.nombreCausal = '';
      this.causal.estadoCausal = false;
      this.CambioNombre(this.causal.estadoCausal);
      this.activated = true;
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: `No existe Causal Solicidado`,
        
      });
  
    } else {
      this.causal.causalId = resp.causales[0].causalId;
       this.causal.nombreCausal = resp.causales[0].nombreCausal;
       this.causal.estadoCausal = resp.causales[0].estadoCausal;
       this.CambioNombre(this.causal.estadoCausal);
       this.causal._id = resp.causales[0]._id;
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
      this.causal.nombreCausal = '';
      this.causal.estadoCausal = false;
      this.CambioNombre(this.causal.estadoCausal);
      return this.activated = true;
  })
  
  }

  ActualizarCausal(form:NgForm){

    if(form.invalid){return;}
  
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    
  
    this.userservice.actualizarCausal(this.causal).subscribe((resp: any)=>{
      
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
  
downloadCausales() {
  this.fileService.downloadFileCausales().subscribe(response => {
    
    let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
    fileSaver.saveAs(blob, 'Causales.txt');
    Swal.close();      
  }), error => console.log('Error downloading the file'),
               () => console.info('File downloaded successfully');
}






}
