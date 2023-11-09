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

    registrarOficina(data: any): Observable<any> {
        return this.http.post("https://localhost:7196/api/TraOficinas/CrearTraOficina?numeroPiso="+data.numeroPisos+"&idEdificio="+data.idEdificio+"", data);
    }

    buscarOficina(data: any):Observable<Oficina>{
        return this.http.post<Oficina>("https://localhost:7196/api/TraOficinas/BuscarTraOficina?id="+data, data);
    }

    modificarOficina(data: any): Observable<any> {
        console.log(data);
        return this.http.post("https://localhost:7196/api/TraOficinas/ModificarOficina?idOficina="+data.idOficina+"&numeroPiso="+data.numeroPiso+"&activa=true", data);
    }

    //   modificarEdificio(data: Oficina): Observable<any> {
    //     return this.http.post('https://localhost:7196/api/TraEdificios/ModificarTraEdificio',data);
    //   }
       eliminarOficina(data: any): Observable<any> {
         return this.http.post('https://localhost:7196/api/TraOficinas/EliminarTraOficina?id='+data,data);
       }

}