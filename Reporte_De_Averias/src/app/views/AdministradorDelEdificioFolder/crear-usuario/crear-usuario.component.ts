import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule ,Validators } from '@angular/forms';
import { Oficina } from 'src/app/Models/oficina';
import { OficinaServices } from 'src/app/core/OficinasServices';
import { UsuarioServices } from 'src/app/core/UsuarioServices';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/Alerts/popup/popup.component';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  standalone:true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class CrearUsuarioComponent {
  mobileQuery: MediaQueryList;
  formularioUsuario:FormGroup;
  listaOficinas: Oficina[] = [];
  selectedOficina: string = '';

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private dialog: MatDialog, private router: Router, private fb:FormBuilder, private _loginService:LoginService, private _oficinasService:OficinaServices, private _usuarioService:UsuarioServices) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioUsuario=this.fb.group({
      tnIdUsuario:[0],
      tccRol:["Secretaria",Validators.required],
      tcNombre:["",Validators.required],
      tcApellido:["",Validators.required],
      tcCedula:["",Validators.required],
      tcCorreo:["",Validators.required],
      tcContrasennia:["",Validators.required],
      tbActivo:[1],
      tbEliminado:[0],

    });
  }

  crearUsuario(){
    
    if (!this.formularioUsuario.value.tcNombre || !this.formularioUsuario.value.tcApellido || 
      !this.formularioUsuario.value.tcCedula || !this.formularioUsuario.value.tcCorreo || 
      !this.formularioUsuario.value.tcContrasennia || !this.formularioUsuario.value.tccRol) {
      this.mostrarPopupCamposEnBlanco();
      return; // No continuar con el registro si hay campos vacíos
    }
    const request = {
      nombreUsuario: this.formularioUsuario.value.tcNombre,
      apellidoUsuario: this.formularioUsuario.value.tcApellido,
      cedulaUsuario: this.formularioUsuario.value.tcCedula,
      correoUsuario: this.formularioUsuario.value.tcCorreo,
      contrasennaUsuario: this.formularioUsuario.value.tcContrasennia,
      rolUsuario: this.formularioUsuario.value.tccRol,
      idOficinaUsuario: this.selectedOficina
    };
    this._usuarioService.crearUsuario(request).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/administradordeledificio']);
    });
  }

  prueba(){
    console.log(this.selectedOficina)
    console.log(this.formularioUsuario.value.tccRol);
  }

  obtenerOficinas() {
    return this._oficinasService.getList().subscribe((data: Oficina[]) => {
      console.log(data);
      this.listaOficinas = data;
    })
  };

  onChange(event: Event) {
    this.selectedOficina = (event.target as HTMLSelectElement).value;
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }

  mostrarPopupCamposEnBlanco() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '900px',
      height:'600px',
      data: { message: 'Los campos están en blanco' }
    });
  }

  ngOnInit(): void {
    this.obtenerOficinas();
    this.formularioUsuario.setValue({Oficina: '6'});
    this.formularioUsuario.setValue({Rol: 'Secretaria'});
    
    console.log(this.listaOficinas)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
