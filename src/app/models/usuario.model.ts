export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  telefono: string;
  usuarioDomicilio: UsuarioDomicilio;
}

export class UsuarioDomicilio {
  id: number;
  usuarioId: number;
  direccionNumero: string;
  direccionCalle: string;
  codigoPostal: number;
  localidadGeoRefId: number;
  localidadGeoRefDescripcion: string;
  provinciaGeoRefId: number;
  provinciaGeoRefDescripcion: string;
}