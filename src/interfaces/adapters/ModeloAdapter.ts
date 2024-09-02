import { Option } from "@/components/commons/forms/InputSelect";
import { Modelo } from "../Modelo";

export const modeloOptionsAdapter = (modelos: Modelo[]): Option[] =>
  modelos.map((modelo) => ({
    label: modelo.nom_modelo as string,
    value: modelo.id_modelo?.toString(),
}));