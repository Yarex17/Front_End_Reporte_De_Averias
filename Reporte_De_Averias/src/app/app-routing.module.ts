import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretariaComponent } from './views/SecretariaFolder/secretaria/secretaria.component';
import { LoginComponent } from './views/login/login.component';
import { CrearReporteComponent } from './views/SecretariaFolder/crear-reporte/crear-reporte.component';
import { ListarReporteComponent } from './views/SecretariaFolder/listar-reporte/listar-reporte.component';
import { JefetecnicoComponent } from './views/jefetecnicofolder/jefetecnico/jefetecnico.component';
import { ListarreporteJefetecnicoComponent } from './views/jefetecnicofolder/listarreporte-jefetecnico/listarreporte-jefetecnico.component';
import { ModificarreporteJefetecnicoComponent } from './views/jefetecnicofolder/modificarreporte-jefetecnico/modificarreporte-jefetecnico.component';

import { AdministradorDelEdifcioComponent } from './views/AdministradorDelEdificioFolder/administrador-del-edifcio/administrador-del-edifcio.component';
import { ListarEdificiosComponent } from './views/AdministradorDelEdificioFolder/listar-edificios/listar-edificios.component';
import { ListarOficinasComponent } from './views/AdministradorDelEdificioFolder/listar-oficinas/listar-oficinas.component';

import { TecnicoComponent } from './views/TecnicoFolder/tecnico/tecnico.component';
import { ListarreporteTecnicoComponent } from './views/TecnicoFolder/listarreporte-tecnico/listarreporte-tecnico.component';
import { VerymodicarreporteTecnicoComponent } from './views/TecnicoFolder/verymodicarreporte-tecnico/verymodicarreporte-tecnico.component';
import { RegistrarEdificioComponent } from './views/AdministradorDelEdificioFolder/registrar-edificio/registrar-edificio.component';
import { RegistrarOficinaComponent } from './views/AdministradorDelEdificioFolder/registrar-oficina/registrar-oficina.component';
import { CrearUsuarioComponent } from './views/AdministradorDelEdificioFolder/crear-usuario/crear-usuario.component';
import { ActualizarEdificioComponent } from './views/AdministradorDelEdificioFolder/actualizar-edificio/actualizar-edificio.component';
import { ActualizarOficinaComponent } from './views/AdministradorDelEdificioFolder/actualizar-oficina/actualizar-oficina.component';
import { CrearRolComponent } from './views/AdministradorDelEdificioFolder/crear-rol/crear-rol.component';
import { ListarEstadosComponent } from './views/jefetecnicofolder/listar-estados/listar-estados.component';
import { CrearEstadoComponent } from './views/jefetecnicofolder/crear-estado/crear-estado.component';
import { CrearPrioridadesComponent } from './views/jefetecnicofolder/crear-prioridades/crear-prioridades.component';
import { ListarPrioridadesComponent } from './views/jefetecnicofolder/listar-prioridades/listar-prioridades.component';
import { ListarTiposaveriaComponent } from './views/jefetecnicofolder/listar-tiposaveria/listar-tiposaveria.component';
import { CrearTipoaveriaComponent } from './views/jefetecnicofolder/crear-tipoaveria/crear-tipoaveria.component';
import { ClasificarReporteComponent } from './views/AdministradorDelEdificioFolder/clasificar-reporte/clasificar-reporte.component';
import { VerReportesFinalizadosComponent } from './views/jefetecnicofolder/ver-reportes-finalizados/ver-reportes-finalizados.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [{path : '', component : LoginComponent, canActivate: [AuthGuard]}
,{path : 'secretaria', component : SecretariaComponent, canActivate: [AuthGuard]}
,{path : 'login', component : LoginComponent}
,{path : 'crear', component : CrearReporteComponent, canActivate: [AuthGuard]}
,{path : 'listar', component: ListarReporteComponent, canActivate: [AuthGuard]}
,{path : 'jefetecnico', component: JefetecnicoComponent, canActivate: [AuthGuard]}
,{path : 'listarreporte-jefetecnico', component: ListarreporteJefetecnicoComponent, canActivate: [AuthGuard]}
,{path : 'modificarreporte-jefetecnico', component: ModificarreporteJefetecnicoComponent, canActivate: [AuthGuard]}
,{path : 'administradordeledificio', component: AdministradorDelEdifcioComponent, canActivate: [AuthGuard]}
,{path : 'listar_edificio', component:ListarEdificiosComponent, canActivate: [AuthGuard]}
,{path : 'listar_oficina', component:  ListarOficinasComponent, canActivate: [AuthGuard]}
,{path : 'tecnico', component: TecnicoComponent, canActivate: [AuthGuard]}
,{path : 'listarreporte-tecnico', component: ListarreporteTecnicoComponent, canActivate: [AuthGuard]}
,{path : 'modificarreporte-tecnico', component: VerymodicarreporteTecnicoComponent, canActivate: [AuthGuard]}
,{path : 'registrarOficina', component: RegistrarOficinaComponent, canActivate: [AuthGuard]}
,{path : 'registrarEdificio', component: RegistrarEdificioComponent, canActivate: [AuthGuard]}
,{path : 'crearUsuario', component: CrearUsuarioComponent, canActivate: [AuthGuard]}
,{path : 'actualizarEdificio', component: ActualizarEdificioComponent, canActivate: [AuthGuard]}
,{path : 'actualizarOficina', component: ActualizarOficinaComponent, canActivate: [AuthGuard]}
,{path : 'listar_estado', component: ListarEstadosComponent, canActivate: [AuthGuard]}
,{path : 'crearEstado', component: CrearEstadoComponent, canActivate: [AuthGuard]}
,{path : 'crear-rol', component: CrearRolComponent, canActivate: [AuthGuard]}
,{path : 'crear-prioridad', component: CrearPrioridadesComponent, canActivate: [AuthGuard]}
,{path : 'listar_prioridad', component: ListarPrioridadesComponent, canActivate: [AuthGuard]}
,{path : 'listar_tipoAveria', component: ListarTiposaveriaComponent, canActivate: [AuthGuard]}
,{path : 'crear_tipoAveria', component: CrearTipoaveriaComponent, canActivate: [AuthGuard]}
,{path : 'clasificar_reporte', component: ClasificarReporteComponent, canActivate: [AuthGuard]}
,{path : 'ver-reportesFinalizados', component: VerReportesFinalizadosComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
