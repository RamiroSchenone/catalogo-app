import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';
import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends BaseService<MenuItem> {
  constructor(http: HttpClient, router: Router) {
    super(http, 'Home', router);
  }


  getHome(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>('./assets/data/home.json');
  }
}
