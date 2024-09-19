
export interface Client {
  id_usuario: number;
  nom_cliente: string | null;
  nom_mun?: string;
  alquileres?: number;
  precio?: number;
}

export interface ClientTable extends Omit<Client,  "apellido_cliente" | "id_municipio" | "precio" | "id_usuario"> {
  id_usuario:string;
  nom_mun?:string;
  liquidez?:string;
}

export interface CreateClient extends Omit<Client, "id_usuario" | "nom_mun"> {}

export interface EditClient extends Omit<Client, "nom_mun"> {}
