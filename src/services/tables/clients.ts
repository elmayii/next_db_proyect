
import { Service } from "../IService";
import { DELETE, GET, GETBY, POST } from "..";
import { Moto } from "@prisma/client";

const clientService: Service = {
    get: async (key?: string) => GET(`clientes${key ? `/${key}` : ""}`),
    getBy: async (key?: string) => GETBY(`clientes${key ? `/${key}` : ""}`),
    add: async (data: Moto) => POST("clientes", data),
    delete: async (key: string) => DELETE(`clientes/${key}`),
    update: async (key: string, body: Moto) => POST(`clientes/${key}`, body),
};

export default clientService