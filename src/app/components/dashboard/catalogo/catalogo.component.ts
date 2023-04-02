import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { NotificationService } from 'src/app/services/notificaciones.service';
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
  showSpinner: boolean = false;
  productosLength: number = 0;

  constructor(
    private productoService: ProductoService,
    private notifactionService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.showSpinner = true;
    this.productoService.getAll().subscribe(
      (res) => {
        this.productos = res;
        this.productosLength = res.length;
        this.showSpinner = false;
      },
      (error) => {
        this.notifactionService.showErrorMessage(error.message);
        this.showSpinner = false;
      }
    );
  }

  search(event: Event) {
    this.criteria = (event.target as HTMLInputElement).value;

    if (this.criteria == null || this.criteria == '') {
      this.productosFilteredEmpty = false;
      this.getProductos();
    }

    this.productoService.search(this.criteria).subscribe(
      (res) => {
        this.productosFilteredEmpty = false;
        this.productos = res;

        if (this.productos.length == 0) {
          this.productosFilteredEmpty = true;
        }
      },
      (error) => {
        this.notifactionService.showErrorMessage(error.message);
      }
    );
  }
}
