import { Brand } from "./Brand";
import { Couple } from "./Couple";
import { Marca } from "./Marca";
import { Modelo } from "./Modelo";
import { Situacion } from "./Situacion";

export interface Moto {
  id_moto: number;
  color: string | null;
  km: number | null;
  marca?: Marca;
  modelo?: Modelo;
  situacion?: Situacion;
  matricula: string | null;
}

export interface Motos {
  id_moto: number;
  color: string | null;
  km: number | null;
  nom_marca: string | null;
  id_marca: number;
  id_modelo:number;
  nom_modelo: string | null;
  situacion?: Situacion;
  matricula: string | null;
}

export interface MotoToRent {
  id_moto: number;
  color: string | null;
  km: number | null;
  nom_marca: string | null;
  id_marca: number;
  id_modelo:number;
  nom_modelo: string | null;
  situacion?: Situacion;
  matricula: string | null;
}

export interface EditMoto extends Omit<Moto, "marca" | "modelo" | "situacion"> {
  id_marca?: number;
  id_modelo?: number;
}

export interface CreateMoto extends Omit<EditMoto, "id_moto"> {
  id_situa?:number;
}
