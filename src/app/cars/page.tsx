import React from "react";
import { ColumnsType } from "antd/es/table";
import { Car } from "@/interfaces/Car";
import carService from "@/services/tables/cars";
import TableData from "@/components/commons/tables/TableData";
import { carAdapter } from "@/interfaces/adapters/CarAdapter";

const columns: ColumnsType<Car> = [
  {
    title: "Fleet number",
    dataIndex: "fleet_number",
    key: "fleet_number",
  },
  {
    title: "Plate",
    dataIndex: "plate",
    key: "plate",
  },
  {
    title: "Brand",
    dataIndex: "brand_name",
    key: "brand_name",
  },
  {
    title: "Couple",
    dataIndex: "couple_name",
    key: "couple_name",
  },
];

const CarPage = async () => {
  let cars: Car[] = [];
  try {
    cars = await carService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Cars"
        modal="cars"
        dataToShow={carAdapter(cars)}
        Data={cars}
        {...{ columns }}
      />
    </main>
  );
};

export default CarPage;
