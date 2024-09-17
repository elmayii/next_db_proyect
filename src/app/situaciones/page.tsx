import React from "react";
import { ColumnsType } from "antd/es/table";
import { Car } from "@/interfaces/Car";
import carService from "@/services/tables/cars";
import TableData from "@/components/commons/tables/TableData";
import { carAdapter } from "@/interfaces/adapters/CarAdapter";
import motoService from "@/services/tables/moto";
import { motoAdapter } from "@/interfaces/adapters/MotoAdapter";
import { Moto, Motos } from "@/interfaces/Moto";
import marcaService from "@/services/tables/marca";
import { Marca } from "@/interfaces/Marca";
import { marcaAdapter, marcaOptionsAdapter } from "@/interfaces/adapters/MarcaAdapter";
import { Situacion } from "@/interfaces/Situacion";
import { situaAdapter } from "@/interfaces/adapters/SituacionAdapter";
import situaService from "@/services/tables/situacion";

const columns: ColumnsType<Situacion> = [
  {
    title: "Situacion",
    dataIndex: "nom_situa",
    key: "id_situa",
  },
];

const SituaPage = async () => {
  let situaciones: Situacion[] = [];
  try {
    situaciones = await situaService.get();
    console.log(situaciones)
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Situaciones"
        modal="situacion"
        dataToShow={situaAdapter(situaciones)}
        Data={situaciones}
        {...{ columns }}
      />
    </main>
  );
};

export default SituaPage;
