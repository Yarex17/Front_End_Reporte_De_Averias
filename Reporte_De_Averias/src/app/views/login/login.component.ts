import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  constructor( private router:Router ) {

  }
  buscarUsuario() {

  
    this.router.navigate(["oficina"]);

}
buttonInicioSesion(): void {

this.buscarUsuario();
}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}




