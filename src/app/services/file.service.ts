import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
 private url: string = ''; 
 //private url: string = 'http://localhost:3000';
  userToken: string;
  headers: any;
  headersUp: any;
  headersN: any;

  

  constructor(private http: HttpClient) {
    this.leerToken();
    this.headers = new HttpHeaders({
      'token':`${this.userToken}`,
      'Content-Type': 'application/json'
    });

      this.headersUp = new HttpHeaders({
      'token':`${this.userToken}`,
       "mimeType": "multipart/form-data"
     
    });

    this.headersN = new HttpHeaders({
      'token':`${this.userToken}`,
      'Content-Type': "application/x-www-form-urlencoded"
    });
            
   }

   downloadFileCompliance(data:any): Observable<any>{
    let json = JSON.stringify(data);
    let params = "json="+ json;

  
  	return this.http.post(`${this.url}/reporteCompliance`,params, {headers: this.headersN , responseType: 'blob'});
  }



  downloadFile(): Observable<any>{
		return this.http.get(`${this.url}/reporteSolicitudes`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileSolEst(estadoId:string): Observable<any>{
		return this.http.get(`${this.url}/reporteSolicitudesEst/${estadoId}`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileRep(): Observable<any>{
		return this.http.get(`${this.url}/reporteRepresentantes`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileRepCon(nit:string): Observable<any>{
		return this.http.get(`${this.url}/reporteRepresentantesCon/${nit}`,{headers: this.headers, responseType: 'blob'});
  }


  downloadFileUsers(): Observable<any>{
		return this.http.get(`${this.url}/reporteUsers`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileContrapartes(): Observable<any>{
		return this.http.get(`${this.url}/reporteContrapartes`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileCargos():Observable<any>{
  return this.http.get(`${this.url}/reporteCargos`,{headers: this.headers, responseType: 'blob' });
  }

  downloadFileCausales(): Observable<any>{
		return this.http.get(`${this.url}/reporteCausales`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileEjecutivos(): Observable<any>{
		return this.http.get(`${this.url}/reporteEjecutivos`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileTipoId(): Observable<any>{
		return this.http.get(`${this.url}/reporteTiposIdentificacion`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileTipoSolicitud(): Observable<any>{
		return this.http.get(`${this.url}/reporteTiposSolicitud`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFilePaises(): Observable<any>{
		return this.http.get(`${this.url}/reportePaises`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileDepartamentos(): Observable<any>{
		return this.http.get(`${this.url}/reporteDepartamentos`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileMunicipios(): Observable<any>{
		return this.http.get(`${this.url}/reporteMunicipios`, {headers: this.headers , responseType: 'blob'});
  }

  downloadFileEstados(): Observable<any>{
		return this.http.get(`${this.url}/reporteEstados`, {headers: this.headers , responseType: 'blob'});
  }

  uploadFileTablas(formData: FormData): Observable<any>{
    return this.http.post(`${this.url}/uploads`, formData,{headers: this.headersUp})
 
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
