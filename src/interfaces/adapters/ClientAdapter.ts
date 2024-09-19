import { Option } from "@/components/commons/forms/InputSelect";
import { Client, ClientTable, CreateClient, EditClient } from "../Clients";

export const clientAdapter = (clientes: Client[]): ClientTable[] => {
    return clientes.map((client) => ({
      id_usuario: client.id_usuario.toString(),
      nom_cliente: client.nom_cliente as string,
      key: client.id_usuario.toString(),
      nom_mun: client.nom_mun?.toString(),
      liquidez: client.precio?.toString(),
      alquileres: client.alquileres
    }));
  };
  
  export const clientFormAdapter = (client: EditClient): FormDataType<EditClient> => ({
      nom_cliente: client.nom_cliente || "",
      id_usuario:client.id_usuario?.toString() || "",
  });
  
  export const clientTypesAdapter = (client: FormDataType<EditClient>): EditClient => ({
    nom_cliente: client.nom_cliente || "",
    id_usuario: Number(client.id_usuario),
  });
  
  export const clientCreateAdapter = (client: EditClient): CreateClient => ({
    nom_cliente: client.nom_cliente || "",
  });
  
  export const clientOptionsAdapter = (clients: Client[]): Option[] =>
    clients.map((client) => ({
      label: (client.nom_cliente) as string,
      value: client.id_usuario.toString(),
  }));