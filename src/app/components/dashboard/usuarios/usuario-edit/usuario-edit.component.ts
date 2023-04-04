import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.model';
import { FormatPhoneNumberPipe } from 'src/app/pipes/format-phone-number.pipe';
import { MarcaService } from 'src/app/services/marca.service';
import { NotificationService } from 'src/app/services/notificaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss'],
})
export class UsuarioEditComponent implements OnInit {
  formGroup: FormGroup;
  entity: Usuario;
  isNew: boolean;
  title: string;

  patternEmail: string = environment.getEmailPattern();

  constructor(
    public dialogRef: MatDialogRef<UsuarioEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private notificationService: NotificationService,
    private formatPhoneNumberPipe: FormatPhoneNumberPipe
  ) {
    this.entity = this.data.entity;
    this.isNew = this.data.isNew;

    this.title = this.isNew
      ? 'Agregar usuario'
      : `Editar usuario (${this.entity.username})`;

    this.initForm();
    this.setDataForm();
    this.subscribeFormGroup();
  }

  ngOnInit(): void {}

  get emailInvalido() {
    return (
      this.formGroup.get('email')?.invalid &&
      this.formGroup.get('email')?.touched
    );
  }

  get controls() {
    return this.formGroup.controls;
  }

  subscribeFormGroup() {
    this.formGroup.get('telefono')?.valueChanges.subscribe((val) => {
      const formattedPhoneNumber = this.formatPhoneNumberPipe.transform(val);
      this.formGroup.patchValue({ telefono: formattedPhoneNumber }, { emitEvent: false });
    });
  }

  initForm() {
    this.formGroup = this.fb.group({
      username: [{ value: '', disabled: true }],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccionCalle: ['', [Validators.required]],
      direccionNumero: ['', [Validators.required]],
      email: ['', [Validators.pattern(this.patternEmail)]],
      telefono: ['', [Validators.required]],
    });
  }

  setDataForm() {
    this.formGroup.reset({
      nombre: this.entity.nombre,
      username: this.entity.username,
      apellido: this.entity.apellido,
      direccionCalle: this.entity.direccionCalle,
      direccionNumero: this.entity.direccionNumero,
      email: this.entity.email,
      telefono: this.formatPhoneNumberPipe.transform(this.entity.telefono),
    });
  }

  onSubmit() {
    console.log(this.formGroup);
    console.log(this.isNew);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
