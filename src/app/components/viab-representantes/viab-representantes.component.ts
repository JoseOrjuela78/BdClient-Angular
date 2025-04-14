import { Component, OnInit, Input } from '@angular/core';
import { viabRepresentanteModel } from '../../models/viabRepresentante.model ';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { retry } from 'rxjs/operators';


@Component({
  selector: 'app-viab-representantes',
  templateUrl: './viab-representantes.component.html',
  styleUrls: ['./viab-representantes.component.css']
})
export class ViabRepresentantesComponent implements OnInit {

@Input() viabConsecutivo: String;
@Input() viabNumeroIdentificacion: string;
repViab: viabRepresentanteModel;
lines: String[];
lines2: String[];
buttons: Boolean = false;
representantes: any[];

  constructor(private userone: UserService) { }

  ngOnInit() {
   
  
    this.repViab = new viabRepresentanteModel();
    
    this.resetFormat();

   
;
// obtener tipos de documentos
    this.userone.obtenerTiposIdentificacion().subscribe((resp:any) =>{
      this.lines = resp.tiposIdentificacion;
        })

// obtener cargos
this.userone.obtenerCargos().subscribe((resp:any) =>{
   this.lines2 = resp.cargos;
    })

// obtener representantes

this.getViabRepresentantes(this.viabConsecutivo);
    
 
  }

compliance(repViab: viabRepresentanteModel){


  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:'Validando identificacion...'
          
  });
  Swal.showLoading()


  this.userone.nuevoCompliance3(repViab).subscribe(resp =>{



    if(resp.resultado.presentaRiesgo === undefined){
      
      Swal.fire({
  
        icon: 'error',
        title: `Error tipo documento y/o número identificación`,
        showConfirmButton: true,

      })

      return this.buttons = false;

      
     }else {
      
      this.repViab.reprNombre = resp.resultado.nombre;
      this.repViab.reprEnRiesgo = resp.resultado.presentaRiesgo;
      this.repViab.reprComentarios = resp.resultado.resultados;
      
        

     }
     
     this.buscarBdClient(this.repViab.reprIdentificacion);

     Swal.fire({
  
      icon: 'success',
      title: 'Por favor valide razon social ...',
      showConfirmButton: false,
      timer: 2000
    })

     
      return;


  });


  
}



buscarBdClient(nit:string){

  this.userone.obtenerUser(nit).subscribe((resp: any) =>{

   
    if(resp.user.length === 1){

      this.repViab.reprExisteEpicor = true;

    }else {
      this.repViab.reprExisteEpicor = false;
    }

    this.buttons = true;

    
  });
}







consultarData(form:NgForm){

  if(form.invalid){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe completar cargo,tipo e identificacion..',
      
    })
    return;}

  this.repViab.viabConsecutivo = this.viabConsecutivo;
  this.repViab.viabNumeroIdentificacion = this.viabNumeroIdentificacion;
  this.repViab.reprId = `${this.viabConsecutivo}${this.repViab.reprIdentificacion}`;

  this.compliance(this.repViab);
 

 return;


}



upRepViab(form:NgForm){

  if(form.invalid){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe completar cargo,tipo e identificacion..',
      
    })
    return;}

  this.userone.nuevoViabRepresentante(this.repViab).subscribe(resp=>{

  this.getViabRepresentantes(this.viabConsecutivo);
  this.resetFormat();
 

 });

 return;
  
}


getViabRepresentantes(consecutivo:String){

  if(consecutivo === "" || consecutivo === undefined || consecutivo === '0'){
    return;
  }

  this.userone.obtenerViabRepConsecutivo(consecutivo).subscribe((resp:any)=>{

    this.representantes = resp.data.recordset;
   

  })

  return;

}


eliminarViabRep(id:String){

  this.userone.eliminarViabRep(id).subscribe((resp:any)=>{
    this.getViabRepresentantes(this.viabConsecutivo);
    
  });

}


resetFormat(){

  this.repViab.reprId = "";
  this.repViab.viabConsecutivo = "";
  this.repViab.viabNumeroIdentificacion="";
  this.repViab.tipoIdentificacion= "";
  this.repViab.reprIdentificacion= "";
  this.repViab.reprNombre= "";
  this.repViab.cargoId = 0;
  this.repViab.reprEnRiesgo = false;
  this.repViab.reprExisteEpicor = false;
  this.repViab.reprComentarios ="";
  this.buttons = false;

}








}
