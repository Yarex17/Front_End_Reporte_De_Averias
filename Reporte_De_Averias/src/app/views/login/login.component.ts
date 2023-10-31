import { LocalizedString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
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

  buttonInicioSesion(): void {
    if (this.nombre !== null) {
      this.entrar = true;
    }
  
    if (this.entrar) {
      console.log("Nombre" + this.nombre);
      console.log("Contrasennia" + this.contra);
      this.buscarUsuario(this.nombre, this.contra);
    }
  }
  
  buscarUsuario(usuario: string, contrasenna:string ) {
    if (usuario.trim().length != 0 && contrasenna.trim().length !=0) {
      this.loginService.buscarUsuario({usuario,contrasenna}).subscribe((data: any) => {
        console.log(data);
        dataLogin = new Login(data.usuario,data.contrasenna,data.id,data.rol)
        if (dataLogin.ID != null) {
       
          sessionStorage.setItem('id', dataLogin.ID.toString());
          sessionStorage.setItem('usuario', dataLogin.usuario);
          sessionStorage.setItem('rol', dataLogin.rol);
       
          if(dataLogin.rol==="JefeTecnico"){

            this.router.navigate(['/jefetecnico']); 
          }else if(dataLogin.rol==="Secretaria"){
            this.router.navigate(['/secretaria']); 
          }else if(dataLogin.rol==="Tecnico"){
            this.router.navigate(['/tecnico']); 
          }else if(dataLogin.rol==="AdminEdificio"){
            this.router.navigate(['/administradordeledificio']); 
          }
          
          
          
        } else {
          console.log("El nombre de usuario o la contraseña son incorrectos");
        }
      });
    }
    else {
      console.log("Buscar" + usuario.length);
    }
  } //buscarUsuario

}
