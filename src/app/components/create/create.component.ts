import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: []
})
export class CreateComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    
  }
  onSubmit(form: NgForm){

    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
            
    });
  
    Swal.showLoading()

    this.auth.nuevoUsuario(this.usuario).subscribe(resp=>{
           
      Swal.fire({
        allowOutsideClick: true,
        icon: 'info',
        title: 'info',
        text: resp.message
      });
      return
    
 

    
    }, err => {
     // console.error(err)
      Swal.fire({
        allowOutsideClick: true,
        icon: 'error',
        title: 'Error De Creación',
        text: err.error.err.errors.email.message
      });
  })
    
  }

}
