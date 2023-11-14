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
import { LoginService } from 'src/app/core/LoginServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-reporte',
  templateUrl: './listar-reporte.component.html',
  styleUrls: ['./listar-reporte.component.css'],
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
export class ListarReporteComponent {

  mobileQuery: MediaQueryList;
  listaReportes:Reporte[]=[];
  formularioOficina:FormGroup;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices, private fb:FormBuilder,private router:Router, private _loginService:LoginService) {
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

  obtenerReportes() {
    return this._reportesService.getList().subscribe((data: Reporte[]) => {
      console.log(data);
      this.listaReportes = data;
    })
  };

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.obtenerReportes();
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
