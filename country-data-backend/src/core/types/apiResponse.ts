import { Country, CountryDetails } from "./country";

export type APIResponse = {
  status: number,
  data: string | Country | Country[] | CountryDetails[],
}