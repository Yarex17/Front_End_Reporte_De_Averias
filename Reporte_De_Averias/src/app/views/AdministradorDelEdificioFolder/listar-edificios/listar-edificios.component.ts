import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Edificio } from './edificio';
import {ListarEdificioServices} from './ListarEdificiosServices';

@Component({
  selector: 'app-listar-edificios',
  templateUrl: './listar-edificios.component.html',
  styleUrls: ['./listar-edificios.component.css'],
  standalone:true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgFor
  ],
})
export class ListarEdificiosComponent implements OnInit {

  mobileQuery: MediaQueryList;
  listaEdificios:Edificio[]=[];
  formularioEdificio:FormGroup;


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _edificiosService:ListarEdificioServices, private fb:FormBuilder) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioEdificio=this.fb.group({
      TnIdEdificio:[0,Validators.required],
      TcPropietario:["",Validators.required],
      TcNombre:["",Validators.required],
      TbActivo:[1,Validators.required],
      TbEliminado:[1,Validators.required],
    });
  }

  obtenerTareas(){
    this._edificiosService.getList().subscribe({
      next:(data)=> {
        this.listaEdificios=data;
      },error:(e)=> {}
    });
  }

  ngOnInit(): void {
    this.obtenerTareas
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
