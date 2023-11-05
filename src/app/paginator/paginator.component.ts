import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./estilos.component.css']

})
export class PaginatorComponent implements OnInit{


  @Input() paginator:any;

  paginas:number[];

  ngOnInit(): void {
    //usamos el método fill para llenar el arreglo con datos!
    //map dentro de un arreglo es para modificar los datos 
    // _ es guion de abajo es para que lo tenga como uso
    this.paginas = new Array(this.paginator.totalPages).fill(0).map((_valor,indice) => indice + 1);
  }

}
