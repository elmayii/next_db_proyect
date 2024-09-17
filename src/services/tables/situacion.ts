import { DELETE, GET, POST } from "..";
import { Service } from "../IService";
import { Couple } from "@/interfaces/Couple";

const situaService: Service = {
  get: async (key?: string) => GET(`situacion${key ? `/${key}` : ""}`),
  getBy: async (key?: string) => GET(`situacion${key ? `/${key}` : ""}`),
  add: async (data: Couple) => POST("situacion", data),
  delete: async (key: string) => DELETE(`situacion/${key}`),
  update: async (key: string, body: Couple) => POST(`situacion/${key}`, body),
};

export default situaService;