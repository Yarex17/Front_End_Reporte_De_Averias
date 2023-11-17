import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Reporte } from 'src/app/Models/reporte';
import { ReporteServices } from 'src/app/core/ReportesServices';
import { UsuarioServices } from 'src/app/core/UsuarioServices';
import { Usuario } from 'src/app/Models/usuario';
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';

@Component({
  selector: 'app-administrador-del-edifcio',
  templateUrl: './administrador-del-edifcio.component.html',
  styleUrls: ['./administrador-del-edifcio.component.css'],
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
export class AdministradorDelEdifcioComponent {

  mobileQuery: MediaQueryList;
  listaReportes:Reporte[]=[];
  idUsuarioActual: string | null | undefined;
  rolValue: string | null | undefined;
  single: any[] = [];
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices, private _usuarioServices: UsuarioServices,private router:Router, private _loginService:LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }

  clasificarReporte(idReporte:number){
    sessionStorage.setItem('idReporteSeleccionado', idReporte.toString());
    console.log("RepID:"+sessionStorage.getItem('idReporteSeleccionado'));

    this._reportesService.buscarReporte(sessionStorage.getItem('idReporteSeleccionado')).subscribe((data: any) => 
    {
      if(data.tnIdReporte != null){
        sessionStorage.setItem('descripcionReporteSeleccionado', data.tcDescripcion);
      }
    });

    this._usuarioServices.buscarJefeTecnico().subscribe((data: Usuario) => 
    {
      if(data.tnIdUsuario != null){
        sessionStorage.setItem('idJefeTecnico', data.tnIdUsuario.toString());
      }
    });

  }

  generarPDF(): void {
    const options = {
      margin: 10,
      filename: 'reportes.pdf',
      html2canvas: { scale: 5 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
  
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    const fechaActual = new Date();
    const nombreMesActual = meses[fechaActual.getMonth()]; // Obtener el nombre del mes actual
  
    // Filtrar los reportes que fueron creados en el mismo mes
    const reportesEnEsteMes = this.listaReportes.filter(reporte => {
      const fechaReporte = new Date(reporte.tfFecha);
      return fechaReporte.getMonth() === fechaActual.getMonth();
    });
  
    const cantidadReportesEnEsteMes = reportesEnEsteMes.length;
  
    // Construir el contenido del PDF
    const content = `
      Cantidad de Reportes Creados en ${nombreMesActual}: ${cantidadReportesEnEsteMes}\n\n
      Detalles de los Reportes:\n
      ${this.listaReportes.map(reporte => `${reporte.tcDescripcion} - ${reporte.tfFecha}`).join('\n')}
    `;
  
    const container = document.createElement('div');
    container.innerText = content;
  
    html2pdf()
      .from(container)
      .set(options)
      .outputPdf('datauristring')
      .then((pdfString: string) => {
        const newWindow = window.open();
        newWindow!.document.write('<iframe width="100%" height="100%" src="' + pdfString + '"></iframe>');
      });
  }

  ngOnInit(): void {
    this.idUsuarioActual = sessionStorage.getItem('id');
    this.rolValue = sessionStorage.getItem('rol');
    
    this.obtenerReportes();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
