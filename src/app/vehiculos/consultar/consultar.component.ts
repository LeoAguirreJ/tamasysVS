import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

declare const $:any;
declare const Swal:any;

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  infoConsulta:any;

  constructor(private rou:Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.listar();
    setTimeout(function(){
      $('#t_vehiculos').DataTable();
    },500)

  }

  listar():void{
    this.http.get("http://localhost:8080/api/tamasys/vehiculos/consultar",{responseType:"json"})
    .subscribe((Res:any)=>{
      console.log(Res);
      this.infoConsulta=Res;
    });
  }

  eliminar(x:any):void{
    Swal.fire({
      title: 'Está seguro que desea eliminar el vehículo?',
      icon:'warning',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminarlo',
      //denyButtonText: `Don't save`,
    }).then((result:any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'success');
        //eliminar
        this.http.delete("http://localhost:8080/api/tamasys/vehiculos/eliminar/"+x)
        .subscribe((Res:any)=>{
        console.log(Res);
        this.listar();
        });

      }
    })



  }


  FormularioEditar(id:any):void{
    //alert(x);
    this.rou.navigate(["/editar_vehiculo",id]);
  }


}

