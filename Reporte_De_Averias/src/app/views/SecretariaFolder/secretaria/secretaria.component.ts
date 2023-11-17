import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Reporte } from 'src/app/Models/reporte';
import { ReporteServices } from 'src/app/core/ReportesServices';
import { EdificioServices } from 'src/app/core/EdificiosServices';
import { Edificio } from 'src/app/Models/edificio';
import { UsuarioServices } from 'src/app/core/UsuarioServices';
import { Usuario } from 'src/app/Models/usuario';
import { LoginService } from 'src/app/core/LoginServices';
import { Router } from '@angular/router';
let dataEdificio: Edificio;
let dataUsuario: Usuario;

@Component({
  selector: 'app-secretaria',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.css'],
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
export class SecretariaComponent implements OnInit{


  mobileQuery: MediaQueryList;
  listaReportes:Reporte[]=[];
  idUsuarioActual: string | null | undefined;

  private _mobileQueryListener: () => void;
  rolValue: string | null | undefined;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices, private _edificiosService: EdificioServices, private _usuarioServices: UsuarioServices, private router:Router, private _loginService:LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    dataEdificio;
    dataUsuario;
  }

  obtenerAnioDesdeFecha(fecha: string | Date): number | null {
   
    const fechaDate = typeof fecha === 'string' ? new Date(fecha) : fecha;

   
    const year = fechaDate.getFullYear();

   
    return !isNaN(year) ? year : null;
  }

  obtenerReportes() {
    return this._reportesService.listarReportesPorUsuario(this.idUsuarioActual).subscribe((data: Reporte[]) => {
      console.log(data);
      this.listaReportes = data;
    })
  };

  obtenerEdificio() {
    this._edificiosService.buscarEdificioPorUsuario(this.idUsuarioActual).subscribe((data: any) => 
    {
      console.log(data);
      dataEdificio = new Edificio(data.tnIdEdificio, data.tcPropietario, data.tcNombre, data.tbActivo, data.tbEliminado);
      if(dataEdificio.tnIdEdificio != null){
        sessionStorage.setItem('edificio', dataEdificio.tnIdEdificio.toString());
        console.log("Edif:"+sessionStorage.getItem('edificio'))
      }
      this.obtenerAdminEdificio();
    });
  }

  editarReporte(idReporte: number) {
    console.log("ID del reporte seleccionado:", idReporte);
  }
  
  obtenerAdminEdificio() {
    const request = {
      idEdificio: sessionStorage.getItem('edificio'),
      rol: "AdminEdificio"
    };
    this._usuarioServices.buscarUsuarioPorEdificioYRol(request).subscribe((data: any) => 
    {
      console.log(data);
      dataUsuario = new Usuario(data.tnIdUsuario, data.tccRol, data.tcNombre, data.tcApellido, data.tcCedula, data.tcContrasennia, data.tcCorreo, data.tbActivo, data.tbEliminado);
      if(dataUsuario.tnIdUsuario != null){
        sessionStorage.setItem('idAdminEdificio', dataUsuario.tnIdUsuario.toString());
        sessionStorage.setItem('nombreAdminEdificio', dataUsuario.tcNombre);
        console.log("id:"+sessionStorage.getItem('idAdminEdificio'))
        console.log("nombre:"+sessionStorage.getItem('nombreAdminEdificio'))
      }
    });
  }

  ngOnInit(): void {
    this.idUsuarioActual = sessionStorage.getItem('id');
    this.rolValue = sessionStorage.getItem('rol');
    this.obtenerReportes();
    this.obtenerEdificio();
    
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}


