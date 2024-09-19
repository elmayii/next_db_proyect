import React from "react";
import { ColumnsType } from "antd/es/table";
import { Car } from "@/interfaces/Car";
import carService from "@/services/tables/cars";
import TableData from "@/components/commons/tables/TableData";
import { carAdapter } from "@/interfaces/adapters/CarAdapter";
import motoService from "@/services/tables/moto";
import { motoAdapter } from "@/interfaces/adapters/MotoAdapter";
import { Moto, Motos } from "@/interfaces/Moto";
import { Marca } from "@/interfaces/Marca";
import { marcaAdapter, marcaOptionsAdapter } from "@/interfaces/adapters/MarcaAdapter";
import { Modelo } from "@/interfaces/Modelo";
import { modeloAdapter } from "@/interfaces/adapters/ModeloAdapter";
import modeloService from "@/services/tables/modelo";

const columns: ColumnsType<Modelo> = [
  {
    title: "Modelo",
    dataIndex: "nom_modelo",
    key: "nom_modelo",
  },
];

const MotoPage = async () => {
  let modelos:Modelo[] = [];
  try {
    modelos = await modeloService.get();
    console.log('---------------',modelos)
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Modelos"
        modal="modelos"
        dataToShow={modeloAdapter(modelos)}
        Data={modelos}
        {...{ columns }}
      />
    </main>
  );
};

export default MotoPage;
