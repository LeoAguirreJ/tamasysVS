import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare const $: any;
declare const Swal: any;
@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  infoConsulta: any;
  constructor(private rou: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.listar();
    setTimeout(function () {
      $('#t_socios').DataTable({
        "language": {
          "url": "https://cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
      }
      });
    }, 100)

  }

  listar(): void {
    this.http.get("http://tamasys.jelastic.saveincloud.net/api/tamasys/socios/consultar", { responseType: "json" })
      .subscribe((res: any) => {
        console.log(res);
        this.infoConsulta = res;
      });
  }

  eliminar(id: any, name:any): void {

    Swal.fire({
      title: 'Está seguro que desea eliminar el socio ' + name + '?',
      icon: 'warning',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminarlo',
      cancelButtonText: 'Cancelar',
      //denyButtonText: `Don't save`,
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'success');
        //eliminar
        this.http.delete("http://tamasys.jelastic.saveincloud.net/api/tamasys/socios/eliminar/" + id)
          .subscribe((res: any) => {
            console.log(res);
            this.listar();
          });

      }
    })

  }

  formularioActualizar(id: any): void {
    this.rou.navigate(["/menu/editar_socio", id]);
  }
}
