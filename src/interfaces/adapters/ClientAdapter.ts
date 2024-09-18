import { Option } from "@/components/commons/forms/InputSelect";
import { Client, ClientTable, CreateClient, EditClient } from "../Clients";

export const clientAdapter = (clientes: Client[]): ClientTable[] => {
    return clientes.map((client) => ({
      id_cliente: client.id_cliente.toString(),
      nombre_cliente: client.nombre_cliente + " " + client.apellido_cliente,
      key: client.id_cliente.toString(),
      nom_mun: client.nom_mun?.toString(),
      liquidez: client.precio?.toString(),
      alquileres: client.alquileres
    }));
  };
  
  export const clientFormAdapter = (client: EditClient): FormDataType<EditClient> => ({
      nombre_cliente: client.nombre_cliente || "",
      apellido_cliente: client.apellido_cliente || "",
      id_municipio: client.id_municipio?.toString() || "",
      id_cliente:client.id_cliente?.toString() || "",
  });
  
  export const clientTypesAdapter = (client: FormDataType<EditClient>): EditClient => ({
    nombre_cliente: client.nombre_cliente || "",
    apellido_cliente: client.apellido_cliente || "",
    id_municipio: Number(client.id_municipio),
    id_cliente: Number(client.id_cliente),
  });
  
  export const clientCreateAdapter = (client: EditClient): CreateClient => ({
    nombre_cliente: client.nombre_cliente || "",
    apellido_cliente: client.apellido_cliente || "",
    id_municipio: Number(client.id_municipio),
  });
  
  export const clientOptionsAdapter = (clients: Client[]): Option[] =>
    clients.map((client) => ({
      label: (client.nombre_cliente + " " + client.apellido_cliente) as string,
      value: client.id_cliente.toString(),
  }));