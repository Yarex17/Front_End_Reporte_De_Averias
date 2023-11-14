import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Reporte } from 'src/app/Models/reporte';
import { ReporteServices } from 'src/app/core/ReportesServices';
import { EdificioServices } from 'src/app/core/EdificiosServices';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';


let dataReporteSeleccionado:Reporte;

@Component({
  selector: 'app-jefetecnico',
  templateUrl: './jefetecnico.component.html',
  styleUrls: ['./jefetecnico.component.css'],
  standalone:true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor,
  ],
})
export class JefetecnicoComponent implements OnInit {

  mobileQuery: MediaQueryList;
  listaReportes:Reporte[]=[];
  idUsuarioActual: string | null | undefined;
  rolValue: string | null | undefined;

  private _mobileQueryListener: () => void;


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices,private router:Router, private _loginService:LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    dataReporteSeleccionado;
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }


  obtenerReportes() {
    return this._reportesService.listarReportesPorUsuario(this.idUsuarioActual).subscribe((data: Reporte[]) => {
      console.log(data);
      this.listaReportes = data;
    })
  };

  editarReporte(idReporte:number){
    sessionStorage.setItem('idReporteSeleccionado', idReporte.toString());

    this._reportesService.buscarReporte(sessionStorage.getItem('idReporteSeleccionado')).subscribe((data: any) => 
    {
      if(data.tnIdReporte != null){
        sessionStorage.setItem('descripcionReporteSeleccionado', data.tcDescripcion);
      }
    });

  }

  eliminarReporte(idReporte:number){
    sessionStorage.setItem('idReporteSeleccionado', idReporte.toString());
    const request = {
      idReporte: sessionStorage.getItem('idReporteSeleccionado'),
    };
    if (confirm('¿Estás seguro de que deseas eliminar este Reporte?')) {
      this._reportesService.eliminarReporteTecnico(request).subscribe((data: any) => {});
    }
    
  }

  ngOnInit(): void {
    this.idUsuarioActual = sessionStorage.getItem('id');
    this.rolValue = sessionStorage.getItem('rol');
    this.obtenerReportes();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
