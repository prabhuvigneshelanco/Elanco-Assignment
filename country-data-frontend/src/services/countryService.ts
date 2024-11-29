import axios from "axios";
import Country from "../core/types/country";
import { BASE_URL, HOST } from "../core/constants/uris";

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get(HOST + BASE_URL);
  return response.data as Country[];
};