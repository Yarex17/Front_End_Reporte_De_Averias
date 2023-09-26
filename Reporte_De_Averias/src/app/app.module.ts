import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './views/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormularioReporteComponent } from './views/Reporte-averias/formulario-reporte/formulario-reporte.component';
import { InicioComponent} from './views/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    FormularioReporteComponent,

  ],
  imports:[
    AppRoutingModule,
    RouterModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
