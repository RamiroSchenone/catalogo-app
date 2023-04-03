import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarcasComponent } from './marcas/marcas.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductoCardComponent } from './catalogo/producto-card/producto-card.component';
import { MarcaEditComponent } from './marcas/marca-edit/marca-edit.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MarcasComponent,
    CarritoComponent,
    CatalogoComponent,
    UsuariosComponent,
    ProductoCardComponent,
    MarcaEditComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
