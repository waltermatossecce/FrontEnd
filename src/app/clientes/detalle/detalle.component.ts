import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente:Cliente;
  titulo:string='Detalle del cliente';
  public  fotoSeleccionada:File;
  progress:number=0

  constructor(private clienteService:ClienteService
    ,public modalService:ModalService
    ){}

    // CUANDO SE INICIALIZA EL COMPONENTE
    ngOnInit(): void {
 
    }
    seleccionarFoto(event: Event) {

      // Asegúrate de que el evento sea del tipo Event
      const inputElement = event.target as HTMLInputElement;
    
      // Verifica si se seleccionó algún archivo
      if (inputElement.files && inputElement.files.length > 0) {
        // Obtén el primer archivo seleccionado
        this.fotoSeleccionada = inputElement.files[0];
        console.log(this.fotoSeleccionada);
        this.progress = 0;
      }
      //indexOf metodo de objeto string con image y si la encuentra se la va encontrar esa cadena
      if(this.fotoSeleccionada.type.indexOf('image')<0){
        this.progress=0
        Swal.fire('Error seleccionar imagen', 'El archivo debe ser el tipo imagen','error');      } 
        this.fotoSeleccionada == null;
       }
    subirFoto() {
      if (!this.fotoSeleccionada) {
        Swal.fire('Error Uploads: ', 'Debe seleccionar una foto', 'error');
        console.error(this.fotoSeleccionada);
      } else {
        this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
          .subscribe(
            (events: any) => {
              if (events.type === HttpEventType.UploadProgress) {
                // Utiliza el operador de fusión nula para proporcionar un valor predeterminado si events.total es undefined
                this.progress = Math.round((events.loaded ?? 0) / (events.total ?? 1) * 100);
              } else if (events.type === HttpEventType.Response) {
                let response: any = events.body;
                this.cliente = response.cliente as Cliente;

                //emit emitir el cliente actualizado
                this.modalService.nodificarUpload.emit(this.cliente);
                Swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
              }
            },
            error => {
              console.error('Error al subir la foto:', error);
              Swal.fire('Error', 'Hubo un problema al subir la foto', 'error');
            }
          );
      }
    }
    cerrarModal() {
      this.modalService.cerrarModal();
      this.fotoSeleccionada ==null; 
      this.progress = 0;
    }
    }