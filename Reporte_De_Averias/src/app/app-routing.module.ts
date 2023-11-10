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
import { EliminarEdificioComponent } from './views/AdministradorDelEdificioFolder/eliminar-edificio/eliminar-edificio.component';
import { EliminarOficinaComponent } from './views/AdministradorDelEdificioFolder/eliminar-oficina/eliminar-oficina.component';
import { ActualizarOficinaComponent } from './views/AdministradorDelEdificioFolder/actualizar-oficina/actualizar-oficina.component';
import { CrearRolComponent } from './views/AdministradorDelEdificioFolder/crear-rol/crear-rol.component';
import { ListarEstadosComponent } from './views/jefetecnicofolder/listar-estados/listar-estados.component';
import { CrearEstadoComponent } from './views/jefetecnicofolder/crear-estado/crear-estado.component';
import { CrearPrioridadesComponent } from './views/jefetecnicofolder/crear-prioridades/crear-prioridades.component';
import { ListarPrioridadesComponent } from './views/jefetecnicofolder/listar-prioridades/listar-prioridades.component';
import { ListarTiposaveriaComponent } from './views/jefetecnicofolder/listar-tiposaveria/listar-tiposaveria.component';
import { CrearTipoaveriaComponent } from './views/jefetecnicofolder/crear-tipoaveria/crear-tipoaveria.component';


const routes: Routes = [{path : '', component : LoginComponent}
,{path : 'secretaria', component : SecretariaComponent}
,{path : 'login', component : LoginComponent}
,{path : 'crear', component : CrearReporteComponent}
,{path : 'listar', component: ListarReporteComponent}
,{path : 'jefetecnico', component: JefetecnicoComponent}
,{path : 'listarreporte-jefetecnico', component: ListarreporteJefetecnicoComponent}
,{path : 'modificarreporte-jefetecnico', component: ModificarreporteJefetecnicoComponent}
,{path : 'administradordeledificio', component: AdministradorDelEdifcioComponent}
,{path : 'listar_edificio', component:ListarEdificiosComponent}
,{path : 'listar_oficina', component:  ListarOficinasComponent}
,{path : 'tecnico', component: TecnicoComponent}
,{path : 'listarreporte-tecnico', component: ListarreporteTecnicoComponent}
,{path : 'modificarreporte-tecnico', component: VerymodicarreporteTecnicoComponent}
,{path : 'registrarOficina', component: RegistrarOficinaComponent}
,{path : 'registrarEdificio', component: RegistrarEdificioComponent}
,{path : 'crearUsuario', component: CrearUsuarioComponent}
,{path : 'actualizarEdificio', component: ActualizarEdificioComponent}
,{path : 'eliminarEdificio', component: EliminarEdificioComponent}
,{path : 'eliminarOficina', component: EliminarOficinaComponent}
,{path : 'actualizarOficina', component: ActualizarOficinaComponent}
,{path : 'listar_estado', component: ListarEstadosComponent}
,{path : 'crearEstado', component: CrearEstadoComponent}
,{path : 'crear-rol', component: CrearRolComponent}
,{path : 'crear-prioridad', component: CrearPrioridadesComponent}
,{path : 'listar_prioridad', component: ListarPrioridadesComponent}
,{path : 'listar_tipoAveria', component: ListarTiposaveriaComponent}
,{path : 'crear_tipoAveria', component: CrearTipoaveriaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
