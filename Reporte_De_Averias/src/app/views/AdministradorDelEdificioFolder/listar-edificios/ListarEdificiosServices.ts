import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Edificio} from './edificio'

@Injectable({
    providedIn:'root'
})

export class ListarEdificioServices{


    constructor(private http:HttpClient){}

    getList():Observable<Edificio[]>{
        return this.http.get<Edificio[]>('https://localhost:7196/api/TraEdificios/ListarTraEdificio');
    }

}