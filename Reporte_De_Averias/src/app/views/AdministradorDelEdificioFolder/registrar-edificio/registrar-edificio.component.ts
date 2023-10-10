import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { TraEdificioService } from 'src/servicios/tra-edificio.service';
import { Edificio } from 'src/app/Models/edificio';
let dataEdificios: Edificio[];
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
  ],
})
export class RegistrarEdificioComponent {
  mobileQuery: MediaQueryList;
  public nombre: string;
  public buscar: string;
  public id: number;
  public modificar: boolean;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private edificioservice: TraEdificioService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.nombre = '';
    this.buscar = '';
    this.id = 0;
    this.modificar = false;
 
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getEdificios() {
    return this.edificioservice.getEdificios().subscribe((data: Edificio[]) => {
      dataEdificios = data;
     
    })
  };
  limpiar() {
    this.nombre = "";
    this.modificar = false;
  }
  registrarEdificio() {
    if (this.modificar == false) {
      if (this.nombre.trim().length == 0) {
        
      } else {
        this.edificioservice.registrarEdificio(new Edificio(this.nombre)).subscribe((respuesta: string) => {
         
          this.getEdificios();
        });
      }
      this.limpiar();
    }
    else {
    
    }
  }
}
