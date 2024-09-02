
import { Service } from "../IService";
import { DELETE, GET, POST } from "..";
import { Moto } from "@prisma/client";

const motoService: Service = {
    get: async (key?: string) => GET(`motos${key ? `/${key}` : ""}`),
    add: async (data: Moto) => POST("motos", data),
    delete: async (key: string) => DELETE(`motos/${key}`),
    update: async (key: string, body: Moto) => POST(`motos/${key}`, body),
};

export default motoService