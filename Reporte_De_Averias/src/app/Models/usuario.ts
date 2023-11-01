export interface Usuario{
    tnIdUsuario:number,
    tccRol: string,
    tcNombre: string,
    tcApellido: string,
    tcCedula: string,
    tcCorreo: string,
    tcContrasennia: string,
    tbActivo: boolean,
    tbEliminado: boolean
}

export class Usuario implements Usuario {

    constructor(public tnIdUsuario:number, public tccRol: string, public tcNombre: string, public tcApellido: string, public tcCedula: string, public tcCorreo: string, public tcContrasennia: string, public tbActivo: boolean, public tbEliminado:boolean) {
    };
  
  
  }