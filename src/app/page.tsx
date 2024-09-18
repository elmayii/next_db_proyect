"use client"
import contract from "@/assets/icons/items/contract.svg";
import brand from "@/assets/icons/items/brand.svg";
import car from "@/assets/icons/items/car.svg";
import moto from "@/assets/moto.svg"
import couple from "@/assets/icons/items/couple-user.svg";
import fuel from "@/assets/icons/items/fuel-gas-station.svg";
import geography from "@/assets/icons/items/geography.svg";
import id from "@/assets/icons/items/id-card.svg";
import discrepancy from "@/assets/icons/items/report-text.svg";
import report from "@/assets/icons/items/report.svg";
import road from "@/assets/icons/items/road-map-and-pin.svg";
import service from "@/assets/icons/items/service.svg";
import tourist from "@/assets/icons/items/tourist.svg";
import users from "@/assets/icons/items/user.svg";
import OptionSection from "@/components/main/OptionSection";
import OptionItem from "@/components/main/OptionItem";
import bxs from "@/assets/icons/items/bxs-calendar.svg";
import free_code from "@/assets/icons/items/free_cover.svg";
import { useTranslation } from "react-i18next";
import suitcase from "@/assets/icons/items/suitcase.svg";
import bus from "@/assets/icons/items/bus.svg";
import world from "@/assets/icons/items/world.svg";
import group from "@/assets/icons/items/group.svg";
import coin from "@/assets/icons/items/coin.svg";
import district from "@/assets/icons/items/district.svg"
import { useSession } from "next-auth/react";

export default function Home() {

  //const {t} = useTranslation(["translation"])

  const {data}=useSession();
  
  return (
    <main className="flex flex-col items-center gap-6 ml-3  p-5">
      <OptionSection name={("Administración")}>
        <>
          <OptionItem name={("Contratos")} img={contract} link="./contratos" />
          <OptionItem name={("Clientes")} img={id} link="./clientes" />
          <OptionItem name={("Motos")} img={moto} link="./motos" />
          <OptionItem name={("Municipios")} img={brand} link="./municipios" />
          <OptionItem name={("Marcas")} img={brand} link="./marcas" />
          <OptionItem name={("Situacion")} img={car} link="./situacion" />
          <OptionItem name={("Modelos")} img={car} link="./modelos" />
        </>
      </OptionSection>
      <OptionSection name={("Servicios")}>
        <>
          
          <OptionItem name={("Motos(en tiempo real)")} img={moto} link="./motos(real)" />
          <OptionItem name={("Mis Contratos")} img={contract} link="./contracts" />
        </>
      </OptionSection>
      <OptionSection name={("Reportes")}>
        <>
          <OptionItem name={("Clientes (incumplidores de contrato)")} img={id} link="./drivers" />
          <OptionItem name={("Resumen de contratos por marcas y modelos")} img={suitcase} link="./top_3_groups" />
          <OptionItem name={("Resumen de contratos por municipios")} img={bus} link="./top_5_drivers" />
          <OptionItem name={("Listado de ingresos del año")} img={world} link="./top_3_countries" />
          <OptionItem name={("Situacion de Motos")} img={car} link="./motos_situacion" />

        </>
      </OptionSection>
      {data?.role_code==1 && <OptionSection name={("Otros")}>
        <>
          <OptionItem name={("District")} img={district} link="./districts" />
          <OptionItem name={("Fuel")} img={fuel} link="./fuels" />
          <OptionItem name={("Country")} img={geography} link="./countries" />
          <OptionItem name={("Month")} img={bxs} link="./months" />
          <OptionItem name={("Tour group")} img={tourist} link="./tourist_groups" />
          <OptionItem name={("Users")} img={users} link="./users" />
        </>
      </OptionSection>}
    </main>
  );
}
