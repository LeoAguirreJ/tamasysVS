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
  infoSocio: any;
  infoVehiculo: any;
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
    this.listarSocio();
    this.listarVehiculo();
    this.formuPago.id=this.rutavar.snapshot.params["id"];
    this.http.get("http://localhost:8080/api/tamasys/pagos/consultar/"+this.formuPago.id,{responseType:"json"})
    .subscribe((res:any)=>{
      this.formuPago=res;});
    
  }
  listarSocio(): void {
    this.http.get("http://localhost:8080/api/tamasys/socios/consultar", { responseType: "json" })
      .subscribe((res: any) => {
        console.log(res);
        this.infoSocio = res;
      });
  }
  listarVehiculo(): void {
    this.http.get("http://localhost:8080/api/tamasys/vehiculos/consultar", { responseType: "json" })
      .subscribe((res: any) => {
        console.log(res);
        this.infoVehiculo = res;
      });
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
      this.ruta.navigate(["/menu/consultar_pagos"]);
    });

  }

}
