import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'consultar', loadChildren: () => import('./socios/consultar/consultar.module').then(m => m.ConsultarModule) }, 
  { path: 'nuevo', loadChildren: () => import('./socios/nuevo/nuevo.module').then(m => m.NuevoModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
