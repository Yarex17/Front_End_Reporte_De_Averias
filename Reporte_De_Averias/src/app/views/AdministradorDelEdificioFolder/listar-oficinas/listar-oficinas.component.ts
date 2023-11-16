import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oficina } from '../../../Models/oficina';
import {OficinaServices} from '../../../core/OficinasServices';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/LoginServices';

let dataOficinaSeleccionada: Oficina;

@Component({
  selector: 'app-listar-oficinas',
  templateUrl: './listar-oficinas.component.html',
  styleUrls: ['./listar-oficinas.component.css'],
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
export class ListarOficinasComponent {

  mobileQuery: MediaQueryList;
  listaOficinas:Oficina[]=[];
  formularioOficina:FormGroup;

  private _mobileQueryListener: () => void;

  constructor(private router:Router, private _loginService:LoginService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _oficinasService:OficinaServices, private fb:FormBuilder) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.formularioOficina=this.fb.group({
      TnIdOficina:[0,Validators.required],
      TnNumeroPiso:[0,Validators.required],
      TbActivo:[1,Validators.required],
      TbEliminado:[1,Validators.required],
    });
    dataOficinaSeleccionada;
  }

  obtenerOficinas() {
    return this._oficinasService.getList().subscribe((data: Oficina[]) => {
      console.log(data);
      this.listaOficinas = data;
    })
  };

  editarOficina(idOficina: number){
    this._oficinasService.buscarOficina(idOficina).subscribe((data: any) => 
    {
      console.log(data);
      dataOficinaSeleccionada = new Oficina(data.tnIdOficina, data.tnNumeroPiso, data.tbActivo, data.tbEliminado);
      if(dataOficinaSeleccionada.tnIdOficina != null){
        sessionStorage.setItem('idOficinaSeleccionado', dataOficinaSeleccionada.tnIdOficina.toString());
        sessionStorage.setItem('numeroPisoOficinaSeleccionado', dataOficinaSeleccionada.tnNumeroPiso.toString());

        console.log("OFID:"+sessionStorage.getItem('idOficinaSeleccionado'));
        console.log("OFNP:"+sessionStorage.getItem('numeroPisoOficinaSeleccionado'));
      }
    });
  }

  logout(): void {
    this._loginService.logout(); 
    this.router.navigate(['/login']);
  }

  eliminarOficina(idOficina: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta oficina?')) {
      this._oficinasService.eliminarOficina(idOficina).subscribe((data: any) => {
        alert('Edificio eliminado exitosamente');
        this.obtenerOficinas();
      });
    }
  }

  ngOnInit(): void {
    this.obtenerOficinas();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
