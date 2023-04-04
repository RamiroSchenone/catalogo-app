import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  LocalidadGeoRefApi,
  ProvinciaGeoRefApi,
} from 'src/app/models/geo-ref-api.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FormatPhoneNumberPipe } from 'src/app/pipes/format-phone-number.pipe';
import { GeoRefApiService } from 'src/app/services/geo-ref-api.service';
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

  provinciasGeoRefIsSelected: boolean;
  localidadGeoRefSelected: LocalidadGeoRefApi;
  provinciasGeoRef: any;
  provinciasGeoRefFiltered: any;
  localidadesGeoRef: any[];

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

    this.getProvincias();
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

  subscribeFormGroup() {
    this.formGroup.get('telefono')?.valueChanges.subscribe((val) => {
      const formattedPhoneNumber = this.formatPhoneNumberPipe.transform(val);
      this.formGroup.patchValue(
        { telefono: formattedPhoneNumber },
        { emitEvent: false }
      );
    });

    this.formGroup.get('direccion.provinciaGeoRefId').valueChanges.subscribe(val => {
      this.filterProvincias(val);
    });
  }

  filterProvincias(val: string){
    this.provinciasGeoRefFiltered = this.provinciasGeoRef.filter((provinciaName: any) => {
      return provinciaName.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1;
    })
  }

  initForm() {
    this.formGroup = this.fb.group({
      username: [{ value: '', disabled: true }],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.patternEmail)]],
      telefono: ['', [Validators.required]],
      direccion: this.fb.group({
        direccionNumero: ['', [Validators.required]],
        direccionCalle: ['', [Validators.required]],
        localidadGeoRefId: ['', [Validators.required]],
        provinciaGeoRefId: ['', [Validators.required]],
      }),
    });
  }

  setDataForm() {
    // this.formGroup.reset({
    //   username: this.entity.username,
    //   nombre: this.entity.nombre,
    //   apellido: this.entity.apellido,
    //   email: this.entity.email,
    //   telefono: this.formatPhoneNumberPipe.transform(this.entity.telefono),
    // });
  }

  //------------------------------------------------------Api Geo Ref Argentina----------------------------------------
  provinciaGeoRefChange(provinciaId: any) {
    this.provinciasGeoRefIsSelected = false;
    this.localidadGeoRefSelected = new LocalidadGeoRefApi();
    if (provinciaId != null) {
      this.getProvincia(provinciaId);
      this.getLocalidades(provinciaId);
      this.provinciasGeoRefIsSelected = true;
    }
  }

  localidadGeoRefChange(localidadId: any) {
    if (typeof localidadId === 'string') {
      this.getLocalidad(localidadId);
    }
  }

  // getProvincias() {
  //   this.geoRefApiService.getAllProvincias().subscribe((data: any) => {
  //     this.provinciasGeoRef = data.provincias;
  //     this.provinciasGeoRef = this.provinciasGeoRef.map((provincia: any) => ({
  //       id: provincia.id,
  //       descripcion: provincia.nombre,
  //       position: provincia.centroide,
  //     }));
  //     console.log(this.provinciasGeoRef);
  //   });
  // }

  getProvincias(){
    this.geoRefApiService.getAllProvincias().subscribe(res => {
      this.provinciasGeoRef = res;
      this.provinciasGeoRefFiltered = res;
    });
  }

  getProvincia(provinciaId: any) {
    this.geoRefApiService
      .getProvinciaById(provinciaId)
      .subscribe((data: any) => {
        this.provinciasGeoRefIsSelected = data.provincias[0];
        this.provinciasGeoRefIsSelected = true;
        this.cdr.detectChanges();
      });
  }

  getLocalidades(provinciaId: any) {
    this.geoRefApiService
      .getLocalidadesByProvinciaId(provinciaId)
      .subscribe((data: any) => {
        this.localidadesGeoRef = data.localidades;
        this.localidadesGeoRef = this.localidadesGeoRef.map(
          (localidad: LocalidadGeoRefApi) => ({
            id: localidad.id,
            descripcion: localidad.nombre,
            position: localidad.centroide,
          })
        );
        this.provinciasGeoRefIsSelected = true;
        this.cdr.detectChanges();
      });
  }

  getLocalidad(localidadId: any) {
    this.geoRefApiService
      .getLocalidadById(localidadId)
      .subscribe((data: any) => {
        this.localidadGeoRefSelected = data.localidades[0];
      });
  }
  //------------------------------------------------------Api Geo Ref Argentina----------------------------------------

  onSubmit() {
    console.log(this.formGroup);
    console.log(this.isNew);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
