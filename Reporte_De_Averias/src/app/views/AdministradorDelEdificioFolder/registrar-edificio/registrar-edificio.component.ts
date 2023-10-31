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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _edificiosService:EdificioServices, private fb:FormBuilder) {
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
    const request:Edificio ={
      tnIdEdificio:0,
      tcPropietario: this.formularioEdificio.value.tcNombre,
      tcNombre: this.formularioEdificio.value.tcPropietario,
      tbActivo:true,
      tbEliminado:false
    }
    this._edificiosService.registrarEdificio(request).subscribe({
      
      next:(data) =>{
        console.log(data);
        this.listaEdificios.push(data);
        this.formularioEdificio.patchValue({
          tcNommbre:'',
          tcPropietario:''
        });
      }, error:(e) =>{}
    });
  }


  ngOnInit(): void {
    this.obtenerTareas();
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
