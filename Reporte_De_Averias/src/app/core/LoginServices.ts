import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../Models/login";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) {}



  buscarUsuario(data: any): Observable<Login> {
    console.log(data);
    return this.http.post<Login>("https://localhost:7289/buscarUsuario?usuario="+data.usuario+"&contrasenna="+data.contrasenna,data);
  }

}
