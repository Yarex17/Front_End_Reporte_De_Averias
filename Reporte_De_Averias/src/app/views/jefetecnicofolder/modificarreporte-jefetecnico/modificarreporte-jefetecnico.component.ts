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
import { UsuarioServices } from 'src/app/core/UsuarioServices';
import { Usuario } from 'src/app/Models/usuario';
import { ReporteServices } from 'src/app/core/ReportesServices';

interface Tecnico {
  id: number;
  nombre: string;
  seleccionado: boolean;
}

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
  listaTecnicos:Usuario[] = [];
  tecnicos: Tecnico[] = [];
  selectedEstado: string = ''; // Variable para almacenar el estado seleccionado
  selectedPrioridad: string = ''; // Variable para almacenar la prioridad seleccionada
  selectedTipoAveria: string = ''; // Variable para almacenar el tipo de averÃ­a seleccionado
  idReporteSeleccionado: string | null | undefined;
  descripcionReporteSeleccionado: string | null | undefined;

  tecnicosSeleccionados: Tecnico[] = [];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _datosReporteServices: DatosReporteServices, private router: Router, private _usuarioServices: UsuarioServices, private _reportesService:ReporteServices) {
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

  obtenerTecnicos() {
    return this._usuarioServices.buscarTecnicos().subscribe((data: Usuario[]) => {
      console.log(data);
      this.listaTecnicos = data;
      for (let i = 0; i < this.listaTecnicos.length; i++) {
        this.tecnicos.push({id: this.listaTecnicos[i].tnIdUsuario, nombre: this.listaTecnicos[i].tcNombre, seleccionado: false});
      }
    });
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
    });
    this.tecnicosSeleccionados = this.tecnicos.filter(tecnico => tecnico.seleccionado);
    for (let i = 0; i < this.tecnicosSeleccionados.length; i++) {
      const request = {
        idReporte: this.idReporteSeleccionado,
        idUsuario: this.tecnicosSeleccionados[i].id
      };
      this._reportesService.enviarReporte(request).subscribe((data: any) => {
        console.log(data);
      });
    }
    this.router.navigate(['/jefetecnico']); // Redirección aquí

  }

  ngOnInit(): void {
    this.idReporteSeleccionado = sessionStorage.getItem('idReporteSeleccionado');
    this.descripcionReporteSeleccionado = sessionStorage.getItem('descripcionReporteSeleccionado');
    console.log("Llego: "+this.idReporteSeleccionado)
    this.obtenerEstados();
    this.obtenerPrioridades();
    this.obtenerTiposAveria();
    this.obtenerTecnicos();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}