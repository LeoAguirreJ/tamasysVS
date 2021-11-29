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

  vehiculo:any={
    docSocio:"",
    docConductor:"",
    placa:"",
    numeroTaxi:"",
    soat:"",
    tecnicoMecanica:""
  }

  infoConsulta:any;
  socios:Array<any>=[];
  conductores:Array<any>=[];

  constructor(private rou:Router,private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/api/tamasys/socios/consultar",{responseType:"json"})
    .subscribe((Res:any)=>{
      this.socios = Res;
    });

    this.http.get("http://localhost:8080/api/tamasys/conductores/consultar/",{responseType:"json"})
    .subscribe((Res:any)=>{
      this.conductores = Res;
    });
  }

  guardar():void{
    this.http.post("http://localhost:8080/api/tamasys/vehiculos/crear",this.vehiculo)
    .subscribe((Res:any)=>{
      console.log(Res);
      Swal.fire({
        title: 'El vehiculo se ha registrado correctamente, ¿desea continuar agregando más vehiculos?',
        icon: 'success',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Si, deseo continuar',
        cancelButtonText: 'Volver',
      }).then((result: any) => {
        // Read more about isConfirmed, isDenied below
        if (result.isConfirmed) {
          window.location.reload();
        }else {
          this.rou.navigate(["/menu/consultar_vehiculo"]);
        }
      })
    });
  }

}
