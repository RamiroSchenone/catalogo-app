import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getDashboard(): Observable<MenuItem[]>{
    return this.http.get<MenuItem[]>('./assets/data/dashboard.json')
  }
}
