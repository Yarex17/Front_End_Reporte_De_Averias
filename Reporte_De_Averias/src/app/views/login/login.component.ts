// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Login } from 'src/app/Models/login';
import { LoginService } from 'src/app/core/LoginServices';
import { DialogComponent } from '../../Alerts/dialog/dialog.component';

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
  public error: boolean = false;

  constructor(private loginService: LoginService, private router: Router, public dialog: MatDialog) {
    this.nombre = '';
    this.contra = '';
    this.entrar = false;
    dataLogin;
  }

  ngOnInit(): void {}

  buttonInicioSesion(): void {
    if (this.nombre.trim().length === 0 || this.contra.trim().length === 0) {
      this.error = true;
      return;
    }

    this.error = false;

    console.log("Nombre" + this.nombre);
    console.log("Contrasennia" + this.contra);
    this.buscarUsuario(this.nombre, this.contra);
  }

  buscarUsuario(usuario: string, contrasenna: string) {
    if (usuario.trim().length !== 0 && contrasenna.trim().length !== 0) {
      this.loginService.buscarUsuario({ usuario, contrasenna }).subscribe((data: any) => {
        console.log(data);
        dataLogin = new Login(data.usuario, data.contrasenna, data.id, data.rol);
        if (dataLogin.ID != null) {
          sessionStorage.setItem('id', dataLogin.ID.toString());
          sessionStorage.setItem('usuario', dataLogin.usuario);
          sessionStorage.setItem('rol', dataLogin.rol);
          if (dataLogin.rol === "JefeTecnico") {
            this.router.navigate(['/jefetecnico']);
          } else if (dataLogin.rol === "Secretaria") {
            this.router.navigate(['/secretaria']);
          } else if (dataLogin.rol === "Tecnico") {
            this.router.navigate(['/tecnico']);
          } else if (dataLogin.rol === "AdminEdificio") {
            this.router.navigate(['/administradordeledificio']);
          }
        } else {
          console.log("El nombre de usuario o la contraseña son incorrectos");
          this.openDialog();
        }
      });
    } else {
      console.log("Buscar" + usuario.length);
    }
  }

  
  logout(){
    this.loginService.logout();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '900px',
      height: '600px',
      data: { message: 'Usuario o contraseña incorrectos' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El pop-up se cerró');
    });
  }
}
