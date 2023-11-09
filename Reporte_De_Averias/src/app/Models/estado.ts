export interface Estado{
    tnIdEstado:number,
    tcNombre:string,
    tbActivo: boolean,
    tbEliminado: boolean
}

export class Estado implements Estado{

    constructor(public tnIdEstado:number, public tcNombre:string, public tbActivo: boolean, public tbEliminado: boolean){
    };

}