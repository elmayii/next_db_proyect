import React from "react";
import { ColumnsType } from "antd/es/table";
import TableData from "@/components/commons/tables/TableData";
import { MotoSituacion } from "@/interfaces/MotoSituacion";
import motoSituaService from "@/services/tables/situacion";
import { motosituaAdapter } from "@/interfaces/adapters/MotoSituaAdapter";

const columns: ColumnsType<MotoSituacion> = [
  {
    title: "Matricula",
    dataIndex: "matricula",
    key: "matricula",
  },
  {
    title: "Marca",
    dataIndex: "nom_marca",
    key: "nom_marca",
  },
  {
    title: "Situacion",
    dataIndex: "nom_situa",
    key: "nom_situa",
  },
  {
    title: "Fecha Fin",
    dataIndex: "fecha_fin",
    key: "fecha_fin",
  },
];

const MotoSituaPage = async () => {
  let motos_situa: MotoSituacion[] = [];
  try {
    motos_situa = await motoSituaService.get();
    console.log(motos_situa)
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Situaciones de Motos"
        modal="motos_situacion"
        dataToShow={motosituaAdapter(motos_situa)}
        Data={motos_situa}
        {...{ columns }}
      />
    </main>
  );
};

export default MotoSituaPage;
