import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import { NotificationService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-marca-edit',
  templateUrl: './marca-edit.component.html',
  styleUrls: ['./marca-edit.component.scss'],
})
export class MarcaEditComponent implements OnInit {
  entity: Marca;
  isNew: boolean;
  title: string;

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MarcaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private notificationService: NotificationService
  ) {
    this.entity = this.data.entity;
    this.isNew = this.data.isNew;

    this.title = this.isNew ? 'Agregar marca' : `Editar marca (${this.entity.nombre})`;

    this.initForm();
  }

  ngOnInit(): void {}

  get nombreInvalido() {
    return (
      this.formGroup.get('nombre')?.invalid &&
      this.formGroup.get('nombre')?.touched
    );
  }

  initForm() {
    this.formGroup = this.fb.group({
      nombre: [this.entity.nombre, [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.formGroup);
    console.log(this.isNew);

    if(this.formGroup.valid){
      if (this.isNew) {
        this.marcaService.post(this.formGroup.value).subscribe((res) => {
          this.notificationService.showSuccessMessage(res.message);
          this.dialogRef.close(res.entity);
        }),
          (error: any) => {
            this.notificationService.showErrorMessage(error.message);
          };
      }else{
        this.entity.nombre = this.formGroup.value.nombre;

        this.marcaService.update(this.entity).subscribe((res) => {
          this.notificationService.showSuccessMessage(res.message);
          this.dialogRef.close(res.entity);
        }),
          (error: any) => {
            this.notificationService.showErrorMessage(error.message);
          };
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
