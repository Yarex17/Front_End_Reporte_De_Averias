import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Reporte} from '../Models/reporte'

@Injectable({
    providedIn:'root'
})

export class ReporteServices{


    constructor(private http:HttpClient){}

    httpOptions1 = {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*"
        }),
        withCredentials: false
      };

    getList():Observable<Reporte[]>{
        return this.http.get<Reporte[]>('https://localhost:7196/api/TraReportes/ListarTraReportes');
    }

    registrarReporte(data: Reporte): Observable<any> {
         return this.http.post('https://localhost:7196/api/TraReportes/CrearTraReporte',data);
    }

    //   modificarEdificio(data: Oficina): Observable<any> {
    //     return this.http.post('https://localhost:7196/api/TraEdificios/ModificarTraEdificio',data);
    //   }
    //   eliminarEdificio(data: any): Observable<any> {
    //     return this.http.post('https://localhost:7196/api/TraEdificios/EliminarTraEdificio',data);
    //   }

}