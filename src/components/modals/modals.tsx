import { CRUD_ModalsType } from ".";
import BrandModal from "./services/BrandModal";
import ContractModal from "./management/ContractModal";
import ServiceModal from "./management/ServiceModal";
import DiscrepancyModal from "./management/DiscrepancyModal";
import RoadmapModal from "./management/RoadmapModal";
import CarModal from "./services/CarModal";
import DriverModal from "./services/DriverModal";
import CoupleModal from "./services/CoupleModal";
import DistrictModal from "./others/DistrictModal";
import FuelModal from "./others/FuelModal";
import CountryModal from "./others/CountryModal";
import TourGroupModal from "./others/TourGroupModal";
import ReportModal from "./management/ReportModal";
import UserModal from "./others/UserModal";
import MonthsModal from "./others/MonthsModal";
import MotoModal from "./services/MotoModal";
import MarcasModal from "./others/MarcasModal";

export const CRUD_Modals: { [key in CRUD_ModalsType]: React.ReactElement } = {
  brands: <BrandModal />,
  contracts: <ContractModal />,
  services: <ServiceModal />,
  cars: <CarModal />,
  drivers: <DriverModal />,
  couples: <CoupleModal />,
  discrepancies: <DiscrepancyModal />,
  roadmaps: <RoadmapModal />,
  districts: <DistrictModal />,
  fuels: <FuelModal />,
  countries: <CountryModal />,
  tour_groups: <TourGroupModal />,
  months: <MonthsModal />,
  reports: <ReportModal />,
  users: <UserModal />,
  motos: <MotoModal/>,
  marcas: <MarcasModal/>
};
