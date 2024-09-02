import { DELETE, GET, POST } from "..";
import { Service } from "../IService";
import { Couple } from "@/interfaces/Couple";

const modeloService: Service = {
  get: async (key?: string) => GET(`modelos${key ? `/${key}` : ""}`),
  add: async (data: Couple) => POST("modelos", data),
  delete: async (key: string) => DELETE(`modelos/${key}`),
  update: async (key: string, body: Couple) => POST(`modelos/${key}`, body),
};

export default modeloService;