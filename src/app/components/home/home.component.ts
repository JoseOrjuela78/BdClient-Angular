import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

 ejecUser: string;
  
  constructor(private router1:ActivatedRoute, private auth: AuthService, private router: Router) {
    this.router1.params.subscribe(params=>{
      this.ejecUser = params['id'];
     
        });
   
   }

  ngOnInit() {
    
    
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

  

}
