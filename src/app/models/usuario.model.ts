export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  telefono: string;
  domicilioId: number;
  domicilio: Domicilio;
  fechaCreacion: Date;
}

export class Domicilio {
  id: number;
  direccionNumero: string;
  direccionCalle: string;
  localidadGeoRefId: number;
  localidadGeoRefDescripcion: string;
  provinciaGeoRefId: number;
  provinciaGeoRefDescripcion: string;
}