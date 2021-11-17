import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
    nombreSocio: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    email: ""
  }

  codId:any;
  constructor(private rou:ActivatedRoute, private http: HttpClient) { }

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
      alert("El socio se ha actualizado correctamente");
      window.location.reload();
    })
  }
}
