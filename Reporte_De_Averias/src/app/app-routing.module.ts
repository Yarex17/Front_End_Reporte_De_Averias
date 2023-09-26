import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretariaComponent } from './views/secretaria/secretaria.component';
import { LoginComponent } from './views/login/login.component';
import {InicioComponent} from './views/inicio/inicio.component';
import { FormularioReporteComponent } from './views/Reporte-averias/formulario-reporte/formulario-reporte.component';

const routes: Routes = [
  {path:'', component: LoginComponent },

 // {path:'inicio', component: InicioComponent,children:[

   // {path:'crearreporte', component:FormularioReporteComponent}
   
 // ]},
  // {path:'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
