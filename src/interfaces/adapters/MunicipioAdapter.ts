import { Option } from "@/components/commons/forms/InputSelect";
import { Modelo } from "../Modelo";
import {  CreateMunicipio, Municipio } from "../Municipio";

export const munAdapter = (mun:Municipio[]): TableDataType<Municipio>[] =>{
  return mun.map((mun) => ({
    nom_mun: mun.nom_mun as string,
    key: mun.id_mun?.toString() 
  }));
}
  

export const munOptionsAdapter = (mun: Municipio[]): Option[] =>
  mun.map((mun) => ({
    label: mun.nom_mun as string,
    value: mun.id_mun?.toString(),
}));

export const munTypesAdapter = (mun: FormDataType<Municipio>): Municipio => ({
  nom_mun:mun.nom_mun,
  id_mun: Number(mun.id_mun),
});

export const munCreateAdapter = (mun: Municipio): CreateMunicipio => ({
nom_mun:mun.nom_mun,
});

export const munFormAdapter = (mun:Municipio): FormDataType<Municipio> => ({
  nom_mun: mun.nom_mun || "",
  id_mun: mun.id_mun?.toString() || "",
});

