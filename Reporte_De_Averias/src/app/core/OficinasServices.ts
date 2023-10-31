import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Oficina} from '../Models/oficina'

@Injectable({
    providedIn:'root'
})

export class OficinaServices{


    constructor(private http:HttpClient){}

    getList():Observable<Oficina[]>{
        return this.http.get<Oficina[]>('https://localhost:7196/api/TraOficinas/ListarTraOficinasPorTraEdificio');
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