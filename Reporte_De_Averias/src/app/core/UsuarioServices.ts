import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';

@Injectable({
    providedIn:'root'
})

export class UsuarioServices{

    constructor(private http:HttpClient){}

    httpOptions1 = {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*"
        }),
        withCredentials: false
    };

    buscarUsuarioPorEdificioYRol(data: any):Observable<Usuario>{
        return this.http.post<Usuario>("https://localhost:7196/api/TraUsuarios/BuscarTraUsarioPorEdificioYRol?idEdificio="+data.idEdificio+"&rol="+data.rol, data);
    }

    buscarJefeTecnico():Observable<Usuario>{
        return this.http.get<Usuario>("https://localhost:7196/api/TraUsuarios/BuscarJefeTecnico");
    }

    buscarTecnicos():Observable<Usuario[]>{
        return this.http.get<Usuario[]>("https://localhost:7196/api/TraUsuarios/BuscarTecnicos");
    }
}