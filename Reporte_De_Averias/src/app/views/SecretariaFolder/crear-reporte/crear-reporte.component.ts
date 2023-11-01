import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Reporte } from 'src/app/Models/reporte';
import { FormBuilder, FormGroup,ReactiveFormsModule ,Validators } from '@angular/forms';
import { ReporteServices } from 'src/app/core/ReportesServices';
@Component({
  selector: 'app-crear-reporte',
  templateUrl: './crear-reporte.component.html',
  styleUrls: ['./crear-reporte.component.css'],
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
export class CrearReporteComponent {

  mobileQuery: MediaQueryList;
  listaReportes:Reporte[]=[];
  formularioReporte:FormGroup;

  idUsuarioActual: string | null | undefined;
  idAdminEdificio: string | null | undefined;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices, private fb:FormBuilder) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioReporte=this.fb.group({
      tnIdReporte:[0],
      tcDescripcion:["",Validators.required],
      tfFecha:[11111111],
      tbActivo:[1],
      tbEliminado:[0]
    });
    this.idUsuarioActual = sessionStorage.getItem('id');
  }

  crearReporte(){
    const request = {
      descripcion: this.formularioReporte.value.tcDescripcion,
      idUsuario: this.idUsuarioActual
    };
    this._reportesService.registrarReporte(request).subscribe((data: any) => {console.log(data);});
  }

  ngOnInit(): void {
    this.idUsuarioActual = sessionStorage.getItem('id');
    this.idAdminEdificio = sessionStorage.getItem('nombreAdminEdificio');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
