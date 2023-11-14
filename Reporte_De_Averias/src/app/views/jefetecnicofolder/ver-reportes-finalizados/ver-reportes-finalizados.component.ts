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
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';

@Component({
  selector: 'app-ver-reportes-finalizados',
  templateUrl: './ver-reportes-finalizados.component.html',
  styleUrls: ['./ver-reportes-finalizados.component.css'],
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

export class VerReportesFinalizadosComponent implements OnInit{
  
  mobileQuery: MediaQueryList;
  listaReportes:Reporte[]=[];
  idUsuarioActual: string | null | undefined;
  rolValue: string | null | undefined;
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices,private router:Router, private _loginService:LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }

  obtenerReportesFinalizados() {
    const request = {
      idUsuario: this.idUsuarioActual,
      nombreEstado: "Finalizado"
    };

    return this._reportesService.listarReportesPorUsuarioYEstado(request).subscribe((data: Reporte[]) => {
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

  ngOnInit(): void {
    this.idUsuarioActual = sessionStorage.getItem('id');
    this.obtenerReportesFinalizados();
  }

}
