
export interface Client {
  id_cliente: number;
  nombre_cliente: string | null;
  apellido_cliente: string | null;
  id_municipio:number | null;
  nom_mun?: string;
  alquileres?: number;
  precio?: number;
}

export interface ClientTable extends Omit<Client,  "apellido_cliente" | "id_municipio" | "precio" | "id_cliente"> {
  id_cliente:string;
  nom_mun?:string;
  liquidez?:string;
}

export interface CreateClient extends Omit<Client, "id_cliente" | "nom_mun"> {}

export interface EditClient extends Omit<Client, "nom_mun"> {}
