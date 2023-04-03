import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnTable } from 'src/app/models/column-table.model';
import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import { NotificationService } from 'src/app/services/notificaciones.service';
import { MarcaEditComponent } from './marca-edit/marca-edit.component';
import { TableComponent } from '../../table/table.component';
import { ConfirmationDeleteComponent } from '../../confirmation-delete/confirmation-delete.component';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent implements OnInit {
  columns: ColumnTable[];
  data: Marca[] = [];
  dataSource: any;
  dataLoaded: boolean = false;
  title: string;
  entity: string;
  opcionesPaginacion: number[] = [5, 10, 25, 50];

  @ViewChild(TableComponent) table: TableComponent;

  constructor(
    private marcaService: MarcaService,
    private notifactionService: NotificationService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.marcaService.getAll().subscribe(
      (res) => {
        this.data = res;

        if (this.data.length == 0) {
          this.notifactionService.showErrorMessage(
            'Hubo un error con la base de datos. No se encontraron registros.'
          );
        }

        this.dataLoaded = true;
        this.cdr.detectChanges();
      },
      (error) => {
        this.dataLoaded = true;
        this.notifactionService.showErrorMessage(error.message);
      }
    );

    this.title = 'Marcas';
    this.entity = 'Marca';
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
    ];
  }

  new() {
    var entity = new Marca();
    const dialogRef = this.dialog.open(MarcaEditComponent, {
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

  edit(entity: Marca) {
    const dialogRef = this.dialog.open(MarcaEditComponent, {
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

  delete(marcaId: number) {
    const dialogRef = this.dialog.open(ConfirmationDeleteComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.marcaService.delete(marcaId).subscribe(
          (response) => {
            this.notifactionService.showSuccessMessage(response.message);

            this.data = this.data.filter((e) => e.id !== marcaId);
            this.table.refreshData(this.data);
          },
          (error: any) => {
            this.notifactionService.showErrorMessage(error.message);
          }
        );
      }
    });
  }
}
