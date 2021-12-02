import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const Swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private rou: Router, private http: HttpClient) { }

  users:any={
    user:"",
    password:""
  }

  ngOnInit(): void {
  }

  iniciar():void{
    this.http.get("http://tamasys.jelastic.saveincloud.net/api/tamasys/consultarUsuario/"+this.users.user+"/"+this.users.password, { responseType: "json" })
    .subscribe((res: any) => {
      console.log(res);

      if(res.length===0){
        Swal.fire({
          icon: 'alert',
          title: 'Error!!!',
          text: 'No existe el registro',
          timer: 2000
        })
      }
      for(var x of res){
        if(x.id===""||x.id===null){
          Swal.fire({
            icon: 'alert',
            title: 'Error!!!',
            text: 'No existe el registro',
            timer: 2000
          })
        }
        else{
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido!!!',
            text: x.user,
            timer: 2000
          })
          this.rou.navigate(["/menu"]);
        }
      }
    });
  }

}
