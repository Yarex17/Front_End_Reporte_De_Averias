export interface Edificio {

    TcPropietario : string;

     TcNombre : string;

     TbActivo : Boolean

     TbEliminado : Boolean
}
export class Edificio implements Edificio {

  constructor(public TcNombre: string) {
    
  };


}