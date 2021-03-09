import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: UserModel;
  lines: String[];
  dptos: String[];
  dpto: String;
  municipios: String[];
  now: any;
  today: any;
  estadoUser: Boolean;
  totalSolicitudes: Number;
  totalRepresentantes: Number;
  ventana: Boolean = false;
  

  @Input() nit: String;

  constructor(private userOne: UserService) { 
    
  }

  ngOnInit() {

    this.today = moment().format('YYYY-MM-DD');
    
    
    if(localStorage.getItem('idUser')){
      this.cargarUser(localStorage.getItem('idUser'));
    }

    
    if(this.nit === undefined){
    this.nit = '';
    }else{
    this. obtenerUser(this.nit);
    }

     this.user = new UserModel();
     
    
     // obtener tipos de documentos
     this.userOne.obtenerTiposIdentificacion().subscribe((resp:any) =>{
      this.lines = resp.tiposIdentificacion;
      })
      //obtener departamentos
      this.userOne.obtenerDepartamentos().subscribe((resp:any) =>{
        this.dptos = resp.departamentos;
      })

    

  }

  compliance(){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Consultando compliance...'
            
    });
    Swal.showLoading()

    
    let str1 = this.user.usuaObservacion;
    this.user.usuaObservacion = "";
    this.userOne.nuevoCompliance(this.user).subscribe((resp:any) =>{
     console.log(resp);

    if(resp.resultado.presentaRiesgo === undefined){
      
      Swal.fire({
  
        icon: 'error',
        title: `${resp.resultado}`,
        showConfirmButton: true,

      })

      
     }else if (resp.resultado.presentaRiesgo){
      
      this.user.usuaRazonSocial = resp.resultado.nombre;
      this.user.usuaObservacion = str1 + resp.resultado.resultados;

      Swal.fire({
  
        icon: 'warning',
        title: 'Usuario presenta riesgo debe consultar manualmente ...',
        showConfirmButton: true
        
      })

     }else {
             
      this.user.usuaRazonSocial = resp.resultado.nombre;
      this.user.usuaObservacion = str1 + " Usuario no presenta riesgo";

      Swal.fire({
  
        icon: 'success',
        title: 'Usuario no presenta riesgo ...',
        showConfirmButton: false,
        timer: 2000
      })

     };
      
      return;
      
    })
  }

  obtenerMunicipios(dpto:String){
   
    this.userOne.obtenerMunicipios(dpto).subscribe((resp:any) =>{
      this.municipios = resp.municipios;
      
      
    })

  }

  obtenerUser(nit:String){

    if(nit === ""){
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Buscando Usuario...'
            
    });
    Swal.close();
    Swal.showLoading()

   this.cargarUser(nit);
  }




  userUp(form:NgForm){
    
    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()
    
    
    let str = this.user.usuaRazonSocial;
    this.user.usuaRazonSocial = this.encodedSTR(str.toUpperCase());
    str = this.user.usuaObservacion;
    this.user.usuaObservacion = this.encodedSTR(str.toUpperCase());

if(this.user.usuaFechaMatricula === null && this.user.usuaFechaNacimiento === null){

  this.user.usuaFechaMatricula = this.today;
  this.user.usuaFechaNacimiento = this.today;

  
} else if (this.user.usuaFechaMatricula === null){

  this.user.usuaFechaMatricula = this.user.usuaFechaNacimiento;
  
} else {

  this.user.usuaFechaNacimiento = this.user.usuaFechaMatricula;
  
}


        
    this.userOne.nuevoUser(this.user).subscribe(resp=>{
    
    this.obtenerUser(this.user.usuaNumeroIdentificacion);
     
    localStorage.setItem('idUser', resp.userDB.recordset[0].usuaNumeroIdentificacion);
      Swal.close();

      return this.estadoUser = true;

    },err => {
      
       Swal.fire({
         allowOutsideClick: true,
         icon: 'error',
         title: 'Debe Completar Formulario',
         
       });
   });
    
    
  }



  actualizaUser(form:NgForm){
    if(form.invalid){return;}

   Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Actualizando Usuario...'
            
    });
    Swal.showLoading()

    let str = this.user.usuaRazonSocial;
    this.user.usuaRazonSocial = this.encodedSTR(str.toUpperCase());
    str = this.user.usuaObservacion;
    this.user.usuaObservacion = this.encodedSTR(str.toUpperCase());
    

    this.userOne.actualizarUser(this.user).subscribe((resp:any)=>{
      this.obtenerUser(this.user.usuaNumeroIdentificacion);
    Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        text: resp.message
              
      });
        
   
        return this.estadoUser = true;
      
     
     
    },err => {
      
       Swal.fire({
         allowOutsideClick: true,
         icon: 'error',
         title: `Error De Actualización: ${err}`,
         
       });
   });
    
    
  }




  eliminaUser(){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

      this.userOne.eliminarUser(this.user).subscribe((resp:any) =>{
          if(!resp.ok){

            Swal.fire(
              'Fallo!',
              `${resp.message}`,
              'error'
            )
            return this.estadoUser = true;

          }
          
          this.user.escontraparte = false;
          this.user.esPEP = false;
          this.user.usuaRazonSocial = " ";
          this.user.tipoIdentificacion = " ";
          this.user.usuaFechaMatricula = null;
          this.user.usuaFechaNacimiento = null;
          this.user.usuaCIIU = " ";
          this.user.usuaOrden = " ";
          this.user.usuaPagare = false;
          this.user.usuaCliente = false;
          this.user.usuaProveedor = false;
          this.user.usuaEmpleado = false;
          this.user.departamento = " ";
          this.user.municipios = " ";
          this.user.usuaMail = " ";
          this.user.usuaObservacion = " ";
         
          Swal.fire(
            'Deleted!',
            `${resp.message}`,
            'success'
          )

          return this.estadoUser = false;
          
        })

        }
    })


  }
  

  contraparteUp(user:UserModel){
    this.userOne.nuevoContraparte(user).subscribe(resp=>{
      console.log(resp)
    })
  }

  cerrarVentana(form:NgForm){

    if(form.invalid){
      
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: 'Ingrese un Número Identificación'
      });

      return;}

    this.ventana = !this.ventana;
    //console.log(this.ventana);
    
  }

  cargarUser(nit:String){
    
    this.userOne.obtenerUser(nit).subscribe((resp:any) =>{
      
      if(this.user.usuaNumeroIdentificacion === ''){
        return;
      }

     
      if(resp.user.length === 1){

        localStorage.setItem('idUser', resp.user[0].usuaNumeroIdentificacion);
        this.user = resp.user[0];
        this.user.escontraparte = resp.user[0].escontraparte;
        this.user.esPEP = resp.user[0].usuaPEP;
        this.user.usuaRazonSocial = resp.user[0].usuaRazonSocial;
        this.user.tipoIdentificacion= resp.user[0].tipoId;
        this.now =moment(resp.user[0].usuaFechaMatricula).format('YYYY-MM-DD');
        this.user.usuaFechaMatricula = this.now;
        this.now =moment(resp.user[0].usuaFechaNacimiento).format('YYYY-MM-DD');
        this.user.usuaFechaNacimiento = this.now;
        this.user.usuaCIIU = resp.user[0].usuaCIIU;
        this.user.usuaOrden = resp.user[0].usuaOrden;
        this.user.usuaPagare = resp.user[0].usuaPagare;
        this.user.usuaCliente = resp.user[0].usuaCliente;
        this.user.usuaProveedor = resp.user[0].usuaProveedor;
        this.user.usuaEmpleado = resp.user[0].usuaEmpleado;
        this.user.departamento = resp.user[0].departamentoId;
        this.obtenerMunicipios(resp.user[0].departamentoId);
        this.user.municipios = resp.user[0].municipioId;
        this.user.usuaMail = resp.user[0].usuaMail;
        this.user.usuaObservacion = resp.user[0].usuaObservacion;
     
              
        Swal.close();
        return this.estadoUser = true;
        
        
      }else{

        this.user.escontraparte = false;
        this.user.esPEP = false;
        this.user.usuaRazonSocial = " ";
        //this.user.tipoIdentificacion = " ";
        this.user.usuaFechaMatricula = null;
        this.user.usuaFechaNacimiento = null;
        this.user.usuaCIIU = " ";
        this.user.usuaOrden = " ";
        this.user.usuaPagare = false;
        this.user.usuaCliente = false;
        this.user.usuaProveedor = false;
        this.user.usuaEmpleado = false;
        this.user.departamento = " ";
        this.user.municipios = " ";
        this.user.usuaMail = " ";
        this.user.usuaObservacion = " ";

          Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          text: 'Usuario No existe'
        }); 
        
        
     // console.log('limpiar formulario')
      return this.estadoUser = false;
      }
      
    })

  }


  encodedSTR (str:string) {
    return encodeURIComponent(str).replace('&',escape);
  }




  

 

 

}
