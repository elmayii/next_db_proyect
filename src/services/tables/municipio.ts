import { DELETE, GET, POST } from "..";
import { Service } from "../IService";
import { Couple } from "@/interfaces/Couple";

const municipioService: Service = {
  get: async (key?: string) => GET(`municipios${key ? `/${key}` : ""}`),
  getBy: async (key?: string) => GET(`municipios${key ? `/${key}` : ""}`),
  add: async (data: Couple) => POST("municipios", data),
  delete: async (key: string) => DELETE(`municipios/${key}`),
  update: async (key: string, body: Couple) => POST(`municipios/${key}`, body),
};

export default municipioService;