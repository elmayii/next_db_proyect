import { CRUD_ModalsType } from "@/components/modals";
import { Service } from "./IService";
import brandService from "./tables/brands";
import carService from "./tables/cars";
import contractService from "./tables/contracts";
import countryService from "./tables/countries";
import coupleService from "./tables/couples";
import discrepancyService from "./tables/discrepancies";
import districtService from "./tables/districts";
import driverService from "./tables/drivers";
import fuelService from "./tables/fuels";
import monthService from "./tables/months";
import reportService from "./tables/reports";
import roadmapService from "./tables/roadmaps";
import servicesAppService from "./tables/services";
import tourService from "./tables/tour_groups";
import userService from "./tables/users";
import motoService from "./tables/moto";
import marcaService from "./tables/marca";
import modeloService from "./tables/modelo";
import clientService from "./tables/clients";
import situaService from "./tables/situacion";

const services: { [key in CRUD_ModalsType]: Service } = {
  contratos: contractService,
  clientes: clientService,
  users: userService,
  months: monthService,
  marcas: marcaService,
  modelos: modeloService,
  motos: motoService,
  situacion: situaService
};

export default services;
