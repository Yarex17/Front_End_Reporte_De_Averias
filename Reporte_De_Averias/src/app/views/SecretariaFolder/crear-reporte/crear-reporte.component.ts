import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Reporte } from 'src/app/core/reporte';
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
  listaEdificios:Reporte[]=[];
  formularioReporte:FormGroup;

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
  }

  crearReporte(){
    const request:Reporte = {
      tnIdReporte:0,
      tcDescripcion: this.formularioReporte.value.tcDescripcion,
      tfFecha: new Date(),
      tbActivo: true,
      tbEliminado: false
    }
    this._reportesService.registrarReporte(request).subscribe({
      next:(data) =>{
        console.log(data);
        this.listaEdificios.push(data);
        this.formularioReporte.patchValue({
          tcDescripcion:''
        });
      }, error:(e) =>{}
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
