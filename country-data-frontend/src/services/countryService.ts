import axios from "axios";
import Country from "../core/types/country";
import { BASE_URL, HOST } from "../core/constants/uris";
import { CountryDetails } from "../core/types/countryDetails";

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get(HOST + BASE_URL);
  return response.data as Country[];
};

export const fetchCountriesByRegion = async (region: string): Promise<CountryDetails[]> => {
  const formattedRegion = region.charAt(0).toUpperCase() + region.slice(1)
  const response = await axios.get(HOST + BASE_URL + `/region/${formattedRegion}`);
  return response.data as CountryDetails[];
}