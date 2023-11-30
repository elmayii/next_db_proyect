import { Car } from "./Car";
import { Country } from "./Country";
export interface Contract {
  contract_code: number;
  applicant_name: string | null;
  start_date: Date | null;
  end_date: Date | null;
  contract_kms: number | null;
  contract_amount: number | null;
  country?: Country;
  plate?: Car;
}

export interface EditContract extends Omit<Contract, "country" | "plate"> {
  country_code?: string;
  car_code?: number;
}

export interface CreateContract extends Omit<EditContract, "contract_code"> {}
