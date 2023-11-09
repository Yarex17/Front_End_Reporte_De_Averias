import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
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
  listaEstados:Estado[]=[];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _datosReporteServices: DatosReporteServices){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  obtenerEstados() {
    return this._datosReporteServices.getList().subscribe((data: Estado[]) => {
      console.log(data);
      this.listaEstados = data;
    })
  };

  eliminarEdificio(idEstado: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este edificio?')) {
      this._datosReporteServices.eliminarEstado(idEstado).subscribe((data: any) => {
        console.log('Estado eliminado exitosamente');
        this.obtenerEstados();
      });
    }
  }

  ngOnInit(): void {
    this.obtenerEstados()
  }

}
