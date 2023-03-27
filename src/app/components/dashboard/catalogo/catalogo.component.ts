import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  productosFiltered: Producto[];
  productos: Producto[];
  productosFilteredEmpty: boolean = false;
  criteria: string = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((res) => {
      this.productos = res;
      this.productosFiltered = res;
    });
  }

  applyFilter(event: Event) {
    this.criteria = (event.target as HTMLInputElement).value;
    this.productosFiltered = this.productos.filter((item) =>
      item['nombre']
        .toString()
        .toLowerCase()
        .includes(this.criteria.toLowerCase())
    );

    if (this.criteria == null || this.criteria == '') {
      this.productosFiltered = this.productos;
      this.productosFilteredEmpty = false;
    }

    if(this.productosFiltered.length == 0) {
      this.productosFilteredEmpty = true;
    }
  }
}
