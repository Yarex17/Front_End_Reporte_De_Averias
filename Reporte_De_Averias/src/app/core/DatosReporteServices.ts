import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Estado } from '../Models/estado';

@Injectable({
    providedIn:'root'
})

export class DatosReporteServices{

    constructor(private http:HttpClient){}

    httpOptions1 = {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*"
        }),
        withCredentials: false
    };

    //crud Estado
    getList():Observable<Estado[]>{
        return this.http.get<Estado[]>('https://localhost:7196/api/TraEstadoes/ListarTraEstados');
    }

    registrarEstado(data: any): Observable<any> {
        return this.http.post('https://localhost:7196/api/TraEstadoes/CrearTraEstado?nombre='+data.nombreEstado, data);
    }

    eliminarEstado(data: any): Observable<any> {
        return this.http.post('https://localhost:7196/api/TraEstadoes/EliminarTraEstado?id='+data,data);
    }

    //crud TipoAveria

    //crud Prioridad

}