import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { DatosReporteServices } from 'src/app/core/DatosReporteServices';
import { Prioridad } from 'src/app/Models/prioridades';

@Component({
  selector: 'app-listar-prioridades',
  templateUrl: './listar-prioridades.component.html',
  styleUrls: ['./listar-prioridades.component.css'],
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

export class ListarPrioridadesComponent implements OnInit {
  
  mobileQuery: MediaQueryList;
  listaEstados:Prioridad[]=[];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _datosReporteServices: DatosReporteServices){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  obtenerEstados() {
    return this._datosReporteServices.getListPrioridad().subscribe((data: Prioridad[]) => {
      console.log(data);
      this.listaEstados = data;
    })
  };

  eliminarEdificio(idEstado: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este edificio?')) {
      this._datosReporteServices.eliminarPrioridad(idEstado).subscribe((data: any) => {
        console.log('Estado eliminado exitosamente');
        this.obtenerEstados();
      });
    }
  }

  ngOnInit(): void {
    this.obtenerEstados()
  }

}
