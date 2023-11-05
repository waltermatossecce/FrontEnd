import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cliente:Cliente[];
  paginador:any;

  constructor(private clienteService:ClienteService,
    private activateRouter:ActivatedRoute) {}

  
  ngOnInit(): void {
    this.activateRouter.paramMap.subscribe( params=>{
      let page: number = parseInt(params.get('page') || '0', 10);
    
      if(!page){
        page=0
      }
    this.clienteService.getCliente(page)
    .pipe(
      tap(response => {
        console.log('ClientesComponent : tap 3');
        (response.content as Cliente[]).forEach(cliente=>{console.log(cliente.nombre);});
      })
    ).subscribe(response => {
      this.cliente= response.content as Cliente[]
      this.paginador = response;
    });
  }
    );
  }

  delete(cliente:Cliente):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar el alumo ${cliente.id} ${cliente.nombre} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si,eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id)
        .subscribe((x)=>{
          //el filter es para ya no ver el alumno eliminado en nuestra lista
          this.cliente=this.cliente.filter(cli=>cli !==cliente)
          Swal.fire('Alumno eliminado',`Alumno ${cliente.nombre} eliminado con éxito!`,'success')
        })
      } {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }




}
