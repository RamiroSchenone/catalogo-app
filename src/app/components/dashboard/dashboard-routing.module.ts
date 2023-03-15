import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from '../carrito/carrito.component';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { MarcasComponent } from '../marcas/marcas.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'marcas', component: MarcasComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'catalogo', component: CatalogoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
