import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss'],
})
export class ProductoCardComponent implements OnInit {
  showHoverImage: boolean = false;
  @Input() producto: Producto;

  constructor() {}

  ngOnInit(): void {}

  // verProducto(p: Producto) {
  //   console.log(p);
  // }

  addToCart(p: Producto) {
    console.log(p);
  }

  fnShowHoverImage() {
    this.showHoverImage = true;
  }
  fnHideHoverImage() {
    this.showHoverImage = false;
  }
}
