import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'consultar', loadChildren: () => import('./socios/consultar/consultar.module').then(m => m.ConsultarModule) },
  { path: 'nuevo', loadChildren: () => import('./socios/nuevo/nuevo.module').then(m => m.NuevoModule) },
  { path: 'editar/:id', loadChildren: () => import('./socios/editar/editar.module').then(m => m.EditarModule) },
  { path: 'consultar_vehiculo', loadChildren: () => import('./vehiculos/consultar/consultar.module').then(m => m.ConsultarModule) },
  { path: 'nuevo_vehiculo', loadChildren: () => import('./vehiculos/nuevo/nuevo.module').then(m => m.NuevoModule) },
  { path: 'editar_vehiculo/:id', loadChildren: () => import('./vehiculos/editar/editar.module').then(m => m.EditarModule) },
  { path: 'nuevo_pago', loadChildren: () => import('./pagos/nuevo/nuevo.module').then(m => m.NuevoModule) },
  { path: 'consultar_pagos', loadChildren: () => import('./pagos/consultar/consultar.module').then(m => m.ConsultarModule) },
  { path: 'editar_pago/:id', loadChildren: () => import('./pagos/editar/editar.module').then(m => m.EditarModule) },
  { path: 'consultar_conductor', loadChildren: () => import('./conductores/consultar/consultar.module').then(m => m.ConsultarModule) },
  { path: 'nuevo_conductor', loadChildren: () => import('./conductores/nuevo/nuevo.module').then(m => m.NuevoModule) },
  { path: 'editar_conductor/:id', loadChildren: () => import('./conductores/editar/editar.module').then(m => m.EditarModule) }]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
