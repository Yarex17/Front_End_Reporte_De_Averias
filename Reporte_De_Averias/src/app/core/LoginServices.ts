import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../Models/login";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) {
    console.log('Servicio HTTP');
  }



  buscarUsuario(data: any): Observable<Login> {
    return this.http.post<Login>("https://localhost:7275/buscarUsuario",data);
  }

}
