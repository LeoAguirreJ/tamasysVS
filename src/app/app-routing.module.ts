import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  { path: 'menu', component:MenuComponent, children:[
    { path: 'consultar_socio', loadChildren: () => import('./socios/consultar/consultar.module').then(m => m.ConsultarModule) },
    { path: 'nuevo_socio', loadChildren: () => import('./socios/nuevo/nuevo.module').then(m => m.NuevoModule) },
    { path: 'editar_socio/:id', loadChildren: () => import('./socios/editar/editar.module').then(m => m.EditarModule) },
    { path: 'consultar_vehiculo', loadChildren: () => import('./vehiculos/consultar/consultar.module').then(m => m.ConsultarModule) },
    { path: 'nuevo_vehiculo', loadChildren: () => import('./vehiculos/nuevo/nuevo.module').then(m => m.NuevoModule) },
    { path: 'editar_vehiculo/:id', loadChildren: () => import('./vehiculos/editar/editar.module').then(m => m.EditarModule) },
    { path: 'nuevo_pago', loadChildren: () => import('./pagos/nuevo/nuevo.module').then(m => m.NuevoModule) },
    { path: 'consultar_pagos', loadChildren: () => import('./pagos/consultar/consultar.module').then(m => m.ConsultarModule) },
    { path: 'editar_pago/:id', loadChildren: () => import('./pagos/editar/editar.module').then(m => m.EditarModule) },
    { path: 'consultar_conductor', loadChildren: () => import('./conductores/consultar/consultar.module').then(m => m.ConsultarModule) },
    { path: 'nuevo_conductor', loadChildren: () => import('./conductores/nuevo/nuevo.module').then(m => m.NuevoModule) },
    { path: 'editar_conductor/:id', loadChildren: () => import('./conductores/editar/editar.module').then(m => m.EditarModule) }
  ]},
  { path: 'login', component:LoginComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
