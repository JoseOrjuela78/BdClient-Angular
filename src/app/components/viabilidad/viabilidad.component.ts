import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ViabilidadModel } from '../../models/viabilidad.model';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { TipoIdentificionModel } from '../../models/tiposIdentificacion.model';

const uri = 'http://localhost:3000/uploads'; 

@Component({
  selector: 'app-viabilidad',
  templateUrl: './viabilidad.component.html',
  styleUrls: ['./viabilidad.component.css']
})
export class ViabilidadComponent implements OnInit {

  viab: ViabilidadModel;
  lines: String[];
  ciiu:String[];
  nombreUsuario: string;
  addDatosPrincipales: Boolean = true;
  addRepresentantes: Boolean = false;
  buttom: Boolean = true;
  buttom2: Boolean = false;
  activarViabilidad:Boolean = false;
 
 
   
  

  constructor(private userViab: UserService) {

 
   }

  ngOnInit() {
   
   
   this.viab = new ViabilidadModel();
   this.resetViab();
  //obtener nombre usuario

  this.nombreUsuario = localStorage.getItem('nombreUsuario');
  
  // obtener tipos de documentos
  this.userViab.obtenerTiposIdentificacion().subscribe((resp:any) =>{
  this.lines = resp.tiposIdentificacion;
    })

    // obtener ciiu
  this.userViab.obtenerCIIU().subscribe((resp:any) =>{
  this.ciiu = resp.ciiu;
    })
  
  
  }



  getViabilidad(){

    if(this.viab.viabNumeroIdentificacion === ''){

      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Consultando informacion...'
            
    });
    Swal.showLoading()

    this.userViab.obtenerViabilidadNit(this.viab.viabNumeroIdentificacion).subscribe((resp:any)=>{

      let data = resp.data.recordset.length;
      

      if(data === 0){
        Swal.close(); 
        return;

      } else {
      
        let fechaConsulta = moment(resp.data.recordset[0].viabFecha).format('MMMM Do YYYY');
      let consultadoPor = resp.data.recordset[0].viabNombreEjecutivo;
      let viabilidad = resp.data.recordset[0];
         

        Swal.fire({
          title: `Consultado ${fechaConsulta}`,
          text: `por ${consultadoPor}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ver informe'
        }).then((result) => {
          if (result.value) {

            this.cargarViavilidad(viabilidad);
            this.activarRepresentantes(resp.data.recordset[0].tipoIdentificacion, false);
                     
         
            Swal.fire(
              'Cargado!',
              'Informe listo',
              'success'
            )
          }
        })
         
         
     return;

      }

           
    });


  }



  compliance(){

          
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Validando identificacion...'
            
    });
    Swal.showLoading()

    
        
    this.userViab.nuevoCompliance2(this.viab).subscribe((resp:any) =>{

    
    if(resp.resultado.presentaRiesgo === undefined){
      
      Swal.fire({
  
        icon: 'error',
        title: `Error tipo documento y/o número identificación`,
        showConfirmButton: true,

      })

      return;

      
     }else {
      
      this.viab.viabRazonSocial = resp.resultado.nombre;
      this.viab.viabEnRiesgo = resp.resultado.presentaRiesgo;
      this.viab.viabComentariosListas = `${ resp.resultado.idConsulta} ${resp.resultado.resultados}`;
        

     }

     this.EpicorSolunion(this.viab.viabNumeroIdentificacion);


     Swal.fire({
  
      icon: 'success',
      title: 'Por favor valide razon social ...',
      showConfirmButton: false,
      timer: 2000
    })




      
      return;
      
    })
  }



  EpicorSolunion(id:string){


    this.userViab.obtenerContraparteId(id).subscribe((resp:any)=>{

      let data = resp.contraparteDB[0][0];

           
     if(resp.contraparteDB[0].length === 0 || data.contExisteEpicor === 0 || data.contExisteEpicor === null){

      

      this.upViabilidad(this.viab);

       return;

       
     }

         
      this.viab.viabCupoActual = data.contCupoSolunion;
      this.viab.viabCupoAsignado = data.contCupoVigente;
      this.viab.viabExisteEpicor = data.contExisteEpicor;
      this.viab.viabResponsableEpicor = data.contEjecutivoEpicor;
      
      
      
      let currently = moment(data.contFechaActuactualizacionEpicor);
      let now =moment(this.viab.viabFecha).diff(currently,'days');
      this.viab.viabActualizado = (now / 335) >= 1;
       
      this.upViabilidad(this.viab);
      
      return;

    });



  };



upViabilidad = (viabilidad: ViabilidadModel)=>{

  

  this.userViab.nuevaViabilidad(viabilidad) .subscribe((resp:any) =>{
    this.viab.viabConsecutivo = resp.data.recordset[0].viabConsecutivo;
    this.viab.viabComentariosViabilidad = resp.data.recordset[0].viabComentariosViabilidad;

    this.activarRepresentantes(resp.data.recordset[0].tipoIdentificacion, true);

          
    })

}




  resetViab(){

    this.viab.viabConsecutivo= '0';
    this.viab.viabFecha =  moment().format('YYYY-MM-DD');
    this.viab.IdEjecutivo = '';
    this.viab.tipoIdentificacion = '';
    this.viab.viabNumeroIdentificacion ='';
    this.viab.viabRazonSocial ='';
    this.viab.viabFechaMatricula = '' ;
    this.viab.viabAnoRenovado= 1900;
    this.viab.viabEnRiesgo = false; 
    this.viab.viabExisteEpicor= false;
    this.viab.viabActualizado = false; 
    this.viab.viabCupoActual = '0';
    this.viab.viabCupoAsignado  ='0'; 
    this.viab.viabViable = false;
    this.viab.viabComentariosViabilidad = "Sin comentarios";
    this.viab.viabComentariosListas = "Sin comentarios";
    this.viab.viabCIIU = '';
    this.viab.viabRevisado = false;
    this.viab.viabResponsableEpicor ='';
    this.viab.viabNombreEjecutivo = '';
    this.buttom = true;
    this.buttom2 = false;
    this.addRepresentantes = false;
    this.activarViabilidad = false;
    this.addDatosPrincipales = true;
  }


  cargarViavilidad(viab : any){

    this.viab.viabConsecutivo= viab.viabConsecutivo;
    this.viab.viabFecha =  moment(viab.viabFecha).format('YYYY-MM-DD');
    let date = new Date(viab.viabFecha).getMonth();
    this.viab.IdEjecutivo = viab.IdEjecutivo;
    this.viab.tipoIdentificacion = viab.tipoIdentificacion;
    this.viab.viabNumeroIdentificacion = viab.viabNumeroIdentificacion;
    this.viab.viabRazonSocial = viab.viabRazonSocial;
    this.viab.viabFechaMatricula = moment(viab.viabFechaMatricula).format('YYYY-MM-DD');
    this.viab.viabAnoRenovado= viab.viabAnoRenovado;
    this.viab.viabEnRiesgo = viab.viabEnRiesgo; 
    this.viab.viabExisteEpicor= viab.viabExisteEpicor;
    this.viab.viabActualizado = viab.viabActualizado; 
    this.viab.viabCupoActual = viab.viabCupoActual;
    this.viab.viabCupoAsignado  = viab.viabCupoAsignado; 
    this.viab.viabViable = viab.viabViable;
    this.viab.viabComentariosViabilidad = viab.viabComentariosViabilidad;
    this.viab.viabComentariosListas = viab.viabComentariosListas;
    this.viab.viabCIIU = viab.viabCIIU;
    this.viab.viabRevisado = viab.viabRevisado;
    this.viab.viabResponsableEpicor = viab.viabResponsableEpicor;
    this.viab.viabNombreEjecutivo = viab.viabNombreEjecutivo;
    this.buttom = false;
  }


  sumit(form:NgForm){

  if(form.invalid){return;}

  //this.userViab.obtenerViabRepConsecutivo(this.viab.viabConsecutivo);

     this.compliance();
  

   return;

  }


  actualizarViabilidad(){
   

this.userViab.obtenerViabRepConsecutivo(this.viab.viabConsecutivo).subscribe((resp:any)=>{
  

  if(resp.data.recordset.length > 0){
    
    if(!this.viab.viabEnRiesgo){

      this.viab.viabEnRiesgo = resp.data.recordset.reprEnRiesgo
      
    }

  this.userViab.actualizarViabilidad(this.viab).subscribe((resp:any)=>{


    this.addDatosPrincipales = false;
    this.addRepresentantes = false;
    this.activarViabilidad = true;
    this.buttom = false;
    this.buttom2 = false;
    
    return;

  });

  return;
   
  }else{

    Swal.fire(

      'Por favor agregar representantes y accionistas',
    
   )
         
         return;

  }

  

});

    
    
  }




  activarRepresentantes(tipo:String, nuevo: Boolean){

    this.buttom = false;

    

    if(tipo === "nit " && nuevo === true){

      this.addDatosPrincipales = true;
      this.addRepresentantes = true;
      this.activarViabilidad = false;
      this.buttom2 = true;

       
Swal.fire(

   'Por favor agregar representantes y accionistas',
 
)
      
      return;

    }else if(tipo === "nit " && nuevo === false){

    
      this.addDatosPrincipales = false;
      this.addRepresentantes = false;
      this.activarViabilidad = true;
      this.buttom2 = false;

      return;
           
    } else {

      this.addDatosPrincipales = false;
      this.addRepresentantes = false;
      this.activarViabilidad = true;
      this.buttom2 = false;
      return;

    }

 

  }














}
