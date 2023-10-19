export interface Edificio{
    tnIdEdificio:number,
    tcPropietario: string,
    tcNombre: string,
    tbActivo: boolean,
    tbEliminado: boolean
}

export class Edificio implements Edificio {

    constructor(public tnIdEdificio:number,public tcPropietario: string,public tcNombre: string, public tbActivo: boolean, public tbEliminado:boolean) {
    };
  
  
  }
