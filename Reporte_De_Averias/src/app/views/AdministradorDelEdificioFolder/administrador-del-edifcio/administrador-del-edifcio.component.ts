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
import { DatosReporteServices } from 'src/app/core/DatosReporteServices';
import { Estado } from 'src/app/Models/estado';
import * as XLSX from 'xlsx';


interface ReporteEstado {
  idReporte: number;
  descripcionReporte: string;
  idEstado: number;
  nombreEstado: string;
  fecha:Date;
}





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
  reportesConEstado: ReporteEstado[] =[];
  rolValue: string | null | undefined;
  single: any[] = [];
  listaTotalReportes:Reporte[]=[];
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _reportesService:ReporteServices, private _usuarioServices: UsuarioServices,private router:Router, private _loginService:LoginService, private _datosReporteServices: DatosReporteServices) {
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
    this._reportesService.listarReportesPorUsuario(this.idUsuarioActual).subscribe((data: Reporte[]) => {
      console.log(data);
      this.listaReportes = data;
    });
  };

  obtenerReportesTotales() {
    this._reportesService.getList().subscribe((data: Reporte[]) => {
      console.log(data);
      this.listaTotalReportes = data;
      console.log("dentro: "+this.listaTotalReportes.length);

      for (let index = 0; index < this.listaTotalReportes.length; index++) {
        this._datosReporteServices.buscarEstadoPorReporte(this.listaTotalReportes[index].tnIdReporte).subscribe((data: Estado) => {
          var estado: Estado = data;
          if(estado != null){
            this.reportesConEstado.push({idReporte: this.listaTotalReportes[index].tnIdReporte,
              descripcionReporte: this.listaTotalReportes[index].tcDescripcion,
              idEstado: estado.tnIdEstado,
              nombreEstado: estado.tcNombre, fecha:this.listaTotalReportes[index].tfFecha});
          }else{
            this.reportesConEstado.push({idReporte: this.listaTotalReportes[index].tnIdReporte,
              descripcionReporte: this.listaTotalReportes[index].tcDescripcion,
              idEstado: 0,
              nombreEstado: "Sin asignar",fecha:this.listaTotalReportes[index].tfFecha});
          }//else
        });
      }//for
    });

  }

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
    const nombreMesActual = meses[fechaActual.getMonth()]; 
  
    
    const reportesEnEsteMes = this.listaTotalReportes.filter(reporte => {
      const fechaReporte = new Date(reporte.tfFecha);
      return fechaReporte.getMonth() === fechaActual.getMonth();
    });
  
    const cantidadReportesEnEsteMes = reportesEnEsteMes.length;
  
    
    const content = `
      Cantidad de Reportes Creados en ${nombreMesActual}: ${cantidadReportesEnEsteMes}\n\n
      Detalles de los Reportes:\n
      ${this.listaTotalReportes.map(reporte => `${reporte.tcDescripcion} - ${reporte.tfFecha}`).join('\n')}
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

  private filtrarReportes(ultimosMeses: number): ReporteEstado[] {
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - ultimosMeses);
  
    const reportesFiltrados = this.reportesConEstado.filter(reporte => {
      const fechaReporte = new Date(reporte.fecha);
  
      // Aquí debes buscar el estado en la lista de reportes totales y ajustar la lógica según tus necesidades.
      const reporteTotal = this.reportesConEstado.find(r => r.idReporte === reporte.idReporte);
  
      const cumpleCriterios = (
        reporteTotal &&
        reporteTotal.nombreEstado === 'Finalizado' &&
        fechaReporte >= fechaLimite &&
        fechaReporte <= new Date()
      );
  
      console.log(`Reporte ${reporte.idReporte} - Cumple criterios: ${cumpleCriterios}`);
      return cumpleCriterios;
    });
  
    console.log('Reportes filtrados:', reportesFiltrados);
    return reportesFiltrados;
  }
  
  generarExcel(ultimosMeses: number): void {
    const reportesFiltrados = this.filtrarReportes(ultimosMeses);
  
    console.log('Datos para Excel:', reportesFiltrados);
  
    const data = reportesFiltrados.map(reporte => {
      return {
        Descripcion: reporte.descripcionReporte,
        Fecha: reporte.fecha,
      };
    });
  
    console.log('Datos mapeados para Excel:', data);
  
    const options: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reportes');
  
    XLSX.writeFile(wb, `reportes_${ultimosMeses}_meses.xlsx`);
  }
  
  

  generarReporteCompleto(): void {
    this.generarPDF();
    this.generarExcel(3);
    this.generarExcel(1);
  }
  

  

  ngOnInit(): void {
    this.idUsuarioActual = sessionStorage.getItem('id');
    this.rolValue = sessionStorage.getItem('rol');
    
    this.obtenerReportes();
    console.log(this.obtenerReportesTotales());
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
