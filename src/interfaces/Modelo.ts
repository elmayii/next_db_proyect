import { Marca } from "./Marca";

export interface Modelo {
  id_modelo: number;
  nom_modelo: string;
  marca?: Marca;
}

export interface EditModelo extends Omit<Modelo, "marca"> {
  id_marca?: number;
}

export interface CreateModelo extends Omit<EditModelo, "id_modelo"> {}