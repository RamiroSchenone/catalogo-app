import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnTable } from 'src/app/models/column-table.model';
import { Usuario } from 'src/app/models/usuario.model';
import { NotificationService } from 'src/app/services/notificaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { TableComponent } from '../../table/table.component';
import { ConfirmationDeleteComponent } from '../../confirmation-delete/confirmation-delete.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  columns: ColumnTable[];
  data: Usuario[];
  title: string;
  entity: string;
  opcionesPaginacion: number[] = [2, 5, 10, 25];
  dataLoaded: boolean = false;

  @ViewChild(TableComponent) table: TableComponent;

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.title = 'Usuarios';
    this.entity = 'Usuario';
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
    this.usuarioService.getAll().subscribe(
      (res) => {
        this.data = res;
        console.log(res);

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
  }

  new() {
    var entity = new Usuario();
    const dialogRef = this.dialog.open(UsuarioEditComponent, {
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

  edit(entity: Usuario) {
    const dialogRef = this.dialog.open(UsuarioEditComponent, {
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

  delete(usuarioId: number) {
    const dialogRef = this.dialog.open(ConfirmationDeleteComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.usuarioService.delete(usuarioId).subscribe(
          (response) => {
            this.notificationService.showSuccessMessage(response.message);

            this.data = this.data.filter((e) => e.id !== usuarioId);
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
