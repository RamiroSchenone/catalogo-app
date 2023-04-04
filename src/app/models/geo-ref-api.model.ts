export class ProvinciaGeoRefApi {
    id: number;
    descripcion: string;
    position: any
  }
  
  export class LocalidadGeoRefApi {
    id: number;
    categoria: string;
    centroide: any;
    departamento: any;
    localidadCensal: any;
    municipio: any;
    nombre: string;
    provincia: ProvinciaGeoRefApi;
  }
  