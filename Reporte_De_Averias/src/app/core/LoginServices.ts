// login.service.ts
import { HttpClient } from "@angular/common/http";
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

  isAuthenticated(): boolean {
    const id = sessionStorage.getItem('id');
    return !!id;
  }

  logout(): void {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('rol');
  }
}
