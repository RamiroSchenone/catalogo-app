import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductImage } from 'src/app/models/image.model';
import { Marca } from 'src/app/models/marca.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { NotificationService } from 'src/app/services/notificaciones.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.scss'],
})
export class ProductoEditComponent implements OnInit {
  formGroup: FormGroup;
  entity: Producto;
  isNew: boolean;
  title: string;
  marcas: Marca[];

  constructor(
    public dialogRef: MatDialogRef<ProductoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.entity = this.data.entity;
    this.isNew = this.data.isNew;

    this.title = this.isNew
      ? 'Agregar producto'
      : `Editar producto (${this.entity.nombre})`;

    this.marcaService.getAll().subscribe((res) => {
      this.marcas = res;
    });

    this.initForm();
    if (!this.isNew) {
      this.setDataForm();
    }
  }
  ngOnInit(): void {}

  errorCampoRequerido(campo: string) {
    return (
      this.formGroup.get(campo).invalid && this.formGroup.get(campo).touched
    );
  }

  initForm() {
    this.formGroup = this.fb.group({
      id: [0],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      disponible: [false, [Validators.required]],
      // imageURL: ['', [Validators.required]],
      marcaId: ['', [Validators.required]],
      medidas: this.fb.group({
        alto: ['', [Validators.required]],
        ancho: ['', [Validators.required]],
        profundidad: ['', [Validators.required]],
        productoId: [0],
      }),
      imagenesProducto: this.fb.array([], [Validators.required]),
    });
  }

  setDataForm() {
    this.formGroup.reset({
      id: this.entity.id,
      nombre: this.entity.nombre,
      precio: this.entity.precio.toString().replace('.', ','),
      descripcion: this.entity.descripcion,
      disponible: this.entity.disponible,
      // imageURL: this.entity.imageURL,
      marcaId: this.entity.marcaId,
      medidas: {
        alto: this.entity.medidas.alto.toString().replace('.', ','),
        ancho: this.entity.medidas.ancho.toString().replace('.', ','),
        profundidad: this.entity.medidas.profundidad
          .toString()
          .replace('.', ','),
        productoId: this.entity.medidas.productoId,
      },
    });
  }

  onlyNumbers(event: KeyboardEvent) {
    const key = event.key;
    const numeric = /^[0-9,]$/.test(key);
    if (!numeric) {
      event.preventDefault();
    }
  }

  onSubmit() {
    var formValue = this.formGroup.value;

    if (this.formGroup.valid) {
      if (this.isNew) {
        var newProduct = new Producto();

        newProduct = formValue;
        newProduct.precio = +newProduct.precio.toString().replace(',', '.');
        newProduct.medidas.alto = +newProduct.medidas.alto
          .toString()
          .replace(',', '.');
        newProduct.medidas.ancho = +newProduct.medidas.ancho
          .toString()
          .replace(',', '.');
        newProduct.medidas.profundidad = +newProduct.medidas.profundidad
          .toString()
          .replace(',', '.');

        this.productoService.post(newProduct).subscribe((res) => {
          this.notificationService.showSuccessMessage(res.message);
          this.dialogRef.close(res.entity);
        }),
          (error: any) => {
            this.notificationService.showErrorMessage(error.message);
          };
      } else {
        this.entity = formValue;
        this.entity.precio = +this.entity.precio.toString().replace(',', '.');
        this.entity.medidas.alto = +this.entity.medidas.alto
          .toString()
          .replace(',', '.');
        this.entity.medidas.ancho = +this.entity.medidas.ancho
          .toString()
          .replace(',', '.');
        this.entity.medidas.profundidad = +this.entity.medidas.profundidad
          .toString()
          .replace(',', '.');

        this.productoService.update(this.entity).subscribe((res) => {
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

  onUploadChange(currentImages: any) {
    const control = this.formGroup.get('imagenesProducto') as FormArray;
    control.clear();
    currentImages.forEach((image: any) => {
      console.log(image);
      control.push(this.fb.control(image)); // Agrega un nuevo FormControl para cada imagen cargada
    });
    control.markAsDirty();
  }
}
