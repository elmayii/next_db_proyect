
export interface Client {
  id_usuario: number;
  nom_cliente: string ;
  apellido_cliente: string;
  id_mun: number | null;
  nom_mun?: string;
  
}

export interface ClientTable extends Omit<Client,  "apellido_cliente" | "id_municipio" | "precio" | "id_usuario"> {
  id_usuario:string;
  nom_mun?:string;
 
}

export interface CreateClient extends Omit<Client, "id_usuario" | "nom_mun"> {}

export interface EditClient extends Omit<Client, "nom_mun"> {}
