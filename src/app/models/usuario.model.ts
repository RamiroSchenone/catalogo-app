export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  telefono: number;
  direccion: string;
  direccionNumero: string;
  direccionCalle: string;
  fechaCreacion: Date;
  localidadId: number;
  localidad: Localidad;
}

export class Localidad {
  id: number;
  descripcion: string;
  codigoPostal: number;
  provinciaId: number;
  provincia: Provincia;
}

export class Provincia {
    id: number;
    descripcion: string;
}
