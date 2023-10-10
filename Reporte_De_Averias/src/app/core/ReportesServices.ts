import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Reporte} from './reporte'

@Injectable({
    providedIn:'root'
})

export class ReporteServices{


    constructor(private http:HttpClient){}

    getList():Observable<Reporte[]>{
        return this.http.get<Reporte[]>('https://localhost:7196/api/TraReportes/ListarTraReportes');
    }

    // registrarEdificio(data: Oficina): Observable<any> {
    //     return this.http.post('https://localhost:7196/api/TraEdificios/RegistrarTraEdificio',data);
    //   }

    //   modificarEdificio(data: Oficina): Observable<any> {
    //     return this.http.post('https://localhost:7196/api/TraEdificios/ModificarTraEdificio',data);
    //   }
    //   eliminarEdificio(data: any): Observable<any> {
    //     return this.http.post('https://localhost:7196/api/TraEdificios/EliminarTraEdificio',data);
    //   }

}