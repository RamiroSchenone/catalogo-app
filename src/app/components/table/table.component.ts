import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnTable } from 'src/app/models/column-table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  columnsName: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() data?: any;
  @Input() columns: ColumnTable[];
  @Input() title: string;
  @Input() entity: string;
  @Input() showColumnAction?: boolean = false;
  @Input() opcionesPaginacion: number[] = [5];

  @Output() editItem: EventEmitter<any> = new EventEmitter();
  @Output() newItem: EventEmitter<any> = new EventEmitter();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.columnsName = this.columns.map((column) => column.name);
    if (this.showColumnAction) {
      this.columnsName.push('acciones');
    }
    this.dataSource = new MatTableDataSource(this.data);
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  new() {
    this.newItem.emit();
  }

  edit(entity: any) {
    this.editItem.emit(entity);
  }

  delete(entity: any) {
    this.deleteItem.emit(entity.id);
  }

  refreshData(data: any){
    this.dataSource = new MatTableDataSource(data);
  }
}
