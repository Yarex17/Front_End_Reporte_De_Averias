import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Edificio } from '../../../Models/edificio';
import { EdificioServices } from 'src/app/core/EdificiosServices';
import { FormBuilder, FormGroup,ReactiveFormsModule ,Validators } from '@angular/forms';

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
    ReactiveFormsModule
  ],
})
export class ActualizarEdificioComponent {

  mobileQuery: MediaQueryList;
  formularioEdificio:FormGroup;

  idEdificioSeleccionado: string | null | undefined;
  nombreEdificioSeleccionado: string | null | undefined;
  propietarioEdificioSeleccionado: string | null | undefined;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _edificiosService:EdificioServices, private fb:FormBuilder) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioEdificio = this.fb.group({
      tnIdEdificio:[0],
      tnPropietarioEdificioModificar:["",Validators.required],
      tnNombreEdificioModificar:["",Validators.required],
      tbActivo:[1],
      tbEliminado:[0]
    });
  }

  modificarEdificio(){
    const request = {
      idEdificio: this.idEdificioSeleccionado,
      nombreEdificio: this.formularioEdificio.value.tnNombreEdificioModificar,
      propietarioEdificio: this.formularioEdificio.value.tnPropietarioEdificioModificar
    };
    this._edificiosService.modificarEdificio(request).subscribe((data: any) => {console.log(data);});
  }

  ngOnInit(): void {
    this.idEdificioSeleccionado = sessionStorage.getItem('idEdificioSeleccionado');
    this.nombreEdificioSeleccionado = sessionStorage.getItem('nombreEdificioSeleccionado');
    this.propietarioEdificioSeleccionado = sessionStorage.getItem('propietarioEdificioSeleccionado');
    this.formularioEdificio.patchValue({
      tnIdEdificio: this.idEdificioSeleccionado,
      tnNombreEdificioModificar: this.nombreEdificioSeleccionado,
      tnPropietarioEdificioModificar: this.propietarioEdificioSeleccionado,
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
