import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductoService extends BaseService<Producto> {
  constructor(http: HttpClient, router: Router) {
    super(http, 'api/productos', router);
  }
}
