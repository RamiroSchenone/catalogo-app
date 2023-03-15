import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MarcasComponent } from '../marcas/marcas.component';
import { CarritoComponent } from '../carrito/carrito.component';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    MarcasComponent,
    CarritoComponent,
    CatalogoComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
