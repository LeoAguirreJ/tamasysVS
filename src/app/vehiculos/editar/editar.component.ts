import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject,LOCALE_ID} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare const Swal:any;

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],

})
export class EditarComponent implements OnInit {

vehiculo:any={
    id:"",
    docSocio:"",
    docConductor:"",
    placa:"",
    numeroTaxi:"",
    soat:"",
    tecnicoMecanica:""
  }
  socios:Array<any>=[];
  conductores:Array<any>=[];

  constructor(private rou:Router,private rouvar:ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/api/tamasys/socios/consultar",{responseType:"json"})
    .subscribe((Res:any)=>{
      this.socios = Res;
    });

    this.http.get("http://localhost:8080/api/tamasys/conductores/consultar/",{responseType:"json"})
    .subscribe((Res:any)=>{
      this.conductores = Res;
    });
    this.vehiculo.id=this.rouvar.snapshot.params["id"];

    this.http.get("http://localhost:8080/api/tamasys/vehiculos/consultar/"+this.vehiculo.id,{responseType:"json"})
    .subscribe((Res:any)=>{
      this.vehiculo.docSocio=Res.docSocio;
      this.vehiculo.docConductor=Res.docConductor;
      this.vehiculo.placa=Res.placa;
      this.vehiculo.numeroTaxi=Res.numeroTaxi;
      this.vehiculo.soat=Res.soat;
      this.vehiculo.tecnicoMecanica=Res.tecnicoMecanica;
    });
  }

  Actualizar():void{
    this.http.put("http://localhost:8080/api/tamasys/vehiculos/actualizar/"+this.vehiculo.id,this.vehiculo)
    .subscribe((Res:any)=>{
      console.log(Res);
      //alert("Actualizado Satisfactoriamente")

      Swal.fire({
        icon: 'success',
        title: 'Vehículo!!!',
        text: 'Actualizado Satisfactoriamente',
        timer: 2000
      })
      this.rou.navigate(["/menu/consultar_vehiculo"]);

    });
  }

}
