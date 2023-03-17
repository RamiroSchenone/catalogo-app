import { Component, OnInit } from '@angular/core';
import { ColumnTable } from 'src/app/models/column-table.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  columns: ColumnTable[];
  data: any;
  title: string;
  opcionesPaginacion: number[] = [2, 5, 10, 25];

  constructor() {}

  ngOnInit(): void {
    this.title = 'Usuarios';
    this.columns = [
      {
        name: 'id',
        property: 'id',
        label: 'Id',
      },
      {
        name: 'username',
        property: 'username',
        label: 'Nombre de Usuario',
      },
      {
        name: 'nombre',
        property: 'nombre',
        label: 'Nombre',
      },
      {
        name: 'apellido',
        property: 'apellido',
        label: 'Apellido',
      },
      {
        name: 'email',
        property: 'email',
        label: 'Correo',
      },
      {
        name: 'telefono',
        property: 'telefono',
        label: 'Teléfono',
      },
    ];

    const data = [
      {
        id: 1,
        username: 'rschenone',
        nombre: 'Ramiro',
        apellido: 'Schenone',
        email: 'rschenone@abaccesorios.com',
        telefono: '2411111111',
      },
      {
        id: 2,
        username: 'abenitez',
        nombre: 'Anna',
        apellido: 'Benitez',
        email: 'abenitez@abaccesorios.com',
        telefono: '3411111111',
      },
      {
        id: 3,
        username: 'ischenone',
        nombre: 'Ignacio',
        apellido: 'Schenone',
        email: 'ischenone@abaccesorios.com',
        telefono: '3411111111',
      },
      {
        id: 4,
        username: 'rwendler',
        nombre: 'Rufina',
        apellido: 'Wendler',
        email: 'rwendler@abaccesorios.com',
        telefono: '3411111111',
      },
      {
        id: 5,
        username: 'rwendler',
        nombre: 'Rufina',
        apellido: 'Wendler',
        email: 'rwendler@abaccesorios.com',
        telefono: '3411111111',
      },
      {
        id: 6,
        username: 'rwendler',
        nombre: 'Rufina',
        apellido: 'Wendler',
        email: 'rwendler@abaccesorios.com',
        telefono: '3411111111',
      },
      {
        id: 7,
        username: 'rwendler',
        nombre: 'Rufina',
        apellido: 'Wendler',
        email: 'rwendler@abaccesorios.com',
        telefono: '3411111111',
      },
      {
        id: 8,
        username: 'rwendler',
        nombre: 'Rufina',
        apellido: 'Wendler',
        email: 'rwendler@abaccesorios.com',
        telefono: '3411111111',
      },
      {
        id: 9,
        username: 'rwendler',
        nombre: 'Rufina',
        apellido: 'Wendler',
        email: 'rwendler@abaccesorios.com',
        telefono: '3411111111',
      },
    ];
    this.data = data;
  }
}
