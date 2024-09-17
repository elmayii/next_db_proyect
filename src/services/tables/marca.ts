import { DELETE, GET, POST } from "..";
import { Service } from "../IService";
import { Couple } from "@/interfaces/Couple";

const marcaService: Service = {
  get: async (key?: string) => GET(`marcas${key ? `/${key}` : ""}`),
  getBy: async (key?: string) => GET(`motos${key ? `/${key}` : ""}`),
  add: async (data: Couple) => POST("marcas", data),
  delete: async (key: string) => DELETE(`marcas/${key}`),
  update: async (key: string, body: Couple) => POST(`marcas/${key}`, body),
};

export default marcaService;