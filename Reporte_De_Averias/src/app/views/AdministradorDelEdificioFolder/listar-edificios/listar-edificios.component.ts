import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Edificio } from '../../../Models/edificio';
import {EdificioServices} from '../../../core/EdificiosServices';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';

let dataEdificioSeleccionado: Edificio;

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

  constructor(private router:Router, private _loginService:LoginService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _edificiosService:EdificioServices, private fb:FormBuilder) {
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
    dataEdificioSeleccionado;
  }

  obtenerTareas() {
    return this._edificiosService.getList().subscribe((data: Edificio[]) => {
      console.log(data);
      this.listaEdificios = data;
    })
  };

  editarEdificio(idEdificio: number) {
    console.log("ID del edificio seleccionado:", idEdificio);
    
    this._edificiosService.buscarEdificio(idEdificio).subscribe((data: any) => 
    {
      console.log(data);
      dataEdificioSeleccionado = new Edificio(data.tnIdEdificio, data.tcPropietario, data.tcNombre, data.tbActivo, data.tbEliminado);
      if(dataEdificioSeleccionado.tnIdEdificio != null){
        sessionStorage.setItem('idEdificioSeleccionado', dataEdificioSeleccionado.tnIdEdificio.toString());
        sessionStorage.setItem('nombreEdificioSeleccionado', dataEdificioSeleccionado.tcNombre);
        sessionStorage.setItem('propietarioEdificioSeleccionado', dataEdificioSeleccionado.tcPropietario);

        console.log("EdifID:"+sessionStorage.getItem('idEdificioSeleccionado'));
        console.log("EdifNAME:"+sessionStorage.getItem('nombreEdificioSeleccionado'));
        console.log("EdifPROPI:"+sessionStorage.getItem('propietarioEdificioSeleccionado'));
      }
    });
  }

  eliminarEdificio(idEdificio: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este edificio?')) {
      this._edificiosService.eliminarEdificio(idEdificio).subscribe((data: any) => {
       alert('Edificio eliminado exitosamente');
        this.obtenerTareas();
      });
    }
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
