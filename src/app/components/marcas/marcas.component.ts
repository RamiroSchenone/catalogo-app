import { Component, OnInit } from '@angular/core';
import { ColumnTable } from 'src/app/models/column-table.model';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {
  columns: ColumnTable[];
  data: any;
  title: string;
  opcionesPaginacion: number[] = [2, 5, 10, 25];

  constructor() { }

  ngOnInit(): void {
    this.title = 'Marcas';
    this.columns = [
      {
        name: 'id',
        property: 'id',
        label: 'Id',
      },
      {
        name: 'nombre',
        property: 'nombre',
        label: 'nombre',
      },
      {
        name: 'productLength',
        property: 'productLength',
        label: 'Cantidad de Productos',
      },
    ];
    this.data = [
      {
        id: 1,
        nombre: 'Chimola',
        productLength: 5
      },
      {
        id:2,
        nombre: 'Trendy',
        productLength: 1
      },
      {
        id: 3,
        nombre: 'Amayra',
        productLength: 15
      },
      {
        id: 4,
        nombre: 'Sarkany',
        productLength: 20
      }
    ];
  }
}
