import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: any[] = [
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
    id: 4,
    username: 'rwendler',
    nombre: 'Rufina',
    apellido: 'Wendler',
    email: 'rwendler@abaccesorios.com',
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
    id: 4,
    username: 'rwendler',
    nombre: 'Rufina',
    apellido: 'Wendler',
    email: 'rwendler@abaccesorios.com',
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
    id: 4,
    username: 'rwendler',
    nombre: 'Rufina',
    apellido: 'Wendler',
    email: 'rwendler@abaccesorios.com',
    telefono: '3411111111',
  },
];
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'username',
    'name',
    'email',
    'telefono',
    'acciones',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verUsuario(user: any) {
    console.log('Ver');
    console.log(user);
  }
  eliminarUsuario(user: any) {
    console.log('Eliminar');
    console.log(user);
  }
}
