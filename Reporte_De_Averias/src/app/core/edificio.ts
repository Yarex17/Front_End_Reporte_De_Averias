export interface Edificio{
    tnIdEdificio:number,
    tcPropietario: string,
    tcNombre: string,
    tbActivo: boolean,
    tbEliminado: boolean
}

export class Edificio implements Edificio {

    constructor(public tcPropietario: string,public tcNombre: string) {
    };
  
  
  }
