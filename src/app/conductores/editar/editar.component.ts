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
    "Cédula de ciudadanía",
    "Cédula de Extranjería",
    "Tarjeta de Identidad",
    "Pasaporte"
  ];
  conductor:any={
    id:"",
    nombreConductor: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    email: "",
    licencia: ""
  }

  codId:any;
  constructor(private route:Router,private rou:ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.codId=this.rou.snapshot.params["id"];
    var link = "http://tamasys.jelastic.saveincloud.net/api/tamasys/conductores/consultar/"+this.codId;
    this.http.get(link, {responseType:"json"})
    .subscribe((res:any)=>{
      console.log(res);
      this.conductor=res;
    });
  }
  actualizar():void{
    this.http.put("http://tamasys.jelastic.saveincloud.net/api/tamasys/conductores/actualizar/"+this.codId, this.conductor)
    .subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Conductor!!!',
        text: 'Actualizado Satisfactoriamente',
        timer: 2000
      })
      this.route.navigate(["/menu/consultar_conductor"]);
    })
  }
}
