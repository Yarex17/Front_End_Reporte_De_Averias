import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretariaComponent } from './views/SecretariaFolder/secretaria/secretaria.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [{path : '', component : LoginComponent}
,{path : 'secretaria', component : SecretariaComponent}
,{path : 'login', component : LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
