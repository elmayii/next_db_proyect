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

const columns: ColumnsType<Marca> = [
  {
    title: "Marca",
    dataIndex: "nom_marca",
    key: "nom_marca",
  },
];

const MotoPage = async () => {
  let marcas: Marca[] = [];
  try {
    marcas = await marcaService.get();
    console.log(marcas)
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Marcas"
        modal="marcas"
        dataToShow={marcaAdapter(marcas)}
        Data={marcas}
        {...{ columns }}
      />
    </main>
  );
};

export default MotoPage;
