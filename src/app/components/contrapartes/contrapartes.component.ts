import { Component, OnInit } from '@angular/core';
import { ContraparteModel } from '../../models/contraparte.model';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contrapartes',
  templateUrl: './contrapartes.component.html',
  styleUrls: ['./contrapartes.component.css']
})
export class ContrapartesComponent implements OnInit {
contraparte: ContraparteModel;
lines: string[];
termino: string;
ventana: boolean;
regex1:boolean;
regex2:boolean;
matricula: any;
nacimiento: any;
edades: string;
ventana2: boolean = false;



  constructor(private router: Router, private userTwo: UserService) { }

  ngOnInit() {
    this.contraparte = new ContraparteModel();
    if(localStorage.getItem('nitContra')){
      this.cargarContraparte(localStorage.getItem('nitContra'));
    }
   
  }

  cargarContraparte(id:string){

    this.userTwo.obtenerContraparteId(id).subscribe((resp:any)=>{
    localStorage.setItem('nitContra', resp.contraparteDB[0][0].contNumeroIdentificacion);
    this.matricula =moment( resp.contraparteDB[1][0].usuaFechaMatricula,'YYYYMMDD').fromNow();
    this.nacimiento =moment( resp.contraparteDB[1][0].usuaFechaNacimiento,'YYYYMMDD').fromNow();
    this.edades = `Matricula: ${this.matricula} Edad: ${this.nacimiento}`
    this.contraparte.contNumeroIdentificacion = resp.contraparteDB[0][0].contNumeroIdentificacion;
    this.contraparte.contNombre= resp.contraparteDB[0][0].contNombre;
    this.contraparte.contOrden= resp.contraparteDB[1][0].usuaOrden;
    this.contraparte.contPagare= resp.contraparteDB[1][0].usuaPagare;
    this.contraparte.contCliente= resp.contraparteDB[1][0].usuaCliente;
    this.contraparte.contProveedor= resp.contraparteDB[1][0].usuaProveedor;
    this.contraparte.contEmpleado= resp.contraparteDB[1][0].usuaEmpleado;
    this.contraparte.contDepartamentos= resp.contraparteDB[1][0].nombreDepartamento;
    this.contraparte.contMunicipios= resp.contraparteDB[1][0].nombreMunicipio;
    this.contraparte.contEmail= resp.contraparteDB[1][0].usuaMail;
    this.contraparte.contObservacion= resp.contraparteDB[0][0].contObservacion;
    
    this.regex1=false;
    this.regex2=false;
    this.ventana = false;
    
             
    })


    

  }

buscarTermino(){

  if(this.termino === ''){
    return;
  }
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:'Buscando Contraparte...'
          
  });
  Swal.showLoading()
  this.userTwo.obtenerTermino(this.termino).subscribe((resp:any)=>{
  
    this.lines = resp.userDB;
    
    switch (resp.userDB.length){
      case 0:
      this.ventana = false;
      this.regex1=false;
      this.regex2=false;
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: 'Contraparte No existe'
      });
      break;
      case 1:
      this.ventana= true;
      this.regex1=true;
      this.regex2=false;
      Swal.close();
      break;
      default:
      this.ventana= true;
      this.regex1=false;
      this.regex2=true;
      Swal.close();
    }

  },err=>{
    console.log(err);
  });
  
}


  onSubmit(form: NgForm){
    if(form.invalid){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: 'Ingrese un Comentario'
      });
      return;}

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text:'Actualizando comentario...'
              
      });
      Swal.showLoading()

      let str = this.contraparte.contObservacion;
      this.contraparte.contObservacion = str.toUpperCase();

    this.userTwo.actualizarContraparte(this.contraparte).subscribe((resp: any)=>{

      Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        text:'Comentario Actualizado'
              
      });

    },err => {
      
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error De Actualización ',
        
      });
  });
   


  }



eliminaContraparte(){
//console.log(id);

Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {

  this.userTwo.eliminarContraparte(this.contraparte).subscribe((resp:any)=>{
    

    if(!resp.ok){

      Swal.fire(
        'Fallo!',
        `Sin respuesta`,
        'error'
      )
      return;
     }



     Swal.fire(
      'Deleted!',
      `Contraparte Inactivo`,
      'success'
    )
  
})
 

})


}
  

cerrarVentana(form: NgForm){
  if(form.invalid){
    Swal.fire({
      allowOutsideClick: true,
      icon: 'error',
      text: 'Ingrese un Número Identificación'
    });
    return;}
  this.ventana2 = !this.ventana2;
  //console.log(this.ventana);
  
}

verHistorial(form: NgForm){
  if(form.invalid){
    Swal.fire({
      allowOutsideClick: true,
      icon: 'error',
      text: 'Ingrese un Número Identificación'
    });
    return;}
  
  this.router.navigate(['/historial', this.contraparte.contNumeroIdentificacion]);
}



}
