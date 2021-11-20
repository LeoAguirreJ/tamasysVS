import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

declare const Swal: any;

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  lista:string[]=[
    "Cedula de ciudadania",
    "Cedula de Extranjeria",
    "Tarjeta de Identidad",
    "Pasaporte"
  ];
  socio:any={
    id:"",
    nombreSocio: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    email: ""
  }

  codId:any;
  constructor(private route:Router,private rou:ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.codId=this.rou.snapshot.params["id"];
    var link = "http://localhost:8080/api/tamasys/socios/consultar/"+this.codId;
    this.http.get(link, {responseType:"json"})
    .subscribe((res:any)=>{
      console.log(res);
      this.socio=res;
    });
  }
  actualizar():void{
    this.http.put("http://localhost:8080/api/tamasys/socios/actualizar/"+this.codId, this.socio)
    .subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Vehículo!!!',
        text: 'Actualizado Satisfactoriamente',
        timer: 2000
      })
      this.route.navigate(["/consultar"]);
    })
  }
}
