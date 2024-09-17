import { Option } from "@/components/commons/forms/InputSelect";
import { CreateModelo, Modelo } from "../Modelo";

export const modeloOptionsAdapter = (modelos: Modelo[]): Option[] =>
  modelos.map((modelo) => ({
    label: modelo.nom_modelo as string,
    value: modelo.id_modelo?.toString(),
}));
export const modeloTypesAdapter = (modelo: FormDataType<Modelo>): Modelo => ({
  nom_modelo:modelo.nom_modelo,
  id_modelo: Number(modelo.id_modelo),
});

export const modeloCreateAdapter = (modelo: Modelo): CreateModelo => ({
  nom_modelo:modelo.nom_modelo,
});

export const modeloFormAdapter = (modelo:Modelo): FormDataType<Modelo> => ({
  nom_modelo: modelo.nom_modelo || "",
  id_modelo: modelo.id_modelo?.toString() || "",
});

export const modeloAdapter = (modelo:Modelo[]): TableDataType<Modelo>[] =>{
  return modelo.map((modelo) => ({
    nom_modelo: String(modelo.nom_modelo),
    key: modelo.id_modelo?.toString() 
  }));
}
  