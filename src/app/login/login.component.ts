import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.http.get("http://localhost:8080/api/tamasys/consultarUsuario/"+this.users.user+"/"+this.users.password, { responseType: "json" })
    .subscribe((res: any) => {
      console.log(res);

      if(res.length===0){
        alert("No existe el registro")
      }
      for(var x of res){
        if(x.id===""||x.id===null){
          alert("No existe el registro")
        }
        else{
          alert("Bienvenido "+x.user);
          this.rou.navigate(["/menu"]);
        }
      }
    });
  }

}
