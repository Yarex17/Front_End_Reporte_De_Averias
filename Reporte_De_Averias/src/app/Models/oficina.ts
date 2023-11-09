export interface Oficina{
    tnIdOficina:number,
    tnNumeroPiso: number,
    tbActivo: boolean,
    tbEliminado: boolean
}

export class Oficina implements Oficina{

    constructor(public tnIdOficina:number, public tnNumeroPiso: number, public tbActivo: boolean, public tbEliminado: boolean){
    };

}
