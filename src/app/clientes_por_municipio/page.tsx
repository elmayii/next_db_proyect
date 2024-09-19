import ListClients from "@/components/commons/tables/Specifics/ListClients";
import TableData from "@/components/commons/tables/TableData";
import { Client, ClientTable } from "@/interfaces/Clients";
import { Contract } from "@/interfaces/Contract";
import { Municipio } from "@/interfaces/Municipio";
import { clientAdapter } from "@/interfaces/adapters/ClientAdapter";
import { contractTableAdapter } from "@/interfaces/adapters/ContractAdapter";
import clientService from "@/services/tables/clients";
import contractService from "@/services/tables/contracts";
import municipioService from "@/services/tables/municipio";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<ClientTable> = [
  {
    title: "Identificador",
    dataIndex: "id_usuario",
    key: "id_usuario",
  },
  {
    title: "Nombre Cliente",
    dataIndex: "nom_cliente",
    key: "nom_cliente",
  },
  {
    title: "Municipio",
    dataIndex: "nom_mun",
    key: "nom_mun",
  },
  {
    title: "Alquileres",
    dataIndex: "alquileres",
    key: "alquileres",
  },
  {
    title: "Liquidez",
    dataIndex: "liquidez",
    key: "liquidez",
  },
];

//TABLE(nom_cliente character varying, apellido_cliente character varying, nom_mun character varying, id_usuario integer, precio double precision, alquileres integer)
/*

BEGIN
	RETURN QUERY SELECT
	U.nom_cliente,
	U.apellido_cliente,
	M.nom_mun,
	U.id_usuario,
	SUM(c.precio),
	COUNT(*)::integer as alquileres
	FROM PUBLIC."Cliente" AS U JOIN PUBLIC."Municipio" AS M ON U.id_municipio = M.id_mun
	JOIN public."Contrato" as c ON u.id_usuario = c.id_usuario
	WHERE M.id_mun = municipio
	GROUP BY U.nom_cliente,U.apellido_cliente,M.nom_mun,U.id_usuario;
END;
*/


const ClientsPage = async () => {
  let clientes: Client[] = [];
  let municipies: Municipio[] = []
  try {
    municipies = await municipioService.get()
    console.log(municipies)
    if(municipies?.length>0)
      clientes = await clientService.get(
        municipies[0].id_mun.toString()
    );
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <ListClients columns={columns} data={clientAdapter(clientes)} muns={municipies} />
    </main>
  );
};


export default ClientsPage;