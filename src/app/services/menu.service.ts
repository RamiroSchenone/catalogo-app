import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService<MenuItem> {
  constructor(http: HttpClient, router: Router) {
    super(http, 'api/menues', router);
  }
}
