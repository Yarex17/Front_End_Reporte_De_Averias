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

    listarReportesPorUsuario(data: any):Observable<Reporte[]>{
      return this.http.get<Reporte[]>("https://localhost:7196/api/TraReportes/ListarTraReportesPorUsuario?idUsuario="+data);
    }

    listarReportesPorUsuarioYEstado(data: any):Observable<Reporte[]>{
      return this.http.post<Reporte[]>("https://localhost:7196/api/TraReportes/ListarTraReportesPorUsuarioYEstado?idUsuario="+data.idUsuario+"&nombreEstado="+data.nombreEstado, data);
    }

    registrarReporte(data: any): Observable<any> {
         console.log(data);
      return this.http.post("https://localhost:7196/api/TraReportes/CrearTraReporte?descripcion="+data.descripcion+"&idUsuario="+data.idUsuario+"&idAdminEdificio="+data.idAdmin, data);
    }

    enviarReporte(data: any): Observable<any> {
      console.log(data);
      return this.http.post("https://localhost:7196/api/TraReportes/EnviarTraReporte?idReporte="+data.idReporte+"&idUsuario="+data.idUsuario, data);
    }

    buscarReporte(data: any):Observable<Reporte>{
      console.log(data);
      return this.http.get<Reporte>("https://localhost:7196/api/TraReportes/BuscarTraReporte?id="+data);
    }

    modificarReporteTecnico(data: any): Observable<any> {
      return this.http.post("https://localhost:7196/api/TraReportes/ModificarReporteTecnico?idReporte="+data.idReporte+"&descripcion="+data.descripcionReporte+"&idEstado="+data.idEstadoReporte, data);
    }

    eliminarReporteTecnico(data: any): Observable<any> {
      return this.http.post("https://localhost:7196/api/TraReportes/EliminarTraReporte?id="+data.idReporte, data);
    }

}