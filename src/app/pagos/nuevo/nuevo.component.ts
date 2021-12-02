import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare const Swal: any;

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  infoSocio: any;
  infoVehiculo: any;
  formuPago: any ={
    idPago:"",
    docSocio:"",
    placa:"",
    fechaPago:"",
    valorPago:""
  }
  constructor(private ruta:Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.listarSocio();
    this.listarVehiculo();
  }
  listarSocio(): void {
    this.http.get("http://tamasys.jelastic.saveincloud.net/api/tamasys/socios/consultar", { responseType: "json" })
      .subscribe((res: any) => {
        console.log(res);
        this.infoSocio = res;
      });
  }
  listarVehiculo(): void {
    this.http.get("http://tamasys.jelastic.saveincloud.net/api/tamasys/vehiculos/consultar", { responseType: "json" })
      .subscribe((res: any) => {
        console.log(res);
        this.infoVehiculo = res;
      });
  }

  guardarPago(): void{
    this.http.post("http://tamasys.jelastic.saveincloud.net/api/tamasys/pagos/crear", this.formuPago)
    .subscribe((res:any)=>{
      console.log(res);
      
    });
    Swal.fire({
      title: `Pago ${this.formuPago.idPago} resgistrado ¿desea continuar agregando mas pagos?`,
      icon: 'success',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, deseo continuar',
      cancelButtonText: 'NO',
      //denyButtonText: `Don't save`,
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location.reload();
      }else{
        this.ruta.navigate(["/menu/consultar_pagos"]);
      }
    })
  }

}
