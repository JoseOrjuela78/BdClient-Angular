import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

//private url: string = ''; //'http://localhost:3000';
private url: string = 'http://localhost:3000';
 userToken: string;
 headers: any;
 


  constructor (private http: HttpClient ) {
this.leerToken();
        
   }


   // crear nuevo usuario: localhost:3000/usuario

logout(){
  localStorage.removeItem('token');
  this.userToken ='';
  return false;
    
}

login(usuario:UsuarioModel):Observable<any>{

  let json = JSON.stringify(usuario);
  let params = "json="+ json;
  let headers = new HttpHeaders({
      'Content-Type': "application/x-www-form-urlencoded"
    });
  return this.http.post(`${this.url}/login`,params,{headers:headers})
  .pipe(map(resp =>{
    this.guardarToken(resp['token'])
    return resp;
  }))
    
  };

nuevoUsuario(usuario:UsuarioModel):Observable<any>{

let json = JSON.stringify(usuario);
let params = "json="+ json;
let headers = new HttpHeaders({
    'Content-Type': "application/x-www-form-urlencoded"
  });
return this.http.post(`${this.url}/usuario`,params,{headers:headers});
  
}


private guardarToken(idToken:string){

this.userToken = idToken;
localStorage.setItem('token', idToken);

let hoy = new Date()
hoy.setSeconds(28800);
localStorage.setItem('expiraToken', hoy.getTime().toString());

}

leerToken(){

  if(localStorage.getItem('token')){
    this.userToken = localStorage.getItem('token');
  } else {
    this.userToken = '';
  }
   return this.userToken;

  }

estaAutenticado(): boolean{

if(this.userToken.length < 2){
  return false;
}

const expira = Number(localStorage.getItem('expiraToken'));
const expiraDate = new Date();
expiraDate.setTime(expira);

if (expiraDate > new Date()){
  return true;
}else {
  return false;
}

}


getVinculos(nit:String){
  console.log('service active');
  return this.http.get(`${this.url}/obtenerTerceros?dato2=${nit}`);
    
    }







   
    
    };





