import { Brand, CreateBrand, EditBrand } from "../Brand";
import { Option } from "@/components/commons/forms/InputSelect";
import { Car, CreateCar, EditCar } from "../Car";

export const carAdapter = (cars: Car[]): TableDataType<Car>[] => {
  return cars.map((car) => ({
    ...car,
    brand_name: car.brand?.brand_name,
    key: car.number,
    couple_name: `${car.couple?.driver1?.driver_name} and ${car.couple?.driver2?.driver_name}`,
  }));
};

export const carFormAdapter = (
  car: TableDataType<Car>
): FormDataType<EditCar> => ({
  car_code: car.car_code?.toString(),
  number: car.number.toString(),
  plate: car.plate?.toString() ?? "",
  brand_code: car?.brand?.brand_code.toString(),
  couple_code: car.couple?.couple_code?.toString() ?? "",
});

export const carTypesAdapter = (car: FormDataType<EditCar>): CreateCar => ({
  fleet_number: Number(car.number),
  plate: car.plate,
  brand_code: Number(car.brand_code),
  couple_code: parseInt(car.couple_code ?? ""),
});

export const carCreateAdapter = (car: EditCar): CreateCar => ({
  fleet_number: car.number,
  plate: car.plate,
  brand_code: car.brand_code,
  couple_code: car.couple_code,
});

export const carOptionsAdapter = (cars: Car[]): Option[] =>
  cars.map((car) => ({
    label: car.plate as string,
    value: car.car_code.toString(),
  }));