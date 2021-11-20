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

m:any={
    id:"",
    docSocio:"",
    docConductor:"",
    placa:"",
    numeroTaxi:"",
    soat:"",
    tecnicoMecanica:""
  }

  constructor(private rou:Router,private rouvar:ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.m.id=this.rouvar.snapshot.params["x"];

    this.http.get("http://localhost:8080/api/tamasys/vehiculos/consultar/"+this.m.id,{responseType:"json"})
    .subscribe((Res:any)=>{
      this.m.docSocio=Res.docSocio;
      this.m.docConductor=Res.docConductor;
      this.m.placa=Res.placa;
      this.m.numeroTaxi=Res.numeroTaxi;
      this.m.soat=Res.soat;
      this.m.tecnicoMecanica=Res.tecnicoMecanica;

      console.log(this.m);

    });
  }

  Actualizar():void{
    this.http.put("http://localhost:8080/api/tamasys/vehiculos/actualizar/"+this.m.id,this.m)
    .subscribe((Res:any)=>{
      console.log(Res);
      //alert("Actualizado Satisfactoriamente")

      Swal.fire({
        icon: 'success',
        title: 'Vehículo!!!',
        text: 'Actualizado Satisfactoriamente',
        timer: 2000
      })
      this.rou.navigate(["/consultar_vehiculo"]);

    });
  }

}
