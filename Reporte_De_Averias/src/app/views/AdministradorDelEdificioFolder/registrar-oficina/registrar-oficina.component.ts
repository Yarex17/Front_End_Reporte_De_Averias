import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup,ReactiveFormsModule ,Validators } from '@angular/forms';
import { Oficina } from 'src/app/Models/oficina';
import { OficinaServices } from 'src/app/core/OficinasServices';
import { PopupComponent } from 'src/app/Alerts/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';
import { EdificioServices } from 'src/app/core/EdificiosServices';
import { Edificio } from 'src/app/Models/edificio';

@Component({
  selector: 'app-registrar-oficina',
  templateUrl: './registrar-oficina.component.html',
  styleUrls: ['./registrar-oficina.component.css'],
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
export class RegistrarOficinaComponent {
  mobileQuery: MediaQueryList;
  listaEdificios:Edificio[]=[];
  listaOficinas:Oficina[]=[];
  formularioOficina:FormGroup;
  selectedEdificio: string = '';

  private _mobileQueryListener: () => void;

  constructor(private _loginService:LoginService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _edificiosService:EdificioServices, private _oficinasServices: OficinaServices, private fb:FormBuilder, private dialog: MatDialog, private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioOficina=this.fb.group({
      tnEdificioCrearOficina:["",Validators.required],
      tnNumeroPisoCrearOficina:["",Validators.required],
      tbActivo:[1],
      tbEliminado:[0],
    });
  }

  onChange(event: Event) {
    this.selectedEdificio = (event.target as HTMLSelectElement).value;
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }

  obtenerEdificios() {
    return this._edificiosService.getList().subscribe((data: Edificio[]) => {
      console.log(data);
      this.listaEdificios = data;
    })
  };

  obtenerOficinas() {
    return this._oficinasServices.getList().subscribe((data: Oficina[]) => {
      console.log(data);
      this.listaOficinas = data;
    })
  };

  mostrarPopupCamposEnBlanco() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '900px',
      height: '600px',
      data: { message: 'Los campos están en blanco' }
    });
  }

  registrarOficina(){

    const numeroPiso = this.formularioOficina.value.tnNumeroPisoCrearOficina;
    const edificio = this.selectedEdificio;
  
    if (!numeroPiso || !edificio) {
      this.mostrarPopupCamposEnBlanco();
      return; 
    }

    const request = {
      numeroPiso: numeroPiso,
      idEdificio: edificio
    };
    
    this._oficinasServices.registrarOficina(request).subscribe((data: any) => {
      console.log(data);
      this.listaOficinas.push(data);
    });
    this.router.navigate(['/listar_oficina']);
  }

  ngOnInit(): void {
    this.obtenerEdificios();
    this.obtenerOficinas();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
