import React from "react";
import { ColumnsType } from "antd/es/table";
import { Car } from "@/interfaces/Car";
import carService from "@/services/tables/cars";
import TableData from "@/components/commons/tables/TableData";
import { carAdapter } from "@/interfaces/adapters/CarAdapter";
import motoService from "@/services/tables/moto";
import { motoAdapter } from "@/interfaces/adapters/MotoAdapter";
import { Moto, Motos } from "@/interfaces/Moto";

const columns: ColumnsType<Moto> = [
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
    title: "Modelo",
    dataIndex: "nom_modelo",
    key: "nom_modelo",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "Km",
    dataIndex: "km",
    key: "km",
  },
];

const MotoPage = async () => {
  let motos: Motos[] = [];
  try {
    motos = await motoService.get();
    //console.log(motos)
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Motos"
        modal="motos"
        dataToShow={motoAdapter(motos)}
        Data={motos}
        {...{ columns }}
      />
    </main>
  );
};

export default MotoPage;
