import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup,ReactiveFormsModule ,Validators } from '@angular/forms';
import { Edificio } from '../../../Models/edificio';
import {EdificioServices} from '../../../core/EdificiosServices';
import { PopupComponent } from 'src/app/Alerts/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';


@Component({
  selector: 'app-registrar-edificio',
  templateUrl: './registrar-edificio.component.html',
  styleUrls: ['./registrar-edificio.component.css'],
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
    MatIconModule
  ],
})
export class RegistrarEdificioComponent {
  mobileQuery: MediaQueryList;
  listaEdificios:Edificio[]=[];
  formularioEdificio:FormGroup;


  private _mobileQueryListener: () => void;

  constructor(private _loginService:LoginService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _edificiosService:EdificioServices, private fb:FormBuilder,private dialog: MatDialog,private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioEdificio=this.fb.group({
      tnIdEdificio:[0],
      tcPropietario:["",Validators.required],
      tcNombre:["",Validators.required],
      tbActivo:[1],
      tbEliminado:[0],
    });
  }

  obtenerTareas() {
    return this._edificiosService.getList().subscribe((data: Edificio[]) => {
      console.log(data);
      this.listaEdificios = data;
    })
  };
  
  registrarEdificio(){
    const propietario = this.formularioEdificio.value.tcPropietario;
    const nombre = this.formularioEdificio.value.tcNombre;
  
    if (!propietario || !nombre) {
      this.mostrarPopupCamposEnBlanco();
      return; // No continuar con el registro si hay campos vacíos
    }
  
    const request: Edificio = {
      tnIdEdificio: 0,
      tcPropietario: nombre,
      tcNombre: propietario,
      tbActivo: true,
      tbEliminado: false
    }
  
    this._edificiosService.registrarEdificio(request).subscribe({
      next: (data) => {
        console.log(data);
        this.listaEdificios.push(data);
        this.formularioEdificio.patchValue({
          tcNombre: '',
          tcPropietario: ''
        });
      }, 
      error: (e) => {}
      
    });
    this.router.navigate(['/listar_edificio']);
  }


  mostrarPopupCamposEnBlanco() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '900px',
      height:'600px',
      data: { message: 'Los campos están en blanco' }
    });
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {
    this.obtenerTareas();
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
