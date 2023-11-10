export interface Prioridad{
    tnIdPrioridad:number,
    tcNombre:string,
    tbActivo: boolean,
    tbEliminada: boolean
}

export class Prioridad implements Prioridad{

    constructor(public tnIdPrioridad:number, public tcNombre:string, public tbActivo: boolean, public tbEliminada: boolean){
    };

}