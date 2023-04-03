import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { Marca } from '../models/marca.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends BaseService<Marca> {
  constructor(http: HttpClient, router: Router) {
    super(http, 'api/marcas', router);
  }
}
