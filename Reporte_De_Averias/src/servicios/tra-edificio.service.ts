import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Edificio } from 'src/app/Models/edificio';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TraEdificioService {
  urlAPI: string = environment.urlAPI;
  constructor(private http: HttpClient) { console.log('Servicio HTTP'); }
//respuesta tipo string
  httpOptions1 = {
    headers: new HttpHeaders({
      "mimeType": "multipart/form-data",
      "Access-Control-Allow-Origin": "*"
    }),
    withCredentials: false,
    responseType: 'text' as 'json'
  }; // respuesta tipo json
  httpOptions2 = {
    headers: new HttpHeaders({
      "mimeType": "multipart/form-data",
      "Access-Control-Allow-Origin": "*"
    }),
    withCredentials: false
  };

  getEdificios(): Observable<Edificio[]> {
    return this.http.get<Edificio[]>(this.urlAPI + "ListarTraEdificio", this.httpOptions2
    );
  }
  registrarEdificio(data: Edificio): Observable<any> {
    return this.http.post(this.urlAPI + 'RegistrarTraEdificio', this.httpOptions1);
  }
}
