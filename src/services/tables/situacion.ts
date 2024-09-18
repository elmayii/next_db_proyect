import { DELETE, GET, POST } from "..";
import { Service } from "../IService";
import { Couple } from "@/interfaces/Couple";

const motoSituaService: Service = {
  get: async (key?: string) => GET(`motos_situacion${key ? `/${key}` : ""}`),
  getBy: async (key?: string) => GET(`motos_situacion${key ? `/${key}` : ""}`),
  add: async (data: Couple) => POST("motos_situacion", data),
  delete: async (key: string) => DELETE(`motos_situacion/${key}`),
  update: async (key: string, body: Couple) => POST(`motos_situacion/${key}`, body),
};

export default motoSituaService;