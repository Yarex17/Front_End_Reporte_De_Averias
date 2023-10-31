import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reporte } from '../../../Models/reporte';
import {ReporteServices} from '../../../core/ReportesServices';

@Component({
  selector: 'app-listarreporte-jefetecnico',
  templateUrl: './listarreporte-jefetecnico.component.html',
  styleUrls: ['./listarreporte-jefetecnico.component.css'],
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
export class ListarreporteJefetecnicoComponent {

  mobileQuery: MediaQueryList;
  listaReportes:Reporte[]=[];
  formularioOficina:FormGroup;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices, private fb:FormBuilder) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioOficina=this.fb.group({
      TnIdOficina:[0,Validators.required],
      TnNumeroPiso:[0,Validators.required],
      TbActivo:[1,Validators.required],
      TbEliminado:[1,Validators.required],
    });
  }

  obtenerTareas() {
    return this._reportesService.getList().subscribe((data: Reporte[]) => {
      console.log(data);
      this.listaReportes = data;
    })
  };
  ngOnInit(): void {
    this.obtenerTareas();
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
