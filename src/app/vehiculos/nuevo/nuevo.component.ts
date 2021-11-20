import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const Swal:any;

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  m:any={
    docSocio:"",
    docConductor:"",
    placa:"",
    numeroTaxi:"",
    soat:"",
    tecnicoMecanica:""
  }


  constructor(private rou:Router,private http: HttpClient) { }

  ngOnInit(): void {
  }

  guardar():void{
    this.http.post("http://localhost:8080/api/tamasys/vehiculos/crear",this.m)
    .subscribe((Res:any)=>{
      console.log(Res);
      //alert("Registrado Satisfactoriamente")
      Swal.fire({
        icon: 'success',
        title: 'Vehículo!!!',
        text: 'Registrado Satisfactoriamente',
        timer: 2000
      })

      this.rou.navigate(["/consultar_vehiculo"]);

    });
  }

}
