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

  lista: string[] = [
    "Cedula de ciudadania",
    "Cedula de Extranjeria",
    "Tarjeta de Identidad",
    "Pasaporte"
  ];

  socio: any = {
    nombreSocio: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    email: ""
  }

  constructor(private rou: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  guardar(): void {

    this.http.post("http://localhost:8080/api/tamasys/socios/crear", this.socio)
      .subscribe((res: any) => {
        console.log(res);
      });

    Swal.fire({
      title: 'El socio se ha registrado correctamente, ¿desea continuar agregando mas socios?',
      icon: 'success',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, deseo continuar',
      cancelButtonText: 'Volver',
      //denyButtonText: `Don't save`,
    }).then((result: any) => {
      // Read more about isConfirmed, isDenied below 
      if (result.isConfirmed) {
        window.location.reload();
      } else {
        this.rou.navigate(["/consultar"]);
      }
    })
  }
}
