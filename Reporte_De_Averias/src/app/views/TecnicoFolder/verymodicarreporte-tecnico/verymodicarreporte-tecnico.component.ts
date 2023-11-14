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
import { FormBuilder, FormGroup,ReactiveFormsModule ,Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/LoginServices';

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
    FormsModule,
    ReactiveFormsModule
  ],
})

export class VerymodicarreporteTecnicoComponent {
  mobileQuery: MediaQueryList;
  formulariomodificarReporteTecnico:FormGroup;
  listaEstados: Estado[] = [];
  selectedEstado: string = '';
  idReporteSeleccionado: string | null | undefined;
  descripcionReporteSeleccionado: string | null | undefined;

  private _mobileQueryListener: () => void;

  constructor(private _loginService:LoginService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _datosReporteServices: DatosReporteServices, private router: Router, private _usuarioServices: UsuarioServices, private _reportesService:ReporteServices, private fb:FormBuilder) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formulariomodificarReporteTecnico=this.fb.group({
      tnIdReporte:[0],
      tcDescripcionNueva:["",Validators.required],
      tbActivo:[1],
      tbEliminado:[0]
    });
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }

  obtenerEstadoFinalizado() {
    const request = {
      estado:"Finalizado"
    }
    return this._datosReporteServices.buscarEstadoPorNombre(request).subscribe((data: Estado) => {
      console.log(data);
      this.listaEstados[0] = data;
    })
  };

  modificarReporteTecnico(){
    const request = {
      idReporte: this.idReporteSeleccionado,
      descripcionReporte: this.formulariomodificarReporteTecnico.value.tcDescripcionNueva,
      idEstadoReporte: this.selectedEstado
    };

    this._reportesService.modificarReporteTecnico(request).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/tecnico']);
    });

  }

  ngOnInit(): void {
    this.idReporteSeleccionado = sessionStorage.getItem('idReporteSeleccionado');
    this.descripcionReporteSeleccionado = sessionStorage.getItem('descripcionReporteSeleccionado');
    console.log("Llego: "+this.idReporteSeleccionado)
    console.log("Desc: "+this.descripcionReporteSeleccionado)
    this.formulariomodificarReporteTecnico.patchValue({
      tcDescripcionNueva: this.descripcionReporteSeleccionado
    });
    this.obtenerEstadoFinalizado();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
