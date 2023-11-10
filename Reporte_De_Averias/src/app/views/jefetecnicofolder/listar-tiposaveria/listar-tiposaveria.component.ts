import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { DatosReporteServices } from 'src/app/core/DatosReporteServices';
import { TipoAveria } from 'src/app/Models/tipoAveria';

@Component({
  selector: 'app-listar-tiposaveria',
  templateUrl: './listar-tiposaveria.component.html',
  styleUrls: ['./listar-tiposaveria.component.css'],
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

export class ListarTiposaveriaComponent implements OnInit{

  mobileQuery: MediaQueryList;
  listaTipoAveria:TipoAveria[]=[];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _datosReporteServices: DatosReporteServices){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  obtenerTiposAveria() {
    return this._datosReporteServices.getListTipoAveria().subscribe((data: TipoAveria[]) => {
      console.log(data);
      this.listaTipoAveria = data;
    })
  };

  eliminarTipoAveria(idTipoAveria: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este tipo de avería?')) {
      this._datosReporteServices.eliminarTipoAveria(idTipoAveria).subscribe((data: any) => {
        console.log('Estado eliminado exitosamente');
        this.obtenerTiposAveria();
      });
    }
  }

  ngOnInit(): void {
    this.obtenerTiposAveria();
  }

  

}
