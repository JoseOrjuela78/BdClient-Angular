import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  idEstado: string ='5dc8765ce887d70cd43e420a';
  solicitudes: any[];
  segmento = new Array();
  lector: Boolean = false;
  titles:String [] =['Responsable','Fecha','#','Identificación','Razón Social','Solicitud','Causal','Tools'];
  estados: String[];
  mostrando: number;
  totalSolicitudes: number;
  desde: number = 0;
  backDesde: number;
  backHasta: number;
  backMostrando: number;
  hasta: number = 0;
  btnUp: boolean = false;
  btnBack: boolean = false;
  solicitudId: string;
  solicitud: boolean = false;
  constructor(private router:ActivatedRoute ,private userSeven: UserService, private fileService: FileService) { 
  
  }

  ngOnInit() {
   
    this.obtenerEstados();
  }

  obtenerEstados(){
    this.userSeven.obtenerEstados().subscribe((resp:any)=>{
      this.estados = resp.estados;

    });
  }
  
  obtenerListaSolicitudes(idEstado:string,){
    this.userSeven.obtenerSolicitudesConsulta(idEstado).subscribe((resp:any)=>{
       if(resp.solicitudes.length === 0){
        this.lector = false;
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          text: 'Estado Sin Historial'
        });
        return;

      } else {
        
        this.solicitudes = resp.solicitudes;
        this.mostrando = resp.total;
        this.totalSolicitudes = resp.solicitudes.length;

        if(this.mostrando > 5){

          this.btnUp = true;
          this.btnBack = false;
        
          for(this.desde;this.desde < 5; this.desde++){
  
            this.segmento.push(this.solicitudes[this.desde])
  
          }
  
          
          
        }else{

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
  //console.log(this.segmento);
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
    
  
   // console.log('desde: ',this.backDesde)
    // console.log('hasta: ',this.backHasta)
  
    if(this.backDesde === 0){
  
      this.btnBack = false;
  
    } 
  
  
    this.obtenerSegmento( this.backDesde , this.backHasta);
  
    return this.btnUp = true;

    
   }


   abrirSolicitud( solId: string){
    this.solicitud = !this.solicitud;
    this.solicitudId = solId;
    
   
}

  
  cerrarSolicitud(){
  this.solicitud = !this.solicitud;
  this.obtenerListaSolicitudes(this.idEstado);
  //console.log(this.ventana);
}
  

buscarSolicitudEstado(form: NgForm){
  if(form.invalid){return}
  if(this.desde > 0){
    this.desde = 0;
  }
  
  this.obtenerListaSolicitudes(this.idEstado);
}



downloadSolicitudesEst() {
  this.fileService.downloadFileSolEst(this.idEstado).subscribe(response => {
    
    let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
    fileSaver.saveAs(blob, 'SolicitdesEstado.txt');
    Swal.close();      
  }), error => console.log('Error downloading the file'),
               () => console.info('File downloaded successfully');
}


obtenerSegmento( desde , hasta){


  for(desde;desde < hasta; desde++){
    this.segmento.push(this.solicitudes[desde])
  }

  this.desde = desde;
}


}






