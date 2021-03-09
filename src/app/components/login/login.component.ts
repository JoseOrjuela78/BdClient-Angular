import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

ejecUser: string;
  usuario: UsuarioModel;
  recordarme = false;
  constructor(private auth:AuthService, private router :Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  LoginUp(form: NgForm){

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
    Swal.showLoading()


    this.auth.login(this.usuario).subscribe(resp=>{
  
    if(!resp.ok){
    Swal.fire({
    allowOutsideClick: true,
    icon: 'error',
    title: 'Error De Autenticación',
    text: resp.message
     });
     return

  }


   if(resp.usuario.role === 'EJEC_ROLE'){
      this.ejecUser = 'true';
      
    }else{
      this.ejecUser = 'false';
    }

    Swal.close();

    localStorage.setItem('email', resp.usuario.email);

    this.router.navigate(['/home', this.ejecUser]);
    
    }, err => {
    //  console.error(err)
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error De Autenticación',
        text: err.error.message
      });

  });
    

   // console.log('Formulario Enviado');
    //console.log(this.usuario);
    
    
  }



}
