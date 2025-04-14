import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';
import * as fileSaver from 'file-saver';
import * as moment from 'moment';
import { async } from '@angular/core/testing';



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
  dataCompliance:any ={};
  nameFile:String;
  buttomCompliance: Boolean = false;

  

  @Input() nit: String;

  constructor(private userOne: UserService,  private fileService: FileService) { 
    
  }

  ngOnInit() {

    this.buttomCompliance = false;

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

    
    this.user.usuaRazonSocial = "";
    this.user.usuaObservacion = "";
    this.userOne.nuevoCompliance(this.user).subscribe((resp:any) =>{
    
    this.dataCompliance = resp.data;
    this.nameFile =`${resp.data.idConsulta} ${resp.data.nombre} id_${resp.data.datoConsultado}`;
    this.buttomCompliance = true;
    

    if(resp.resultado.presentaRiesgo === undefined){
      
      Swal.fire({
  
        icon: 'error',
        title: `${resp.resultado}`,
        showConfirmButton: true,

      })

      
     }else if (resp.resultado.presentaRiesgo){
      
      this.user.usuaRazonSocial = resp.resultado.nombre;
      this.user.usuaObservacion = `id: ${resp.data.idConsulta} ${resp.resultado.resultados}`;

      Swal.fire({
  
        icon: 'warning',
        title: 'Usuario presenta riesgo debe consultar manualmente ...',
        showConfirmButton: true
        
      })

     }else {
             
      this.user.usuaRazonSocial = resp.resultado.nombre;
      this.user.usuaObservacion = `id: ${resp.data.idConsulta} Usuario no presenta riesgo`;

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
    
    
if(this.user.usuaFechaMatricula === null && this.user.usuaFechaNacimiento === null){

  this.user.usuaFechaMatricula = this.today;
  this.user.usuaFechaNacimiento = this.today;
  
}

if (this.user.usuaFechaMatricula === null || this.user.usuaFechaNacimiento === null){

  this.user.usuaFechaMatricula = this.user.usuaFechaNacimiento;
  
} 

this.validarCreateUser(form);
return;


    
  }



 async actualizaUser(form:NgForm){
    
    if(form.invalid){return;}

    let str = (this.user.usuaRazonSocial).toUpperCase();
    this.user.usuaRazonSocial = str;
    let str2 = (this.user.usuaObservacion).toUpperCase();
    this.user.usuaObservacion = await encodeURIComponent(str2);
    let rs = await encodeURIComponent(this.user.usuaRazonSocial);
      this.user.usuaRazonSocial = rs;

   Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Actualizando Usuario...'
            
    });
    Swal.showLoading()
      
   await this.userOne.actualizarUser(this.user).subscribe((resp:any)=>{
      
     
    }/*,err => {
      
       Swal.fire({
         allowOutsideClick: true,
         icon: 'error',
         title: `Error De Actualización: ${err}`,
         
       });
   }*/);

  await this.obtenerUser(this.user.usuaNumeroIdentificacion);
      
    Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        text: 'Usuario Actualizado'
              
      });
        
   
        return this.estadoUser = true;
      
         
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
    this.userOne.nuevoContraparte(user).subscribe((resp:any)=>{
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
        this.now =moment(resp.user[0].usuaFechaMatricula).add(1,'days').format('YYYY-MM-DD');
        this.user.usuaFechaMatricula = this.now;
        this.now =moment(resp.user[0].usuaFechaNacimiento).add(1,'days').format('YYYY-MM-DD');
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


  downloadCompliance(data:any) {



this.fileService.downloadFileCompliance(data).subscribe(response => {
    
 
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
			window.open(url);
      fileSaver.saveAs(blob, `${this.nameFile}`);
      this.buttomCompliance = false;
      Swal.close();      
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');



              

                 

                 
  }



 async validarCreateUser(form:NgForm) { 

      if(form.invalid){return;}

      this.user.usuaRazonSocial = await encodeURIComponent(this.user.usuaRazonSocial.toUpperCase());
      this.user.usuaObservacion = await encodeURIComponent(this.user.usuaObservacion.toUpperCase());
    
   
     await this.userOne.nuevoUser(this.user).subscribe((resp:any)=>{

      this.obtenerUser(this.user.usuaNumeroIdentificacion);
      localStorage.setItem('idUser', resp.userDB.recordset[0].usuaNumeroIdentificacion);
      Swal.close();
      return this.estadoUser = true;
    
   
     
   }/*err => {
      
       Swal.fire({
         allowOutsideClick: true,
         icon: 'error',
         title: `error ${err}`
         
       });
   }*/);


  
  
  }

 
  encodedSTR (str:string) {
  return encodeURI(str);  
    
  }
 

 

}
