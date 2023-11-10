import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Estado } from 'src/app/Models/estado';
import { DatosReporteServices } from 'src/app/core/DatosReporteServices';
import { Router } from '@angular/router';
import { UsuarioServices } from 'src/app/core/UsuarioServices';
import { ReporteServices } from 'src/app/core/ReportesServices';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verymodicarreporte-tecnico',
  templateUrl: './verymodicarreporte-tecnico.component.html',
  styleUrls: ['./verymodicarreporte-tecnico.component.css'],
  standalone:true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor,
    FormsModule
  ],
})

export class VerymodicarreporteTecnicoComponent {
  mobileQuery: MediaQueryList;
  listaEstados: Estado[] = [];
  selectedEstado: string = '';
  idReporteSeleccionado: string | null | undefined;
  descripcionReporteSeleccionado: string | null | undefined;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _datosReporteServices: DatosReporteServices, private router: Router, private _usuarioServices: UsuarioServices, private _reportesService:ReporteServices) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  obtenerEstados() {
    return this._datosReporteServices.getList().subscribe((data: Estado[]) => {
      console.log(data);
      this.listaEstados = data;
    })
  };

  ngOnInit(): void {
    this.idReporteSeleccionado = sessionStorage.getItem('idReporteSeleccionado');
    this.descripcionReporteSeleccionado = sessionStorage.getItem('descripcionReporteSeleccionado');
    console.log("Llego: "+this.idReporteSeleccionado)
    console.log("Desc: "+this.descripcionReporteSeleccionado)
    this.obtenerEstados();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
