import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Reporte } from 'src/app/Models/reporte';
import { ReporteServices } from 'src/app/core/ReportesServices';

@Component({
  selector: 'app-administrador-del-edifcio',
  templateUrl: './administrador-del-edifcio.component.html',
  styleUrls: ['./administrador-del-edifcio.component.css'],
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
export class AdministradorDelEdifcioComponent {

  mobileQuery: MediaQueryList;
  listaReportes:Reporte[]=[];
  idUsuarioActual: string | null | undefined;
  rolValue: string | null | undefined;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  obtenerReportes() {
    return this._reportesService.listarReportesPorUsuario(this.idUsuarioActual).subscribe((data: Reporte[]) => {
      console.log(data);
      this.listaReportes = data;
    })
  };

  clasificarReporte(idReporte:number){
    sessionStorage.setItem('idReporteSeleccionado', idReporte.toString());
    console.log("RepID:"+sessionStorage.getItem('idReporteSeleccionado'));

    this._reportesService.buscarReporte(sessionStorage.getItem('idReporteSeleccionado')).subscribe((data: any) => 
    {
      if(data.tnIdReporte != null){
        sessionStorage.setItem('descripcionReporteSeleccionado', data.tcDescripcion);
      }
    });

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
