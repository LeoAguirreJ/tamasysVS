import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  socio:any={
    nombreSocio: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    email: ""
  }

  constructor(private rou:Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  guardar():void{
    this.http.post("http://localhost:8080/api/tamasys/socios/crear", this.socio)
    .subscribe((res:any)=>{
      console.log(res);
      alert("El socio se ha registrado correctamente");
      window.location.reload();
    })
  }
}
