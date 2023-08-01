import { Marca } from './marca.model';

export class Producto {
  id: number;
  nombre: string;
  descripcion: string;
  disponible: boolean;
  imageURL: string;
  marca: Marca;
  marcaId: number;
  precio: number;
  productoMedidas: ProductoMedidas;
  productoImagenes: ProductoImagen[];
}

export class ProductoMedidas {
  id: number;
  alto: number;
  ancho: number;
  profundidad: number;
  productoId: number;
}

export class ProductoImagen {
  id: number;
  archivoId: number;
  productoId: number;
  isFavourite: boolean;
  isNotFavourite: boolean;
}
