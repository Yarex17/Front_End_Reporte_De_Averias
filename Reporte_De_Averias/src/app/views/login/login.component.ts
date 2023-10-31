import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/Models/login';
import { LoginService } from 'src/app/core/LoginServices';

let dataLogin: Login;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public nombre: string;
  public contra: string;
  public entrar: boolean;

  constructor(private loginService: LoginService, private router:Router ) {
    this.nombre = '';
    this.contra = '';
    this.entrar = false;
    dataLogin;
  }

  ngOnInit(): void {
  }

  buscarUsuario(usuario: string, contrasenna:string) {

    if (usuario.trim().length != 0 && contrasenna.trim().length !=0) {
      this.loginService.buscarUsuario({ usuario, contrasenna }).subscribe((data: any) => {
         dataLogin = new Login(data.usuario,data.contrasenna,data.id)
        if(dataLogin.ID!=null){
          localStorage.setItem('id',dataLogin.ID.toString());
          localStorage.setItem('usuario', dataLogin.Usuario);
          this.router.navigate(["oficina"]);
        }
        
      });
      
    }
    else {
      console.log("Buscar" + usuario.length);
      
    }
  }

  buttonInicioSesion(): void {
    console.log("Nombre" + this.nombre.length);
    this.buscarUsuario(this.nombre, this.contra);
  }

}
