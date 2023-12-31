import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Cliente } from './cliente';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Distrito } from './Distrito';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string="http://localhost:8090/api/clientes"

  //Cabeceras http
  private httpHeader = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient,private router:Router) { }


  getDistrito():Observable<Distrito[]>{
    return this.http.get<Distrito[]>(this.urlEndPoint + '/distrito');
  }

  getCliente(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe( 
      tap((response: any) =>{
        console.log('ClienteService : tap 1');
        (response.content as Cliente[]).forEach(cliente =>{
          console.log(cliente.nombre);
        });
      }),
      //tap es un operador
     
      map( (response:any) => {
        (response.content as Cliente[]).map(cliente => {
           cliente.nombre = cliente.nombre.toUpperCase();
           //cliente.createAt = formatDate(cliente.createAt,'fullDate','en-US');
           return cliente;
        });
        return response;
      }),
      tap(response =>{
        console.log('ClienteService : tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        }
        )
      })
      
    )
  }
  //operadores map se separan con coma
  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente ,{headers:this.httpHeader}).pipe(
    map( (response:any) => response.cliente as Cliente),
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e)
      })
    )
  }
  //metodo pipe 
  getClientes(id:number):Observable<Cliente>{
   return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/clientes']);
      Swal.fire('Error al editar el cliente', e.error.mensaje, 'error');
      return throwError(e);
    })
   )
  }
  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente , {headers:this.httpHeader}).pipe(
      map( (resultado:any) => resultado.cliente as Cliente),
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeader}).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }
  subirFoto(archivo: File, id: number): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id.toString());

const req = new HttpRequest('POST',`${this.urlEndPoint}/upload`, formData,{
  reportProgress: true
})

    return this.http.request(req);
  }
}
  

