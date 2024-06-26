import dayjs from "dayjs";
import { Roadmap, EditRoadmap } from "../Roadmap";
import { timeToDate } from "@/lib/utils";

export const roadmapTableAdapter = (
  roadmaps: Roadmap[]
): TableDataType<Roadmap>[] =>
  roadmaps.map((roadmap) => ({
    key: `${roadmap.car.car_code}-:-${roadmap.roadmap_date}`,
    car_code: roadmap.car?.car_code,
    roadmap_date: dayjs(roadmap.roadmap_date).format("YYYY-MM"),
    departure_time: roadmap.departure_time
      ? dayjs(roadmap.departure_time).format("hh:mm A")
      : "",
    kms: roadmap.kms || "",
  }));

export const roadmapFormAdapter = (
  roadmap: Roadmap
): FormDataType<EditRoadmap> => ({
  roadmap_date: roadmap.roadmap_date
    ? dayjs(roadmap.roadmap_date).format("YYYY-MM-DD")
    : "",
  car_code: roadmap.car.car_code.toString() ?? "",
  kms: roadmap.kms?.toString() ?? "",
  departure_time: roadmap.departure_time
    ? dayjs(roadmap.departure_time).format("HH:mm")
    : "",
});

export const roadmapTypesAdapter = (
  roadmap: FormDataType<EditRoadmap>
): EditRoadmap => ({
  roadmap_date: new Date(roadmap.roadmap_date),
  car_code: parseInt(roadmap.car_code ?? ""),
  kms: parseFloat(roadmap.kms),
  departure_time: timeToDate(roadmap.departure_time),
});
