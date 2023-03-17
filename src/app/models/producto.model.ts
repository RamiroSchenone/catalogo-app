import { Marca } from "./marca.model";

export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    disponible: boolean;
    imageURL: string;
    marca: Marca;
    marcaId: number;
    precio: number;;
    medidas: Medidas;
}

export class Medidas {
    alto: number;
    ancho: number;
    profundidad: number;
}