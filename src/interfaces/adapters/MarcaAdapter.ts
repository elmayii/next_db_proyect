import { Option } from "@/components/commons/forms/InputSelect";
import { Modelo } from "../Modelo";
import { Marca } from "../Marca";

export const marcaOptionsAdapter = (marcas: Marca[]): Option[] =>
  marcas.map((marca) => ({
    label: marca.nom_marca as string,
    value: marca.id_marca?.toString(),
}));