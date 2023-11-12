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
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/Alerts/popup/popup.component';
import { Router } from '@angular/router';
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
  nombreAdminEdificio: string | null | undefined;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices, private fb:FormBuilder, private dialog: MatDialog, private router: Router) {
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
    const descripcionObtenida = this.formularioReporte.value.tcDescripcion;
    if (!descripcionObtenida) {
      this.mostrarPopupCamposEnBlanco();
      return; // No continuar con el registro si hay campos vacíos
    }
    const request = {
      descripcion: this.formularioReporte.value.tcDescripcion,
      idUsuario: this.idUsuarioActual,
      idAdmin: this.idAdminEdificio
    };
    this._reportesService.registrarReporte(request).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/listar_edificio']);
    });
  }

  mostrarPopupCamposEnBlanco() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '900px',
      height:'600px',
      data: { message: 'Los campos están en blanco' }
    });
  }

  ngOnInit(): void {
    this.idUsuarioActual = sessionStorage.getItem('id');
    this.idAdminEdificio = sessionStorage.getItem('idAdminEdificio');
    this.nombreAdminEdificio = sessionStorage.getItem('nombreAdminEdificio');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
