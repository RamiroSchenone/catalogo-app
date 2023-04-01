import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment'
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export const ENTITY_NAME = new InjectionToken<string>('entityName');

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  API_URL: string = environment.getApiUrl();

  constructor(
		protected http: HttpClient,
    @Inject(ENTITY_NAME) protected entityName: string,
		protected router: Router,
	) {}

  getHttpHeaders(){
    // const authToken = 'miTokenDeAutenticacion';
    return {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${authToken}`
    }
  }

  getAll(): Observable<any>{
    const headers = this.getHttpHeaders();
    return this.http
      .get(this.API_URL + this.entityName, {
        headers: headers,
      })
      .pipe(catchError(this.responseHandler.bind(this)));
  }

  // update(entity: T): Observable<any> {
  //   const authToken = 'miTokenDeAutenticacion';
  //   const httpHeaders = {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${authToken}`
  //   };
  //   const headers = httpHeaders;
  //   return this.http
  //     .post(this.API_URL + '/update', entity, {
  //       headers: headers,
  //     })
  //     .pipe(catchError(this.responseHandler.bind(this)));
  // }

	// find(query: any): Observable<any> {
  //   // faltan los headers

	// 	if (query) {
	// 		return this.http
	// 			.get<any>(this.API_URL, { headers })
	// 			.pipe(catchError(this.responseHandler.bind(this)));
	// 	} else {
	// 		return this.http
	// 			.get<any>(this.getBaseApiUrl(), { headers })
	// 			.pipe(catchError(this.responseHandler.bind(this)));
	// 	}
	// }

	// getAll(): Observable<QueryResultsModel> {
	// 	const query: QueryParamsModel = { searchText: '', page: 0, pageSize: 19999, orderBy: '', descendingOrder: false };
	// 	return this.find(query);
	// }

	// searchCriteria(criteria: any): Observable<QueryResultsModel> {
	// 	const headers = this.httpUtils.getHTTPHeaders();
	// 	const url = this.getBaseApiUrl() + '?' + this.httpUtils.urlParam(criteria);
	// 	return this.http
	// 		.get<QueryResultsModel>(url, { headers })
	// 		.pipe(catchError(this.responseHandler.bind(this)));
	// }

	// getById(Id: number): Observable<T> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const headers = httpHeaders;
	// 	let url = this.getBaseApiUrl();
	// 	return this.http
	// 		.get<T>(url + `/${Id}`, { headers })
	// 		.pipe(catchError(this.responseHandler.bind(this)));
	// }

	// delete(id: any): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const headers = httpHeaders;
	// 	const url = `${this.getBaseApiUrl()}/${id}`;
	// 	return this.http
	// 		.delete<any>(url, { headers })
	// 		.pipe(catchError(this.responseHandler.bind(this)));
	// }

	// post(url: string = '', entity: T): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const headers = httpHeaders;
	// 	return this.http
	// 		.post(this.getBaseApiUrl() + url, entity, {
	// 			headers: headers,
	// 		})
	// 		.pipe(catchError(this.responseHandler.bind(this)));
	// }

  responseHandler(response: any): Observable<any> {
    if (response instanceof HttpErrorResponse) {
      switch (response.status) {
        case 0:
          throw new Error('Sin conexión, asegúrate de tener una conexión activa y estable a Internet.');
        case 400:
          const error = response.error;
          const errors = error?.errors || (Array.isArray(error) ? error : [error]);
          throw new Error(errors.map((e: any) => e.message).join('\n'));
        case 401:
          throw new Error('Usted no tiene permisos para acceder a la información solicitada.');
        case 404:
          throw new Error('La página solicitada no se ha encontrado.');
        case 500:
          throw new Error('Se produjo un error interno en el servidor.');
        default:
          throw new Error('Se produjo un error en la comunicación con el servidor.');
      }
    } else if (response.success) {
      return response.data;
    } else {
      throw new Error('Ocurrió un error inesperado.');
    }
  }
}
