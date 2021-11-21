import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

declare const Swal:any;
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  formuPago: any ={
    id:"",
    idPago:"",
    docSocio:"",
    placa:"",
    fechaPago:"",
    valorPago:""
  }
  constructor(private rutavar:ActivatedRoute, private http:HttpClient, private ruta:Router) { }

  ngOnInit(): void {
    this.formuPago.id=this.rutavar.snapshot.params["id"];
    this.http.get("http://localhost:8080/api/tamasys/pagos/consultar/"+this.formuPago.id,{responseType:"json"})
    .subscribe((res:any)=>{
      this.formuPago=res;});
    
  }

  editarPago(){
    Swal.fire({
      title:'Editado',
      text:`Pago ${this.formuPago.idPago} se modificó`,
      icon:'success',
      showConfirmButton:false,
      timer: 1500
    })
    this.http.put("http://localhost:8080/api/tamasys/pagos/actualizar/"+this.formuPago.id, this.formuPago)
    .subscribe((res:any)=>{
      this.ruta.navigate(["/consultar_pagos"]);
    });

  }

}
