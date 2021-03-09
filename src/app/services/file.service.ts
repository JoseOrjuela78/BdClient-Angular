import { Injectable } from '@angular/core';
import {Http, ResponseContentType, Headers } from '@angular/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
 //private url: string = ''; 
 private url: string = 'http://localhost:3000';
  userToken: string;
  headers: any;
  

  

  constructor(private http: Http) {
    this.leerToken();
    this.headers = new Headers({
      'token':`${this.userToken}`,
      'Content-Type': 'application/json'
    });
            
   }


  downloadFile(): Observable<any>{
		return this.http.get(`${this.url}/reporteSolicitudes`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileSolEst(estadoId:string): Observable<any>{
		return this.http.get(`${this.url}/reporteSolicitudesEst/${estadoId}`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileRep(): Observable<any>{
		return this.http.get(`${this.url}/reporteRepresentantes`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileRepCon(nit:string): Observable<any>{
		return this.http.get(`${this.url}/reporteRepresentantesCon/${nit}`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }


  downloadFileUsers(): Observable<any>{
		return this.http.get(`${this.url}/reporteUsers`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileContrapartes(): Observable<any>{
		return this.http.get(`${this.url}/reporteContrapartes`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileCargos():Observable<any>{
  return this.http.get(`${this.url}/reporteCargos`,{headers: this.headers, responseType: ResponseContentType.Blob });
  }

  downloadFileCausales(): Observable<any>{
		return this.http.get(`${this.url}/reporteCausales`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileEjecutivos(): Observable<any>{
		return this.http.get(`${this.url}/reporteEjecutivos`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileTipoId(): Observable<any>{
		return this.http.get(`${this.url}/reporteTiposIdentificacion`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileTipoSolicitud(): Observable<any>{
		return this.http.get(`${this.url}/reporteTiposSolicitud`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFilePaises(): Observable<any>{
		return this.http.get(`${this.url}/reportePaises`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileDepartamentos(): Observable<any>{
		return this.http.get(`${this.url}/reporteDepartamentos`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileMunicipios(): Observable<any>{
		return this.http.get(`${this.url}/reporteMunicipios`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  downloadFileEstados(): Observable<any>{
		return this.http.get(`${this.url}/reporteEstados`, {headers: this.headers, responseType: ResponseContentType.Blob});
  }

  uploadFileTablas(tipo: String, formData: FormData): Observable<any>{
    return this.http.put(`${this.url}/upload/${tipo}`, formData,{headers: this.headers,})
 
  }

  leerToken(){

    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
     return this.userToken;
  
    }

}
