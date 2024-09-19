import { Car } from "./Car";
import { Country } from "./Country";
export interface Contract {
  id_contrato: number;
  fecha_ini: Date | null;
  fecha_fin: Date | null;
  dias_prorro: number | null;
  seguro: boolean | null;
  id_formaPago: number | null;
  nom_formaPago:string | null;
  id_usuario: number | null;
  nom_usuario:string | null;
  apellido_cliente: string | null;
  id_moto: number | null;
  matricula: string | null;
  marca: string | null;
  modelo: string | null;
  precio: number | null;
}

export interface EditContract
  extends Omit<Contract, "nom_cliente" | "apellido_cliente" | "nom_formaPago" | "matricula" | "marca" | "modelo"> {

}
export interface CreateContract extends Omit<EditContract, "id_contrato"> {}
