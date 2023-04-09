import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ColumnTable } from 'src/app/models/column-table.model';
import { Producto } from 'src/app/models/producto.model';
import { TableComponent } from '../../table/table.component';
import { NotificationService } from 'src/app/services/notificaciones.service';
import { ProductoService } from 'src/app/services/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductoEditComponent } from './productos-edit/producto-edit.component';
import { ConfirmationDeleteComponent } from '../../confirmation-delete/confirmation-delete.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  columns: ColumnTable[];
  data: Producto[] = [];
  dataLoaded: boolean = false;
  title: string;
  entity: string;
  opcionesPaginacion: number[] = [5, 10, 25, 50];

  @ViewChild(TableComponent) table: TableComponent;

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private productoService: ProductoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productoService.getAll().subscribe(
      (res) => {
        this.data = res;

        if (this.data.length == 0) {
          this.notificationService.showErrorMessage(
            'Hubo un error con la base de datos. No se encontraron registros.'
          );
        }

        this.dataLoaded = true;
        this.cdr.detectChanges();
      },
      (error) => {
        this.dataLoaded = true;
        this.notificationService.showErrorMessage(error.message);
      }
    );

    this.title = 'Productos';
    this.entity = 'Producto';
    this.columns = [
      {
        name: 'id',
        property: 'id',
        label: 'Id',
      },
      {
        name: 'nombre',
        property: 'nombre',
        label: 'Nombre',
      },
      {
        name: 'precio',
        property: 'precio',
        label: 'Precio',
      },
      {
        name: 'estadoStock',
        property: 'disponible',
        label: 'Estado',
      },
    ];
  }

  new() {
    var entity = new Producto();
    const dialogRef = this.dialog.open(ProductoEditComponent, {
      data: {
        entity: entity,
        isNew: true,
      },
    });
    dialogRef.afterClosed().subscribe((res?) => {
      if (res) {
        this.data.push(res);
        this.table.refreshData(this.data);
        this.cdr.detectChanges();
      }
    });
  }

  edit(entity: Producto) {
    const dialogRef = this.dialog.open(ProductoEditComponent, {
      data: {
        entity: entity,
        isNew: false,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      let index = this.data.findIndex((e) => e.id === res.id);

      if (index !== -1) {
        this.data[index] = res;

        this.table.refreshData(this.data);
        this.cdr.detectChanges();
      }
    });
  }

  delete(productoId: number) {
    const dialogRef = this.dialog.open(ConfirmationDeleteComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.productoService.delete(productoId).subscribe(
          (response) => {
            this.notificationService.showSuccessMessage(response.message);

            this.data = this.data.filter((e) => e.id !== productoId);
            this.table.refreshData(this.data);
          },
          (error: any) => {
            this.notificationService.showErrorMessage(error.message);
          }
        );
      }
    });
  }
}
