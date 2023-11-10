import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosReporteServices } from 'src/app/core/DatosReporteServices';
import { Estado } from 'src/app/Models/estado';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/Alerts/popup/popup.component';
import { Prioridad } from 'src/app/Models/prioridades';

@Component({
  selector: 'app-crear-prioridades',
  templateUrl: './crear-prioridades.component.html',
  styleUrls: ['./crear-prioridades.component.css'],
  standalone:true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor,
    ReactiveFormsModule,
    MatIconModule
  ],
})

export class CrearPrioridadesComponent implements OnInit{
  
  mobileQuery: MediaQueryList;
  formularioEstado:FormGroup;
  listaEstados:Prioridad[]=[];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private fb:FormBuilder, private _datosReporteServices: DatosReporteServices, private dialog: MatDialog){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioEstado=this.fb.group({
      tnIdPrioridad:[0],
      tcNombreEstado:["",Validators.required],
      tbActivo:[1],
      tbEliminado:[0],
    });
  }
  
  registrarEdificio(){
    if (
      !this.formularioEstado.value.tcNombreEstado
    ) {
      this.mostrarPopupCamposEnBlanco();
      return;
    }
    
    const request = {
      nombreEstado: this.formularioEstado.value.tcNombreEstado
    };

    this._datosReporteServices.registrarPrioridad(request).subscribe({
      next:(data) =>{
        console.log(data);
        this.listaEstados.push(data);
        this.formularioEstado.patchValue({
          tcNombreEstado:''
        });
      }, error:(e) =>{}
    });
  }

  obtenerEstados() {
    return this._datosReporteServices.getListPrioridad().subscribe((data: Prioridad[]) => {
      console.log(data);
      this.listaEstados = data;
    })
  };

  mostrarPopupCamposEnBlanco() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '900px',
      height: '600px',
      data: { message: 'Los campos están en blanco' }
    });
  }
  ngOnInit(): void {
    this.obtenerEstados();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
