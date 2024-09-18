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
import { Municipio } from "@/interfaces/Municipio";
import { munAdapter } from "@/interfaces/adapters/MunicipioAdapter";

const columns: ColumnsType<Municipio> = [
  {
    title: "Municipios",
    dataIndex: "nom_mun",
    key: "nom_mun",
  },
];

const MotoPage = async () => {
  let municipios: Municipio[] = [];
  try {
    municipios = await marcaService.get();
    console.log(municipios)
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Marcas"
        modal="marcas"
        dataToShow={munAdapter(municipios)}
        Data={municipios}
        {...{ columns }}
      />
    </main>
  );
};

export default MotoPage;
