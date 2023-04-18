import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  API_URL: string = environment.getApiUrl();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  postFile(fileToUpload: File): Observable<any> {
    const formData = new FormData();
    const url = this.API_URL + 'api/archivos/upload';
    formData.append('file', fileToUpload);
    const headers = new HttpHeaders().append(
      'Content-Disposition',
      'multipart/form-data'
    );

    return this.http.post(url, formData, { headers });
  }

  getBase64ByImage(event: any): Observable<string | ArrayBuffer> {
    return new Observable<string | ArrayBuffer>((observer) => {
      try {
        const unsafeImg = window.URL.createObjectURL(event);
        this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL(event);
        reader.onload = () => {
          observer.next(reader.result);
        };
        reader.onerror = (error) => {
          observer.next(null);
        };
      } catch (e) {
        observer.next(null);
      }
    });
  }
}
