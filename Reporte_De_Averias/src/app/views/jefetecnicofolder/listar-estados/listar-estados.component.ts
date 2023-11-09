import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosReporteServices } from 'src/app/core/DatosReporteServices';
import { Estado } from 'src/app/Models/estado';


@Component({
  selector: 'app-listar-estados',
  templateUrl: './listar-estados.component.html',
  styleUrls: ['./listar-estados.component.css'],
  standalone:true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor
  ],
})
export class ListarEstadosComponent implements OnInit {
  
  mobileQuery: MediaQueryList;
  formularioEdificio:FormGroup;
  listaEstados:Estado[]=[];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private fb:FormBuilder, private _datosReporteServices: DatosReporteServices){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioEdificio=this.fb.group({
      TnIdEdificio:[0,Validators.required],
      TcPropietario:["",Validators.required],
      TcNombre:["",Validators.required],
      TbActivo:[1,Validators.required],
      TbEliminado:[1,Validators.required],
    });
  }
  
  obtenerEstados() {
    return this._datosReporteServices.getList().subscribe((data: Estado[]) => {
      console.log(data);
      this.listaEstados = data;
    })
  };

  ngOnInit(): void {
    this.obtenerEstados()
  }

}
