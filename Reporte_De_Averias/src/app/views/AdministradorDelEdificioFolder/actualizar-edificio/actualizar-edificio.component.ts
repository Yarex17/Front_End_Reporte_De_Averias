import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Edificio } from '../../../Models/edificio';

@Component({
  selector: 'app-actualizar-edificio',
  templateUrl: './actualizar-edificio.component.html',
  styleUrls: ['./actualizar-edificio.component.css'],
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
export class ActualizarEdificioComponent {

  mobileQuery: MediaQueryList;

  idEdificioSeleccionado: string | null | undefined;
  nombreEdificioSeleccionado: string | null | undefined;
  propietarioEdificioSeleccionado: string | null | undefined;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnInit(): void {
    this.idEdificioSeleccionado = sessionStorage.getItem('idEdificioSeleccionado');
    this.nombreEdificioSeleccionado = sessionStorage.getItem('nombreEdificioSeleccionado');
    this.propietarioEdificioSeleccionado = sessionStorage.getItem('propietarioEdificioSeleccionado');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
