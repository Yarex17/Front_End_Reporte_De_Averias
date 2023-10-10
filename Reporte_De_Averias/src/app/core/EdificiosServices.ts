import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Edificio} from './edificio'

@Injectable({
    providedIn:'root'
})

export class EdificioServices{


    constructor(private http:HttpClient){}

    getList():Observable<Edificio[]>{
        return this.http.get<Edificio[]>('https://localhost:7196/api/TraEdificios/ListarTraEdificio');
    }

    registrarEdificio(data: Edificio): Observable<any> {
        return this.http.post('https://localhost:7196/api/TraEdificios/RegistrarTraEdificio',data);
      }

      modificarEdificio(data: Edificio): Observable<any> {
        return this.http.post('https://localhost:7196/api/TraEdificios/ModificarTraEdificio',data);
      }
      eliminarEdificio(data: any): Observable<any> {
        return this.http.post('https://localhost:7196/api/TraEdificios/EliminarTraEdificio',data);
      }

}