import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  modal:boolean=false
 

  //Implementando EventEmitter para actualizar la foto en el listado

  public _nodificarUpload = new EventEmitter<any>(); 

  constructor() { }

 get nodificarUpload():EventEmitter<any>{
  return this._nodificarUpload;
 }

  abrirModal(){
    this.modal=true;
  }

  cerrarModal(){
    this.modal=false
  }

}
