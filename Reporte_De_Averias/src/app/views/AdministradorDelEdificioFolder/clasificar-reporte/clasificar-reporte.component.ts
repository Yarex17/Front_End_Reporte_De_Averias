import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Reporte } from 'src/app/Models/reporte';
import { FormBuilder, FormGroup,ReactiveFormsModule ,Validators } from '@angular/forms';
import { ReporteServices } from 'src/app/core/ReportesServices';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';

@Component({
  selector: 'app-clasificar-reporte',
  templateUrl: './clasificar-reporte.component.html',
  styleUrls: ['./clasificar-reporte.component.css'],
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

export class ClasificarReporteComponent implements OnInit{
  mobileQuery: MediaQueryList;
  listaReportes:Reporte[]=[];
  idReporteSeleccionado: string | null | undefined;
  descripcionReporteSeleccionado: string | null | undefined;
  idJefeTecnico: string | null | undefined;


  private _mobileQueryListener: () => void;

  constructor(private _loginService:LoginService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices, private fb:FormBuilder, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }

  enviarReporte(){
    const request = {
      idReporte: this.idReporteSeleccionado,
      idUsuario: this.idJefeTecnico
    };
    alert("El reporte ha sido enviado al jefe técnico");
    this._reportesService.enviarReporte(request).subscribe((data: any) => {
      this.router.navigate(['/administradordeledificio']); 
    });
  }

  ngOnInit(): void {
    this.idReporteSeleccionado = sessionStorage.getItem('idReporteSeleccionado');
    this.descripcionReporteSeleccionado = sessionStorage.getItem('descripcionReporteSeleccionado');
    this.idJefeTecnico = sessionStorage.getItem('idJefeTecnico');
    console.log("Llego: "+this.idReporteSeleccionado)
    console.log("JT: "+this.idJefeTecnico)
  }
}
