import { Option } from "@/components/commons/forms/InputSelect";
import { Modelo } from "../Modelo";
import {  CreateMarca, Marca } from "../Marca";

export const marcaAdapter = (marcas:Marca[]): TableDataType<Marca>[] =>{
  return marcas.map((marca) => ({
    nom_marca: marca.nom_marca as string,
    key: marca.id_marca?.toString() 
  }));
}
  

export const marcaOptionsAdapter = (marcas: Marca[]): Option[] =>
  marcas.map((marca) => ({
    label: marca.nom_marca as string,
    value: marca.id_marca?.toString(),
}));

export const marcaTypesAdapter = (marca: FormDataType<Marca>): Marca => ({
  nom_marca:marca.nom_marca as string,
  id_marca: Number(marca.id_marca),
});

export const marcaCreateAdapter = (marca: Marca): CreateMarca => ({
nom_marca:marca.nom_marca,
});

export const marcaFormAdapter = (marca:Marca): FormDataType<Marca> => ({
  nom_marca: marca.nom_marca || "",
  id_marca: marca.id_marca?.toString() || "",
});

