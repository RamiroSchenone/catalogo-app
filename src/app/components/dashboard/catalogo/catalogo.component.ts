import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  productos: Producto[];
  productosFilteredEmpty: boolean = false;
  criteria: string = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getAll().subscribe((res) => {
      this.productos = res;
    });
  }

  search(event: Event) {
    this.criteria = (event.target as HTMLInputElement).value;

    if (this.criteria == null || this.criteria == '') {
      this.productosFilteredEmpty = false;
      this.getProductos();
    }

    this.productoService.search(this.criteria).subscribe((res) => {
      this.productosFilteredEmpty = false;
      this.productos = res;

      if (this.productos.length == 0) {
        this.productosFilteredEmpty = true;
      }
    });
  }
}
