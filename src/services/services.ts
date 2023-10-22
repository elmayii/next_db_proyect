import { CRUD_ModalsType } from "@/components/modals";
import brandService from "./tables/brands";
import contractService from "./tables/contracts";
import servicesService from "./tables/services";
import { Service } from "./IService";

const services: { [key in CRUD_ModalsType]: Service } = {
  brands: brandService,
  contracts: contractService,
  services: servicesService,
};

export default services;