import TableData from "@/components/commons/tables/TableData";
import { Contract } from "@/interfaces/Contract";
import { contractTableAdapter } from "@/interfaces/adapters/ContractAdapter";
import contractService from "@/services/tables/contracts";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Contract> = [
  {
    title: "Nombre Cliente",
    dataIndex: "nom_cliente",
    key: "nom_cliente",
  },
  {
    title: "Fecha Inicio",
    dataIndex: "fecha_ini",
    key: "fecha_ini",
  },
  {
    title: "Fecha Fin",
    dataIndex: "fecha_fin",
    key: "fecha_fin",
  },
  {
    title: "Matricula",
    dataIndex: "matricula",
    key: "matricula",
  },
  {
    title: "Modelo",
    dataIndex: "modelo",
    key: "modelo",
  },
  {
    title: "Marca",
    dataIndex: "marca",
    key: "marca",
  },
  {
    title: "Forma de Pago",
    dataIndex: "nom_formaPago",
    key: "nom_formaPago",
  },
  {
    title: "Prórroga",
    dataIndex: "dias_prorro",
    key: "dias_prorro",
  },
  {
    title: "Seguro Adicional",
    dataIndex: "seguro",
    key: "seguro",
  },
  {
    title: "Importe Total",
    dataIndex: "precio",
    key: "precio",
  },
];

const ContractPage = async () => {
  let contracts: Contract[] = [];
  try {
    contracts = await contractService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Contratos"
        modal="contratos"
        Data={contracts}
        dataToShow={contractTableAdapter(contracts)}
        {...{ columns }}
      />
    </main>
  );
};

export default ContractPage;
