import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  constructor(private productoService: ProductoService) {}
  productos: Producto[];

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((res) => {
      this.productos = res;
    });
  }
}
