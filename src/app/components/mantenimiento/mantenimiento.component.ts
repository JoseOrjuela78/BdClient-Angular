import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  choose:String;
 
  constructor() { }

  ngOnInit() {
   }

  Asignar(seleccionado:String){
    this.choose = seleccionado;
  }

}
