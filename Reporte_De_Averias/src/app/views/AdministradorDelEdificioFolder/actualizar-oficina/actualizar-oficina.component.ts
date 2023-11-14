import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup,ReactiveFormsModule ,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from 'src/app/Alerts/popup/popup.component';
import { OficinaServices } from 'src/app/core/OficinasServices';
import { LoginService } from 'src/app/core/LoginServices';

@Component({
  selector: 'app-actualizar-oficina',
  templateUrl: './actualizar-oficina.component.html',
  styleUrls: ['./actualizar-oficina.component.css'],
  standalone:true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor,
    ReactiveFormsModule
  ],
})
export class ActualizarOficinaComponent {
  mobileQuery: MediaQueryList;
  formularioOficina:FormGroup;
  idOficinaSeleccionado: string | null | undefined;
  numeroPisoOficinaSeleccionado: string | null | undefined;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _oficinasService:OficinaServices, private fb:FormBuilder,private dialog: MatDialog,private router: Router,private _loginService:LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioOficina = this.fb.group({
      tnIdOficina:[0],
      tnNumeroPisoEditarOficina:["",Validators.required],
      tbActivo:[1],
      tbEliminado:[0]
    });
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }

  modificarOficina(){
    if (
      !this.formularioOficina.value.tnNumeroPisoEditarOficina
    ) {
      this.mostrarPopupCamposEnBlanco();
      return;
    }

    const request = {
      idOficina: this.idOficinaSeleccionado,
      numeroPiso: this.formularioOficina.value.tnNumeroPisoEditarOficina
    };

    this._oficinasService.modificarOficina(request).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/listar_oficina']); 
    });

  }

  mostrarPopupCamposEnBlanco() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '900px',
      height:'600px',
      data: { message: 'Los campos están en blanco' }
    });
  }

  ngOnInit(): void {
    this.idOficinaSeleccionado = sessionStorage.getItem('idOficinaSeleccionado');
    this.numeroPisoOficinaSeleccionado = sessionStorage.getItem('numeroPisoOficinaSeleccionado');
    this.formularioOficina.patchValue({
      tnNumeroPisoEditarOficina: this.numeroPisoOficinaSeleccionado
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }
}
