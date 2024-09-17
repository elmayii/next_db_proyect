import { Option } from "@/components/commons/forms/InputSelect";
import { Modelo } from "../Modelo";
import {  CreateMarca, Marca } from "../Marca";
import { CreateSituacion, Situacion } from "../Situacion";

export const situaAdapter = (situaciones:Situacion[]): TableDataType<Situacion>[] =>{
  return situaciones.map((situacion) => ({
    nom_situa: situacion.nom_situa as string,
    key: situacion.id_situa?.toString()
  }));
}
  

export const situaOptionsAdapter = (situaciones: Situacion[]): Option[] =>
  situaciones.map(({ id_situa, nom_situa }) => ({
    label: nom_situa as string,
    value: id_situa?.toString(),
  }));

export const situaTypesAdapter = (situacion: FormDataType<Situacion>): Situacion => ({
  nom_situa:situacion.nom_situa,
  id_situa: Number(situacion.id_situa),
});

export const situaCreateAdapter = (situacion: Situacion): CreateSituacion => ({
  nom_situa:situacion.nom_situa,});

export const situaFormAdapter = (situacion:Situacion): FormDataType<Situacion> => ({
  nom_situa: situacion.nom_situa || "",
  id_situa: situacion.id_situa?.toString() || "",
});

