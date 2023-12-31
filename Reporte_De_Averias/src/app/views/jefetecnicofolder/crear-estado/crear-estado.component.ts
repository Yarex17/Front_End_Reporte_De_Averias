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
import { Estado } from 'src/app/Models/estado';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/Alerts/popup/popup.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';

@Component({
  selector: 'app-crear-estado',
  templateUrl: './crear-estado.component.html',
  styleUrls: ['./crear-estado.component.css'],
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

export class CrearEstadoComponent implements OnInit{
  
  mobileQuery: MediaQueryList;
  formularioEstado:FormGroup;
  listaEstados:Estado[]=[];

  private _mobileQueryListener: () => void;

  constructor(private _loginService:LoginService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private fb:FormBuilder, private _datosReporteServices: DatosReporteServices, private dialog: MatDialog, private router: Router){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioEstado=this.fb.group({
      tnIdEstado:[0],
      tcNombreEstado:["",Validators.required],
      tbActivo:[1],
      tbEliminado:[0],
    });
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }
  
  registrarEdificio(){
    if (
      !this.formularioEstado.value.tcNombreEstado
    ) {
      this.mostrarPopupCamposEnBlanco();
      return;
    }
    
    const request = {
      nombreEstado: this.formularioEstado.value.tcNombreEstado
    };

    this._datosReporteServices.registrarEstado(request).subscribe({
      next:(data) =>{
        console.log(data);
        this.listaEstados.push(data);
        this.formularioEstado.patchValue({
          tcNombreEstado:''
        });
      }, error:(e) =>{}
    });
    this.router.navigate(['/listar_estado']);
  }

  obtenerEstados() {
    return this._datosReporteServices.getList().subscribe((data: Estado[]) => {
      console.log(data);
      this.listaEstados = data;
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
    this.obtenerEstados();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
