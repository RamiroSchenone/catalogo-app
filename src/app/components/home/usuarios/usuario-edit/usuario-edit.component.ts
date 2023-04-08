import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.model';
import { FormatPhoneNumberPipe } from 'src/app/pipes/format-phone-number.pipe';
import { GeoRefApiService } from 'src/app/services/geo-ref-api.service';
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

  provincias: any;
  provinciaSelected: any;
  provinciasDescription: any;
  provinciasDescriptionFiltered: any;

  localidades: any;
  localidadSelected: any;
  localidadesDescription: any;
  localidadesDescriptionFiltered: any;

  constructor(
    public dialogRef: MatDialogRef<UsuarioEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private notificationService: NotificationService,
    private geoRefApiService: GeoRefApiService,
    private cdr: ChangeDetectorRef,
    private formatPhoneNumberPipe: FormatPhoneNumberPipe
  ) {
    this.entity = this.data.entity;
    this.isNew = this.data.isNew;

    this.title = this.isNew
      ? 'Agregar usuario'
      : `Editar usuario (${this.entity.username})`;

    this.initForm();
    this.subscribeFormGroup();
    if (this.isNew) {
      this.disabledControls();
    } else {
      this.setDataForm();
      if (this.entity.usuarioDomicilio.localidadGeoRefId) {
        this.getLocalidades(this.entity.usuarioDomicilio.provinciaGeoRefId);
      }
    }
    this.getProvincias();
  }

  ngOnInit(): void {}

  get localidadControl() {
    return this.formGroup.get('direccion.localidadGeoRefDescripcion');
  }

  get provinciaControl() {
    return this.formGroup.get('direccion.provinciaGeoRefDescripcion');
  }

  get telefonoControl() {
    return this.formGroup.get('telefono');
  }

  errorCampoRequerido(campo: string) {
    return (
      this.formGroup.get(campo).invalid && this.formGroup.get(campo).touched
    );
  }

  initForm() {
    this.formGroup = this.fb.group({
      username: [{ value: '', disabled: true }],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.patternEmail)]],
      telefono: ['', [Validators.required]],
      direccion: this.fb.group({
        usuarioId: [''],
        direccionNumero: ['', [Validators.required]],
        direccionCalle: ['', [Validators.required]],
        codigoPostal: ['', [Validators.required]],
        provinciaGeoRefId: [''],
        provinciaGeoRefDescripcion: ['', [Validators.required]],
        localidadGeoRefId: [''],
        localidadGeoRefDescripcion: ['', [Validators.required]],
      }),
    });
  }

  setDataForm() {
    this.formGroup.reset({
      username: this.entity.username,
      nombre: this.entity.nombre,
      apellido: this.entity.apellido,
      email: this.entity.email,
      telefono: this.formatPhoneNumberPipe.transform(this.entity.telefono),
      direccion: {
        usuarioId: this.entity.usuarioDomicilio.usuarioId,
        direccionNumero: this.entity.usuarioDomicilio.direccionNumero,
        direccionCalle: this.entity.usuarioDomicilio.direccionCalle,
        codigoPostal: this.entity.usuarioDomicilio.codigoPostal,
        provinciaGeoRefDescripcion:
          this.entity.usuarioDomicilio.provinciaGeoRefDescripcion,
        localidadGeoRefDescripcion:
          this.entity.usuarioDomicilio.localidadGeoRefDescripcion,
      },
    });
  }

  disabledControls() {
    this.localidadControl.disable({ emitEvent: false });
  }

  subscribeFormGroup() {
    this.telefonoControl.valueChanges.subscribe((val) => {
      if (val == '' || val == null) {
        return;
      }
      const formattedPhoneNumber = this.formatPhoneNumberPipe.transform(val);
      this.formGroup.patchValue(
        { telefono: formattedPhoneNumber },
        { emitEvent: false }
      );
    });

    this.provinciaControl.valueChanges.subscribe((val) => {
      if (val == '' || val == null) {
        return;
      }
      this.filterProvincias(val);
    });

    this.localidadControl.valueChanges.subscribe((val) => {
      if (val == '' || val == null) {
        return;
      }
      this.filterLocalidades(val);
    });
  }

  filterProvincias(val: string) {
    this.provinciasDescriptionFiltered = this.provinciasDescription.filter(
      (provinciaDescription: any) => {
        return (
          provinciaDescription
            .toLocaleLowerCase()
            .indexOf(val.toLocaleLowerCase()) > -1
        );
      }
    );
  }

  filterLocalidades(val: string) {
    this.localidadesDescriptionFiltered = this.localidadesDescription.filter(
      (localidadDescription: any) => {
        return (
          localidadDescription
            .toLocaleLowerCase()
            .indexOf(val.toLocaleLowerCase()) > -1
        );
      }
    );
  }

  getProvincias() {
    this.geoRefApiService.getAllProvincias().subscribe((data: any) => {
      this.provincias = data.provincias;
      this.provinciasDescription = this.provincias.map(
        (item: any) => item['nombre']
      );
      this.provinciasDescriptionFiltered = this.provinciasDescription;
    });
  }

  getLocalidades(provinciaId: any) {
    this.geoRefApiService
      .getLocalidadesByProvinciaId(provinciaId)
      .subscribe((data: any) => {
        this.localidades = data.localidades;
        this.localidadesDescription = this.localidades.map(
          (item: any) => item['nombre']
        );
        this.localidadesDescriptionFiltered = this.localidadesDescription;
      });
  }

  onProvinciaSelected(event?: KeyboardEvent, click: boolean = false) {
    if (event?.key === 'Enter' || click) {
      event?.preventDefault();
      this.provinciaSelected = this.provincias.find(
        (provincia: any) => provincia.nombre === this.provinciaControl.value
      );
      this.localidadControl.enable();
      this.localidadControl.setValue(null);
      this.getLocalidades(this.provinciaSelected.id);
      this.getProvincias();
      this.cdr.detectChanges();
    }
  }

  onLocalidadSelected() {
    this.getLocalidades(this.provinciaSelected.id);
  }

  onlyNumbers(event: KeyboardEvent) {
    const key = event.key;
    const numeric = /^[0-9]$/.test(key);
    if (!numeric) {
      event.preventDefault();
    }
  }

  onSubmit() {
    var formValue = this.formGroup.value;

    this.provinciaSelected = this.provincias.find(
      (provincia: any) => provincia.nombre === this.provinciaControl.value
    );

    this.localidadSelected = this.localidades.find(
      (localidad: any) => localidad.nombre === this.localidadControl.value
    );

    if (this.formGroup.valid) {
      if (this.isNew) {
        var newUser = new Usuario();

        newUser.id = 0;
        newUser.username = formValue.username;
        newUser.nombre = formValue.nombre;
        newUser.apellido = formValue.apellido;
        newUser.email = formValue.email;
        newUser.telefono = formValue.telefono;

        newUser.usuarioDomicilio = formValue.direccion;
        newUser.usuarioDomicilio.usuarioId = newUser.id;
        newUser.usuarioDomicilio.provinciaGeoRefId = this.provinciaSelected.id;
        newUser.usuarioDomicilio.localidadGeoRefId = this.localidadSelected.id;
        newUser.usuarioDomicilio.codigoPostal =
          +newUser.usuarioDomicilio.codigoPostal;

        this.usuarioService.post(newUser).subscribe((res) => {
          this.notificationService.showSuccessMessage(res.message);
          this.dialogRef.close(res.entity);
        }),
          (error: any) => {
            this.notificationService.showErrorMessage(error.message);
          };
      } else {
        this.entity.nombre = formValue.nombre;
        this.entity.apellido = formValue.apellido;
        this.entity.email = formValue.email;
        this.entity.telefono = formValue.telefono;

        this.entity.usuarioDomicilio = formValue.direccion;
        this.entity.usuarioDomicilio.provinciaGeoRefId =
          this.provinciaSelected.id;
        this.entity.usuarioDomicilio.localidadGeoRefId =
          this.localidadSelected.id;

        this.usuarioService.update(this.entity).subscribe((res) => {
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
