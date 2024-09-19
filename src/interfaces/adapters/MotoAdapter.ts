import { Option } from "@/components/commons/forms/InputSelect";
import { Car, CreateCar, EditCar } from "../Car";
import { CreateMoto, EditMoto, Moto, Motos } from "../Moto";


export const motoAdapter = (motos: Moto[]): TableDataType<Moto>[] => {
  return motos.map((moto) => ({
    color: moto.color || "",
    km: moto.km?.toString() || "",
    nom_marca: moto.marca?.nom_marca || "",
    id_marca:moto.marca?.id_marca.toString() || "",
    nom_modelo: moto.modelo?.nom_modelo || "",
    id_modelo: moto.modelo?.id_modelo.toString() || "",
    key: moto.id_moto || "",
    matricula:moto.matricula || "",
    situacion: moto.situacion?.id_situa?.toString() || ""
  }));
};

export const motoFormAdapter = (moto: Moto): FormDataType<EditMoto> => ({
    color: moto.color || "",
    km: moto.km?.toString() || "",
    id_marca: moto.marca?.id_marca?.toString() || "",
    id_modelo: moto.modelo?.id_modelo.toString() || "",
    matricula:moto.matricula || "",
    id_moto:moto.id_moto.toString()
});

export const motoTypesAdapter = (moto: FormDataType<EditMoto>): EditMoto => ({
    color: moto.color || "",
    km: Number(moto.km),
    id_marca: Number(moto.id_marca),
    id_modelo: Number(moto.id_modelo),
    matricula:moto.matricula || "",
    id_moto: Number(moto.id_moto)
});

export const motoCreateAdapter = (moto: EditMoto): CreateMoto => ({
  color: moto.color || "",
  km: Number(moto.km),
  id_marca: Number(moto.id_marca),
  id_modelo: Number(moto.id_modelo),
  matricula:moto.matricula || "",
  id_situa:3
});

export const carOptionsAdapter = (cars: Car[]): Option[] =>
  cars.map((car) => ({
    label: car.plate as string,
    value: car.car_code?.toString(),
}));


