import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

contraparteId :string;
nombreContraparte:string;
nitContraparte:string;
solicitudes: any[];
segmento = new Array();
titles:String [] =['Fecha','#','Solicitud','Ejecutivo','Inicial','Solicitado','Aprobado','Estado','Causal','Tools'];
solicitud: boolean = false;
solicitudId: string;
lector: Boolean = false;
items: Number;
mostrando: number;
totalSolicitudes: number;
desde: number = 0;
backDesde: number;
backHasta: number;
backMostrando: number;
hasta: number = 0;
btnUp: boolean = false;
btnBack: boolean = true;


  constructor(private router:ActivatedRoute ,private userFive: UserService) { 
  this.router.params.subscribe(params=>{
  this.contraparteId = params['id'];
 
 
    });
  }

  ngOnInit() {
  
    this.obtenerListaSolicitudes(this.contraparteId);

     
  }

  obtenerListaSolicitudes(idContraparte:string){

      
    this.userFive.obtenerSolicitudes(idContraparte).subscribe((resp:any)=>{
      
     if(resp.solicitudes.length === 0){
        this.lector = false;
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          text: 'Contraparte Sin Historial'
        });
        return;

      } else {
        
      
      this.mostrando = resp.total;
      this.totalSolicitudes = resp.solicitudes.length;
      this.nitContraparte = resp.solicitudes[0].contNumeroIdentificacion;
      this.nombreContraparte = resp.solicitudes[0].contNombre;
      this.solicitudes = resp.solicitudes;
      

       if(this.mostrando > 5){

        this.btnUp = true;
        this.btnBack = false;
        
        for(this.desde;this.desde < 5; this.desde++){

          this.segmento.push(this.solicitudes[this.desde])
          

        }
        
            
      } else {
        
        if (this.segmento.length > 0){

          this.segmento.length = 0;

        };

        this.btnUp = false;
        this.btnBack = false;
        this.segmento = this.solicitudes;
        
        
      }

       this.mostrando = this.segmento.length;
        //console.log(this.segmento);
        //console.log(this.desde);
        return this.lector = true;
            
        
      }
      

          
    });

  }






  abrirSolicitud( solId: string){
    this.solicitud = !this.solicitud;
    this.solicitudId = solId;
    
   
}

  
  cerrarSolicitud(){
  this.solicitud = !this.solicitud;
  this.desde = 0;
  this.segmento.length = 0;
  this.obtenerListaSolicitudes(this.contraparteId);
  //console.log(this.ventana);
}

eliminaSolicitud(id:string){

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

  this.userFive.eliminarSolicitud(id).subscribe((resp:any)=>{

    if(!resp.ok){

      Swal.fire(
        'Fallo!',
        `${resp.message}`,
        'error'
      )

      return 

    } else{
      this.desde = 0;
      this.segmento.length = 0;
      this.obtenerListaSolicitudes(this.contraparteId);
      Swal.fire(
        'Deleted!',
        `${resp.message}`,
        'success'
      )

      return

    }

    })

    }

 });

}



avanzar(){

this.segmento.length = 0;
this.hasta = this.desde + 5;
this.backDesde = this.desde;
this.backHasta = this.hasta;
this.backMostrando = this.mostrando;
this.mostrando += 5;

if(this.hasta >= this.totalSolicitudes){

  this.hasta = this.totalSolicitudes;
  this.mostrando = this.totalSolicitudes;
  this.obtenerSegmento(this.desde, this.hasta);
  this.btnBack = true;
return this.btnUp = false;

} else {

  this.obtenerSegmento(this.desde, this.hasta);
  //console.log(this.segmento);
  
  return this.btnBack = true;

}

}


retroceder(){

  this.segmento.length = 0;
  this.backDesde -= 5;
  this.backHasta -= 5;
  this.mostrando = this.backMostrando;
  this.backMostrando -= 5;
  

 if(this.backDesde === 0){

    this.btnBack = false;

  } 


  this.obtenerSegmento( this.backDesde , this.backHasta);

  return this.btnUp = true;


}






obtenerSegmento( desde , hasta){


  for(desde;desde < hasta; desde++){
    this.segmento.push(this.solicitudes[desde])
  }

  this.desde = desde;
}


}
