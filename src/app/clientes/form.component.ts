import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo:string="Crear Alumno";
  cliente:Cliente = new Cliente; 

  public errores:string[];

  ngOnInit(): void {
    this.cargarClientes();
  }


  constructor(private clienteService:ClienteService,
    private router:Router,private activaRoute:ActivatedRoute){}


    cargarClientes():void{
      this.activaRoute.params.subscribe( params=>{
        let id = params['id']
        if(id){
          this.clienteService.getClientes(id)
          .subscribe((x) => this.cliente=x )
        }
        
      })
    }

  create():void{
    this.clienteService.create(this.cliente)
    .subscribe(cliente=>{
      this.router.navigate(['/clientes'])
      Swal.fire('Nuevo Cliente',`El cliente ${cliente.nombre} ha sido creado con éxito!` ,'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código desde el backend: '+ err.error.errors);
      console.error(err.error.errors)
    }

    )
  }

  update():void{
    this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente actualizado',`El cliente ${cliente.id} ${cliente.nombre} se ha actualizado con éxito!`,'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código desde el backend: '+ err.error.errors);
      console.error(err.error.errors)
    })
  }
  


}
