import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf, NgFor } from '@angular/common';
import { Estado } from 'src/app/Models/estado';
import { DatosReporteServices } from 'src/app/core/DatosReporteServices';
import { Prioridad } from 'src/app/Models/prioridades';
import { TipoAveria } from 'src/app/Models/tipoAveria';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificarreporte-jefetecnico',
  templateUrl: './modificarreporte-jefetecnico.component.html',
  styleUrls: ['./modificarreporte-jefetecnico.component.css'],
  standalone: true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor,
    FormsModule
    
  ],
})
export class ModificarreporteJefetecnicoComponent {

  mobileQuery: MediaQueryList;
  listaEstados: Estado[] = [];
  listaPrioridades: Prioridad[] = [];
  listaTipoAveria: TipoAveria[] = [];
  selectedEstado: string = ''; // Variable para almacenar el estado seleccionado
  selectedPrioridad: string = ''; // Variable para almacenar la prioridad seleccionada
  selectedTipoAveria: string = ''; // Variable para almacenar el tipo de averÃ­a seleccionado
  idReporteSeleccionado: string | null | undefined;
  descripcionReporteSeleccionado: string | null | undefined;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _datosReporteServices: DatosReporteServices, private router: Router) {
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

  obtenerPrioridades() {
    return this._datosReporteServices.getListPrioridad().subscribe((data: Prioridad[]) => {
      console.log(data);
      this.listaPrioridades = data;
    })
  };

  obtenerTiposAveria() {
    return this._datosReporteServices.getListTipoAveria().subscribe((data: TipoAveria[]) => {
      console.log(data);
      this.listaTipoAveria = data;
    })
  };

  agregarDatosReporte(){
    const request = {
      idReporte: this.idReporteSeleccionado,
      tipoAveriaReporte: this.selectedTipoAveria,
      prioridadReporte: this.selectedPrioridad,
      estadoReporte: this.selectedEstado
    };

    this._datosReporteServices.asignarDatosReportes(request).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/jefetecnico']); // Redirección aquí
    });

    


  }

  ngOnInit(): void {
    this.idReporteSeleccionado = sessionStorage.getItem('idReporteSeleccionado');
    this.descripcionReporteSeleccionado = sessionStorage.getItem('descripcionReporteSeleccionado');
    console.log("Llego: "+this.idReporteSeleccionado)
    this.obtenerEstados();
    this.obtenerPrioridades();
    this.obtenerTiposAveria();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}