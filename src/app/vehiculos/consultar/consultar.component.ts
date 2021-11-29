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
      $('#t_vehiculos').DataTable({
        "language": {
          "url": "https://cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
      }
      });
    },500)

  }

  listar():void{
    this.http.get("http://localhost:8080/api/tamasys/vehiculos/consultar",{responseType:"json"})
    .subscribe((Res:any)=>{
      console.log(Res);
      this.infoConsulta=Res;
    });
  }

  eliminar(id:any):void{
    Swal.fire({
      title: '¿Está seguro que desea eliminar el vehículo?',
      icon:'warning',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminarlo',
      cancelButtonText: 'Cancelar',
      //denyButtonText: `Don't save`,
    }).then((result:any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'success');
        this.http.delete("http://localhost:8080/api/tamasys/vehiculos/eliminar/"+id)
        .subscribe((Res:any)=>{
        this.listar();
        });

      }
    })
  }

  FormularioEditar(id:any):void{
    this.rou.navigate(["/editar_vehiculo",id]);
  }


}

