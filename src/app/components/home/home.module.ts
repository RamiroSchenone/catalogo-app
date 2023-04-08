import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarcasComponent } from './marcas/marcas.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductoCardComponent } from './catalogo/producto-card/producto-card.component';
import { MarcaEditComponent } from './marcas/marca-edit/marca-edit.component';
import { UsuarioEditComponent } from './usuarios/usuario-edit/usuario-edit.component';


@NgModule({
  declarations: [
    HomeComponent,
    MarcasComponent,
    CarritoComponent,
    CatalogoComponent,
    UsuariosComponent,
    ProductoCardComponent,
    MarcaEditComponent,
    UsuarioEditComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
