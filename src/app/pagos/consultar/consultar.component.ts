import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare const $:any;
declare const Swal: any;

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  infoPagos:any;
  
  constructor(private ruta:Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.listarPagos();

    setTimeout(function(){
      $('#t_pagos').DataTable({
        "language": {
          "url": "https://cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
      }
      });
    },200)
    
  }
  listarPagos():void{
    this.http.get("http://localhost:8080/api/tamasys/pagos/consultar",{responseType:"json"})
    .subscribe((res:any)=>{
      this.infoPagos=res;});
  }
  eliminar(id:any, codigo:any):void{
    Swal.fire({
      title: '¿Desea eliminar el Pago # '+codigo+'?',
      text: "No se puede revertir el procesos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'No',
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.http.delete("http://localhost:8080/api/tamasys/pagos/eliminar/"+id).subscribe((res:any)=>{
          this.listarPagos();
        });
        Swal.fire({
          title:'Elininado',
          text:'Pago # '+codigo +'se eliminó',
          icon:'success',
          showConfirmButton:false,
          timer: 1500
        })
      }
    })
  }

  formularioActualizar(id: any): void {
    this.ruta.navigate(["/editar_pago", id]);
  }
}
