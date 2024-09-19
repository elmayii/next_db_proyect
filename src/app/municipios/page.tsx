import React from "react";
import { ColumnsType } from "antd/es/table";
import TableData from "@/components/commons/tables/TableData";
import { Municipio } from "@/interfaces/Municipio";
import { munAdapter } from "@/interfaces/adapters/MunicipioAdapter";
import municipioService from "@/services/tables/municipio";

const columns: ColumnsType<Municipio> = [
  {
    title: "Municipios",
    dataIndex: "nom_mun",
    key: "nom_mun",
  },
];

const MunPage = async () => {
  let municipios: Municipio[] = [];
  try {
    municipios = await municipioService.get();
    console.log(municipios)
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Municipios"
        modal="municipio"
        dataToShow={munAdapter(municipios)}
        Data={municipios}
        {...{ columns }}
      />
    </main>
  );
};

export default MunPage;
