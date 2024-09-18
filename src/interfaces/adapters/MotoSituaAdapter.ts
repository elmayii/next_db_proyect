import { Option } from "@/components/commons/forms/InputSelect";
import { MotoSituacion } from "../MotoSituacion";

export const motosituaAdapter = (motos_situaciones: MotoSituacion[]): TableDataType<MotoSituacion>[] => {
  return motos_situaciones.map((ms) => ({
   matricula: ms.matricula,
   nom_marca: ms.nom_marca,
   nom_situa: ms.nom_situa,
   fecha_fin: ms.fecha_fin?.toISOString() ?? '',
   key:ms.matricula
  }));
}


export const motosituaOptionsAdapter = (motos_situaciones: MotoSituacion[]): Option[] =>
  motos_situaciones.map(( ms) => ({
    label: ms.matricula,
    value: ms.matricula?.toString(),
  }));

export const motosituaTypesAdapter = (moto_situacion: FormDataType<MotoSituacion>): MotoSituacion => ({
  matricula:moto_situacion.matricula,
  nom_marca:moto_situacion.nom_marca,
  nom_situa:moto_situacion.nom_situa,
  fecha_fin: new Date(moto_situacion.fecha_fin)
});


export const motosituaFormAdapter = (moto_situacion: MotoSituacion): FormDataType<MotoSituacion> => ({
  matricula:moto_situacion.matricula ?? "",
  nom_marca:moto_situacion.nom_marca ?? "",
  nom_situa: moto_situacion.nom_situa ?? "",
  fecha_fin: moto_situacion.fecha_fin?.toISOString() ?? "",
});

