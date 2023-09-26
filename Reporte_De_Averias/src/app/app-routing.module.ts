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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
