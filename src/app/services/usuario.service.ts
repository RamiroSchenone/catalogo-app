import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BaseService<Usuario> {
  constructor(http: HttpClient, router: Router) {
    super(http, 'api/usuarios', router);
  }
}
