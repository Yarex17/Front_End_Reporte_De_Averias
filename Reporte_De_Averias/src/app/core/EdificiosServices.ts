import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Edificio} from '../Models/edificio'

@Injectable({
    providedIn:'root'
})

export class EdificioServices{


    constructor(private http:HttpClient){}
    

    httpOptions1 = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      }),
      withCredentials: false
    };

    getList():Observable<Edificio[]>{
        return this.http.get<Edificio[]>('https://localhost:7196/api/TraEdificios/ListarTraEdificio');
    }

    buscarEdificio(data: any):Observable<Edificio>{
      return this.http.post<Edificio>("https://localhost:7196/api/TraEdificios/BuscarTraEdificio?id="+data, data);
    }

    buscarEdificioPorUsuario(data: any):Observable<Edificio>{
      return this.http.post<Edificio>("https://localhost:7196/api/TraEdificios/BuscarTraEdificioPorUsuario?idUsuario="+data, data);
    }

    registrarEdificio(data: Edificio): Observable<Edificio> {
      return this.http.post<Edificio>('https://localhost:7196/api/TraEdificios/RegistrarTraEdificio',data);
    }

    modificarEdificio(data: Edificio): Observable<any> {
      return this.http.post('https://localhost:7196/api/TraEdificios/ModificarTraEdificio',data);
    }

    eliminarEdificio(data: any): Observable<any> {
      return this.http.post('https://localhost:7196/api/TraEdificios/EliminarTraEdificio',data);
    }

}