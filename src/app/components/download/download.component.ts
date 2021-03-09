import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';
import { NgForm, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {
 descarga: String;

  constructor(private fileService: FileService) { }

  downloadSolicitudes() {
    this.fileService.downloadFile().subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
			window.open(url);
      fileSaver.saveAs(blob, 'Solicitudes.txt');
      Swal.close();      
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }

  downloadRepresentantes() {
    this.fileService.downloadFileRep().subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
			window.open(url);
      fileSaver.saveAs(blob, 'Representantes.txt');
      Swal.close();
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }

  downloadUsers() {
    this.fileService.downloadFileUsers().subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
			window.open(url);
      fileSaver.saveAs(blob, 'Users.txt');
      Swal.close();
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }

  downloadContrapartes() {
    this.fileService.downloadFileContrapartes().subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
			window.open(url);
      fileSaver.saveAs(blob, 'Contrapartes.txt');
      Swal.close();
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }


Asignar(seleccionado:String){

  this.descarga = seleccionado;

  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text:`Descargando ${this.descarga}`
          
  });
  Swal.showLoading()

  
  switch(this.descarga){
    case 'Usuarios':
      this.downloadUsers();
      
    break;
    case 'Contrapartes':
      this.downloadContrapartes();
      
    break;
    case 'Representantes':
      this.downloadRepresentantes();
      
    break;
    case 'Solicitudes':
      this.downloadSolicitudes();
      
    break;
    default :
    Swal.close();
    break;
  

  }
}






}
