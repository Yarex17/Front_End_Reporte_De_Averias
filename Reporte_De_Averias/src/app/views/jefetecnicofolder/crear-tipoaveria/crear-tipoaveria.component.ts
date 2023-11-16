import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosReporteServices } from 'src/app/core/DatosReporteServices';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/Alerts/popup/popup.component';
import { TipoAveria } from 'src/app/Models/tipoAveria';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';

@Component({
  selector: 'app-crear-tipoaveria',
  templateUrl: './crear-tipoaveria.component.html',
  styleUrls: ['./crear-tipoaveria.component.css'],
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

export class CrearTipoaveriaComponent implements OnInit{
  
  mobileQuery: MediaQueryList;
  formularioTipoAveria:FormGroup;
  listaTipoAveria:TipoAveria[]=[];
  
  private _mobileQueryListener: () => void;

  constructor(private _loginService:LoginService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private fb:FormBuilder, private _datosReporteServices: DatosReporteServices, private dialog: MatDialog, private router: Router){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioTipoAveria=this.fb.group({
      tnIdTipoAveria:[0],
      tcDescripcionTipoAveria:["",Validators.required],
      tbActivo:[1],
      tbEliminado:[0],
    });
    this.router.navigate(['/listar_listar_tipoAveria']);
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }

  registrarTipoAveria(){
    if (
      !this.formularioTipoAveria.value.tcDescripcionTipoAveria
    ) {
      this.mostrarPopupCamposEnBlanco();
      return;
    }
    
    const request = {
      descripcionTipoAveria: this.formularioTipoAveria.value.tcDescripcionTipoAveria
    };

    this._datosReporteServices.registrarTipoAveria(request).subscribe({
      next:(data) =>{
        console.log(data);
        this.listaTipoAveria.push(data);
        this.formularioTipoAveria.patchValue({
          tcDescripcionTipoAveria:''
        });
      }, error:(e) =>{}
    });
    this.router.navigate(['/listar_tipoAveria']);
  }

  obtenerTiposAveria() {
    return this._datosReporteServices.getListTipoAveria().subscribe((data: TipoAveria[]) => {
      console.log(data);
      this.listaTipoAveria = data;
    })
  };
  
  mostrarPopupCamposEnBlanco() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '900px',
      height: '600px',
      data: { message: 'Los campos están en blanco' }
    });
  }

  ngOnInit(): void {
    this.obtenerTiposAveria();
  }

}
