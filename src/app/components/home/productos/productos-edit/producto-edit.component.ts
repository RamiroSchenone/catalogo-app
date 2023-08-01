import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductImage } from 'src/app/models/image.model';
import { Marca } from 'src/app/models/marca.model';
import { Producto, ProductoImagen } from 'src/app/models/producto.model';
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
      productoMedidas: this.fb.group({
        alto: ['', [Validators.required]],
        ancho: ['', [Validators.required]],
        profundidad: ['', [Validators.required]],
        productoId: [0],
      }),
      productoImagenes: this.fb.array([], [Validators.required]),
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
      productoMedidas: {
        alto: this.entity.productoMedidas.alto.toString().replace('.', ','),
        ancho: this.entity.productoMedidas.ancho.toString().replace('.', ','),
        profundidad: this.entity.productoMedidas.profundidad
          .toString()
          .replace('.', ','),
        productoId: this.entity.productoMedidas.productoId,
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
        newProduct.productoMedidas.alto = +newProduct.productoMedidas.alto
          .toString()
          .replace(',', '.');
        newProduct.productoMedidas.ancho = +newProduct.productoMedidas.ancho
          .toString()
          .replace(',', '.');
        newProduct.productoMedidas.profundidad = +newProduct.productoMedidas.profundidad
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
        this.entity.productoMedidas.alto = +this.entity.productoMedidas.alto
          .toString()
          .replace(',', '.');
        this.entity.productoMedidas.ancho = +this.entity.productoMedidas.ancho
          .toString()
          .replace(',', '.');
        this.entity.productoMedidas.profundidad = +this.entity.productoMedidas.profundidad
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
    const control = this.formGroup.get('productoImagenes') as FormArray;
    control.clear();
    currentImages.forEach((image: any) => {
      var productoImage = new ProductoImagen();

      productoImage.archivoId = image.archivoId;
      productoImage.productoId = this.entity.id;
      productoImage.isFavourite = image.isFavourite ? true: false;
      productoImage.isNotFavourite = image.isNotFavourite ? true : false;

      console.log(productoImage);
      control.push(this.fb.control(productoImage)); // Agrega un nuevo FormControl para cada imagen cargada
    });
    control.markAsDirty();
  }
}
