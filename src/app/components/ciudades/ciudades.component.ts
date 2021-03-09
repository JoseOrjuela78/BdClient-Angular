import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { CiudadesModel } from '../../models/ciudades.model';
import { UserService } from '../../services/user.service';
import { PaisesModel } from '../../models/paises.model';
import { DepartamentosModel } from '../../models/departamentos.model';
import { MunicipiosModel } from '../../models/municipios.model';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  i:any;
  title: String;
  title1: String;
  title2: String;
  ciudad: CiudadesModel;
  pais: PaisesModel;
  departamento: DepartamentosModel;
  municipio: MunicipiosModel;
  activated: Boolean = true;
  nombreCiudadActiva: String;
  listadoCiudades:String [] = ['Pais','Departamento','Municipio','Paises','Departamentos','Municipios'];

  constructor(private userservice: UserService, private fileService: FileService) { }

  ngOnInit() {
    this.i = 0;
    this.ciudad = new CiudadesModel();
    this.ciudad.ciudadActiva = true;
    this.CambioNombre(this.ciudad.ciudadActiva);
    this.title = this.listadoCiudades[0];
    this.title1 = this.listadoCiudades[3];
    this.title2 = this.listadoCiudades[1];
    this.pais = new PaisesModel();
    this.departamento = new DepartamentosModel();
    this.municipio = new MunicipiosModel();
  }


  BuscarCiudad(id: String){

    let idx = Number(id);
    
    if(id === '' || id === undefined){
      console.log('Opción Save Activated')
      this.resetCiudad();
      return this.activated = true;
    }

    let a, b, c, e;

    switch(this.i){

      case 0:

        this.userservice.obtenerPaisesItem(id).subscribe((resp: any)=>{
          

          if(resp.paises.length === 0){
            console.log('Opción Save Activated x no existe')
            this.resetCiudad();
            return this.activated = true;
          }
      
          a = resp.paises[0].paisId;
          b = resp.paises[0].nombrePais;
          c = '0';
          e = resp.paises[0].paisActivo;
          this.pais.paisId = resp.paises[0].paisId;
          this.pais.nombrePais = resp.paises[0].nombrePais;
      
          this.asignarValores(a,b,c,e)
          return this.activated = false;
          
          },err=>{
          console.log('Opción Save Activated x error')
          this.resetCiudad();
          return this.activated = true;
      
          });

      break;

      case 1:

        this.userservice.obtenerDepartamentosItem(id).subscribe((resp: any)=>{

          if(resp.departamentos.length === 0){
            console.log('Opción Save Activated x no existe')
            this.resetCiudad();
            return this.activated = true;
          }
      
          a = resp.departamentos[0].departamentoId;
          b = resp.departamentos[0].nombreDepartamento;
          c = resp.departamentos[0].indicativo;
          e = resp.departamentos[0].departamentoActivo;
          this.departamento.departamentoId = resp.departamentos[0].departamentoId;
          this.departamento.nombreDepartamento = resp.departamentos[0].nombreDepartamento;
          this.departamento.pais = resp.departamentos[0].paisId;

          this.asignarValores(a,b,c,e)
          return this.activated = false;
          
          },err=>{
          console.log('Opción Save Activated x error')
          this.resetCiudad();
          return this.activated = true;
      
          });
      
      break;

      case 2:

        this.userservice.obtenerMunicipiosItem(id).subscribe((resp: any)=>{
         
          if(resp.municipios.length === 0){
            console.log('Opción Save Activated x no existe')
            this.resetCiudad();
            return this.activated = true;
          }
      
          a = resp.municipios[0].municipioId;
          b = resp.municipios[0].nombreMunicipio;
          c = '0';
          e = resp.municipios[0].municipioActivo;
          this.municipio.municipioId = resp.municipios[0].municipioId;
          this.municipio.nombreMunicipio = resp.municipios[0].nombreMunicipio;
          this.municipio.departamento = resp.municipios[0].departamento;

          this.asignarValores(a,b,c,e)
          return this.activated = false;
          
          },err=>{
          console.log('Opción Save Activated x error')
          this.resetCiudad();
          return this.activated = true;
      
          });
      
      break;

      default:
        console.log('default buscar called!');
      break;

    }

    
    
  }


  UpCiudad(form: NgForm){
 
    if(form.invalid){return;}

    switch (this.i){
      case 0:
        this.pais.paisId = this.ciudad.idCiudad;
        this.pais.nombrePais = this.ciudad.nombreCiudad;
        this.pais.paisActivo = this.ciudad.ciudadActiva;
    
        this.userservice.nuevoPais(this.pais).subscribe(resp =>{
          
        this.pais.paisId = resp.pais.paisId;
        this.avanzarTipoCiudad();
        return this.activated = false;
    
      },err => {
          
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: `Error de Creación ${err}`,
          
        });
        this.resetCiudad();
        return this.activated = true;
    
    })

      break;

      case 1:
        
        this.departamento.departamentoId = this.ciudad.idCiudad;
        this.departamento.nombreDepartamento = this.ciudad.nombreCiudad;
        this.departamento.departamentoActivo = this.ciudad.ciudadActiva;
        this.departamento.indicativo = Number(this.ciudad.indicativoCiudad);
        this.departamento.pais = this.pais.paisId;
        
        this.userservice.nuevoDepartamento(this.departamento).subscribe(resp =>{
        
        this.departamento.departamentoId = resp.departamento.departamentoId;
        this.avanzarTipoCiudad();
        return this.activated = false;
    
      },err => {
          
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: `Error de Creación ${err}`,
          
        });
        this.resetCiudad();
        return this.activated = true;
    
    })

      break;

      case 2:
        
        this.municipio.municipioId = this.ciudad.idCiudad;
        this.municipio.nombreMunicipio = this.ciudad.nombreCiudad;
        this.municipio.municipioActivo = this.ciudad.ciudadActiva;
        this.municipio.departamento = this.departamento.departamentoId;
        this.userservice.nuevoMunicipio(this.municipio).subscribe(resp =>{
        this.municipio.municipioId = resp.municipio.municipioId;
        this.avanzarTipoCiudad();
        return this.activated = false;
    
      },err => {
          
        Swal.fire({
          allowOutsideClick: true,
          icon: 'error',
          title: `Error de Creación ${err}`,
          
        });
        this.resetCiudad();
        return this.activated = true;
    
    })

      break;

      default:

        return console.log('default up called!');

      break;

    }


         
      
    
  }


  ActualizarPais(form:NgForm){

    if(form.invalid){return;}

    switch(this.i){
      case 0:
        this.pais.nombrePais = this.ciudad.nombreCiudad;
        this.pais.paisActivo = this.ciudad.ciudadActiva; 
        this.userservice.actualizarPais(this.pais).subscribe((resp: any)=>{
      
        //console.log(resp);
        this.avanzarTipoCiudad();
        return this.activated = false;
     
       
      },err => {
      
       Swal.fire({
         allowOutsideClick: true,
         icon: 'error',
         title: `Error De Actualización ${err}`,
         
       });

       this.resetCiudad();
       return this.activated = true;
       
   });

      break;

      case 1:
      
        this.departamento.nombreDepartamento = this.ciudad.nombreCiudad;
        this.departamento.indicativo = Number(this.ciudad.indicativoCiudad);
        this.departamento.departamentoActivo = this.ciudad.ciudadActiva;
        this.departamento.pais = this.pais.paisId; 
      
        this.userservice.actualizarDepartamento(this.departamento).subscribe((resp: any)=>{
      
         //console.log(resp);
        this.avanzarTipoCiudad();
        return this.activated = false;
     
       
      },err => {
      
       Swal.fire({
         allowOutsideClick: true,
         icon: 'error',
         title: `Error De Actualización ${err}`,
         
       });

       this.resetCiudad();
       return this.activated = true;
       
   });

      break;
    
      case 2:


        this.municipio.nombreMunicipio = this.ciudad.nombreCiudad;
        this.municipio.municipioActivo = this.ciudad.ciudadActiva;
        this.municipio.departamento = this.departamento.departamentoId;
      
       this.userservice.actualizarMunicipio(this.municipio).subscribe((resp: any)=>{
      
         //console.log(resp);
        this.avanzarTipoCiudad();
        return this.activated = false;
     
       
      },err => {
      
       Swal.fire({
         allowOutsideClick: true,
         icon: 'error',
         title: `Error De Actualización ${err}`,
         
       });

       this.resetCiudad();
       return this.activated = true;
       
   });

      break;

      default:

      return console.log('default update called!');
      
      break;
    }

    

  }


  downloadListado() {


switch(this.i){
  case 0:
    this.fileService.downloadFilePaises().subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      fileSaver.saveAs(blob, 'Paises.txt');
      Swal.close();      
    }), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
   break;
   case 1:
    this.fileService.downloadFileDepartamentos().subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      fileSaver.saveAs(blob, 'Departamentos.txt');
      Swal.close();      
    }), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
   break;
   case 2:
    this.fileService.downloadFileMunicipios().subscribe(response => {
      
      let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      fileSaver.saveAs(blob, 'Municipios.txt');
      Swal.close();      
    }), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
   break;
   default:
     console.log('default download called!')
   break;
}





 




  }
  
  
















  // funciones auxiliares

  avanzarTipoCiudad(){
    Swal.fire({
      title: 'Are you sure?',
      text: `desea Asignar ${this.title2}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si Asignar ${this.title2}!`
    }).then((result) => {
      if (result.value) {
        if(this.i === 2){
          this.cambiarCiudad();
          this.resetCiudad();
          this.ciudad.idCiudad ='';
          this.pais.nombrePais = '';
          this.departamento.nombreDepartamento = '';
          this.municipio.nombreMunicipio = '';
        } else{

        this.cambiarCiudad();
        this.resetCiudad();
        this.ciudad.idCiudad ='';
        }
        
        Swal.fire(
          `Asigne ${this.title1}!`,
          `Opción ${this.title1} Activada`,
          'success'
        )
      }
    })
  }


  resetCiudad(){

    this.ciudad.nombreCiudad = '';
    this.ciudad.indicativoCiudad = '';
    this.ciudad.ciudadActiva = false;
    this.CambioNombre(this.ciudad.ciudadActiva);

  }

  asignarValores(id: String, nombre: String,indicativo: String, activo: Boolean ){

    this.ciudad.idCiudad = id;
    this.ciudad.nombreCiudad = nombre;
    this.ciudad.indicativoCiudad = indicativo;
    this.ciudad.ciudadActiva = activo;
    this.CambioNombre(this.ciudad.ciudadActiva);

  }

  cambiarCiudad(){
    
    if(this.i < 2){
      this.i = this.i + 1;
    }else{
      this.i = 0;
    }
  
    this.title = this.listadoCiudades[this.i]
    this.title1 = this.listadoCiudades[this.i + 3]
    this.title2 = this.listadoCiudades[this.i + 1]

  }
  
  
   
  CambioNombre(estado:Boolean){
    if(!estado){
      this.nombreCiudadActiva = "Inactivo";
   // console.log('true :',this.nombreEstadoCargo);
    }else{
      this.nombreCiudadActiva = "Activo";
    //  console.log('false :',this.nombreEstadoCargo);
    }
  }
    
  

  


  

  
}
