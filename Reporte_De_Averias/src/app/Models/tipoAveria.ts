export interface TipoAveria {
    tnIdTipoAveria:number,
    tcDescripcion: string,
    tbActivo: boolean,
    tbEliminado: boolean
}

export class TipoAveria implements TipoAveria {

    constructor(public tnIdTipoAveria:number, public tcDescripcion: string, public tbActivo: boolean, public tbEliminado: boolean){
    };

}