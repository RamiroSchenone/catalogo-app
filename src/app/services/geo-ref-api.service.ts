import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

type NewType = Observable<any>;

@Injectable({
  providedIn: 'root',
})
export class GeoRefApiService {
  constructor(protected http: HttpClient, protected router: Router) {}

  geoRefApiUrl: string = environment.getGeoRefApiURL();

  // getAllProvincias(): Observable<any[]> {
  //   const url = this.geoRefApiUrl + '/provincias';
  //   return this.http.get<any>(url).pipe(
  //     catchError((error) => {
  //       if (error.status === 401 || error.status === 403) {
  //         // handle error
  //         console.log(error);
  //       }
  //       return throwError(error);
  //     })
  //   );
  // }

  getAllProvincias() {
    return this.http.get(this.geoRefApiUrl + '/provincias').pipe(
      map((response: any) =>
        response.provincias.map((item: any) => item['nombre'])
      ),
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          // handle error
          console.log(error);
        }
        return throwError(error);
      })
    );
  }

  getLocalidadesByProvinciaId(provinciaId: number): Observable<any[]> {
    const url = `${this.geoRefApiUrl}/localidades?provincia=${provinciaId}&max=1000`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          // handle error
          console.log(error);
        }
        return throwError(error);
      })
    );
  }

  getLocalidadById(localidadId: number): Observable<any[]> {
    const url = `${this.geoRefApiUrl}/localidades?id=${localidadId}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          // handle error
          console.log(error);
        }
        return throwError(error);
      })
    );
  }

  getProvinciaById(provinciaId: number): Observable<any[]> {
    const url = `${this.geoRefApiUrl}/provincias?id=${provinciaId}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          // handle error
          console.log(error);
        }
        return throwError(error);
      })
    );
  }

  responseHandler(response: any): Observable<any> {
    if (response instanceof HttpErrorResponse) {
      switch (response.status) {
        case 0:
          throw new Error(
            'Sin conexión, asegúrate de tener una conexión activa y estable a Internet.'
          );
        case 400:
          const error = response.error;
          const errors =
            error?.errors || (Array.isArray(error) ? error : [error]);
          throw new Error(errors.map((e: any) => e.message).join('\n'));
        case 401:
          throw new Error(
            'Usted no tiene permisos para acceder a la información solicitada.'
          );
        case 404:
          throw new Error('La página solicitada no se ha encontrado.');
        case 500:
          throw new Error('Se produjo un error interno en el servidor.');
        default:
          throw new Error(
            'Se produjo un error en la comunicación con el servidor.'
          );
      }
    } else if (response.success) {
      return response.data;
    } else {
      throw new Error('Ocurrió un error inesperado.');
    }
  }
}
