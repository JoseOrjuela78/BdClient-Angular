import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RepresentanteModel } from '../../models/representante.model';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table2',
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.css']
})
export class Table2Component implements OnInit {

  @Input() contraparteId :string;
  representante: RepresentanteModel;
  vinculos: any[];
  title : string;
  ventana: Boolean = false;
  nit: String; 
  

  constructor(private userFour: UserService, private router: Router, private fileService: FileService) { }

  ngOnInit() {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Buscando Vinculos...'
            
    });
    Swal.showLoading()

    // init variable users
    this.obtenerContraparteVinculos(this.contraparteId);

  }


  obtenerContraparteVinculos(contraparteId:string){
  

    this.userFour.obtenerRepresentantes(contraparteId).subscribe((resp:any)=>{
     
     this.vinculos = resp.representantes;
    
     this.vinculos.forEach(Element=>{
        if(Element.cargoId === 7){
        
        this.title = `${Element.usuaRazonSocial} ${Element.tipoId} ${Element.usuaNumeroIdentificacion}`;
        
        }
      })

      Swal.close();
    })
  }


  eliminarRepresentante(id:string){
    this.userFour.actualizarRepresentante(id).subscribe((resp:any)=>{
     // console.log(resp);
     this.obtenerContraparteVinculos(this.contraparteId);
    });

  }


 /* verUser(nit: string){
    if(nit === ''){
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        text: 'Ingrese un Número Identificación'
      });
      return;}
    
    this.router.navigate(['/home/false/usuarios', nit]);
  }*/




  downloadRepresentantesCon(nit: string) {
    this.fileService.downloadFileRepCon(nit).subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
			window.open(url);
      fileSaver.saveAs(blob, 'RepresentantesCon.txt');
      Swal.close();      
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }


  cerrarVentana(nit: string){

    this.nit = nit
    this.ventana = !this.ventana;
    this.obtenerContraparteVinculos(this.contraparteId);
    //console.log(this.ventana);
    
  }




}
