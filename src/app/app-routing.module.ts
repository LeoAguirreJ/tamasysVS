import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'consultar', loadChildren: () => import('./socios/consultar/consultar.module').then(m => m.ConsultarModule) }, 
  { path: 'nuevo', loadChildren: () => import('./socios/nuevo/nuevo.module').then(m => m.NuevoModule) },
  { path: 'editar/:id', loadChildren: () => import('./socios/editar/editar.module').then(m => m.EditarModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
