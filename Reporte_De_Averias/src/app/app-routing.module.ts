import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretariaComponent } from './views/SecretariaFolder/secretaria/secretaria.component';
import { LoginComponent } from './views/login/login.component';
import { CrearReporteComponent } from './views/SecretariaFolder/crear-reporte/crear-reporte.component';
import { ListarReporteComponent } from './views/SecretariaFolder/listar-reporte/listar-reporte.component';
import { JefetecnicoComponent } from './views/jefetecnicofolder/jefetecnico/jefetecnico.component';
import { ListarreporteJefetecnicoComponent } from './views/jefetecnicofolder/listarreporte-jefetecnico/listarreporte-jefetecnico.component';
import { ModificarreporteJefetecnicoComponent } from './views/jefetecnicofolder/modificarreporte-jefetecnico/modificarreporte-jefetecnico.component';

const routes: Routes = [{path : '', component : LoginComponent}
,{path : 'secretaria', component : SecretariaComponent}
,{path : 'login', component : LoginComponent}
,{path : 'crear', component : CrearReporteComponent}
,{path : 'listar', component: ListarReporteComponent}
,{path : 'jefetecnico', component: JefetecnicoComponent}
,{path : 'listarreporte-jefetecnico', component: ListarreporteJefetecnicoComponent}
,{path : 'modificarreporte-jefetecnico', component: ModificarreporteJefetecnicoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
