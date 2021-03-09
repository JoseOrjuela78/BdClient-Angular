import { Component, OnInit, Input} from '@angular/core';
import { UserService } from '../../services/user.service';
import { RepresentanteModel } from '../../models/representante.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() user :string;
  representante: RepresentanteModel;
  vinculos: any[];

  //inputs
  contraparte: string;
  contrapartes: any[];
  //users: any[];
  cargo: string;
  cargos: any[];
  title : string;
  termino : string;
  RazonSocial: string;

  
  constructor( private userTree: UserService)  {
               
   }
  
  ngOnInit() {

    if(localStorage.getItem('nitContra')){
      this.buscarTermino(localStorage.getItem('nitContra'));
      this.termino = localStorage.getItem('nitContra');
    }
       
    this.representante = new RepresentanteModel();
    this.representante.usuaNumeroIdentificacion = this.user;
    this.obtenerUserVinculos(this.user);
  
    //get select Cargos

    this.userTree.obtenerCargos().subscribe((resp:any)=>{
      this.cargos = resp.cargos;
     
    })
   
  }


  buscarTermino(termino:string){
   this.userTree.obtenerTermino(termino).subscribe( (resp:any)=>{
    
    if(resp.userDB.length === 0){

    this.RazonSocial = '';
    return
    
  }else{

    this.representante.contNumeroIdentificacion = resp.userDB[0].usuaNumeroIdentificacion;
    this.RazonSocial = resp.userDB[0].usuaRazonSocial;

    return
    }

  
   

   }
   )};



  vinculosUp(form:NgForm){
    
   if(form.invalid){return;}
   
   this.userTree.nuevoRepresentante(this.representante).subscribe((resp:any)=>{

    this.obtenerUserVinculos(this.user);

   });
    //console.log(this.representante);
    //console.log(form);

  }



  obtenerUserVinculos(idUser:string){
    
    this.userTree.obtenerUserRepresentantes(idUser).subscribe((resp:any)=>{
      
      this.vinculos = resp.representantes;
  
      
      this.vinculos.forEach(Element=>{
        
        this.title = `${Element.usuaRazonSocial} ${Element.tipoId} ${Element.usuaNumeroIdentificacion}`;
        
      })
    })
  }

  eliminarRepresentante(id:string){
    this.userTree.eliminarRepresentante(id).subscribe((resp:any)=>{
     // console.log(resp);
      this.obtenerUserVinculos(this.user)
    });

  }


  










}
