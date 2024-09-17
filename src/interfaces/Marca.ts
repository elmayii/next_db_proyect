export interface Marca {
  id_marca: number;
  nom_marca: string | null;
}

export interface EditMarca extends Omit<Marca, "id_marca"> {
}

export interface CreateMarca extends Omit<Marca, "id_marca"> {
}
