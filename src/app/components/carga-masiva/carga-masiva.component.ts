import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.css']
})
export class CargaMasivaComponent implements OnInit {

  uploadedFiles: Array <File>;
  tipos: String[];
  tipo: string;
  name: String;
  size: Number;
  lastModified: Date;
  browser: Boolean;


  constructor(private fileservice: FileService) { }

  ngOnInit() {
    this.lastModified = new Date()
    this.tipos = ['Users', 'TiposIdentificacion','Paises','Departamentos', 'Municipios', 'Contrapartes', 'Representantes','Cargos', 'Ejecutivos', 'TipoSolicitud', 'Estados', 'Causales', 'Solicitudes'];
  }

  onTipo(type: string){

    this.tipo = type;
    this.browser = true;

  }

  onUpload(){
    //console.log('onUpload called');
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:`Enviado tabla de ${this.tipo}...`
            
    });
    Swal.showLoading()

    let formData = new FormData();
    for(let i=0; i < this.uploadedFiles.length; i++){
    
      formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);

    }

    this.fileservice.uploadFileTablas(formData).subscribe((resp:any)=>{
      let m = resp.data
      Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:`${m.originalname} ${m.encoding} Saved...`
            
    });

    
    }, err =>{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: err
              
      });
    })
  }




  onFileChange(e){
    //console.log('onFileChange called', e)

  if(!e.target.files){
  Swal.fire({
    allowOutsideClick: false,
    icon: 'error',
    text:'No anexo Archivo Excel...'
          
  });
  return
  }


    this.uploadedFiles = e.target.files;
    this.name = e.target.files[0].name;
    this.size = (e.target.files[0].size/ 1023);
    this.lastModified = e.target.files[0].lastModified;
    // console.log(this.uploadedFiles)

  }

}
