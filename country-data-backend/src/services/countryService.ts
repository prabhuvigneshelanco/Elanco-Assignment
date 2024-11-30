import axios from "axios";
import { ALL_COUNTRIES, BASE_REST_COUNTRIES_API } from "../core/constants";

export const fetchAllCountries = async () => {
   try {
      const { data } = await axios.get(BASE_REST_COUNTRIES_API + ALL_COUNTRIES);
      const countries = data.map((country: any) => ({
         name: country.name.common,
         flag: country.flags.svg,
         region: country.region,
      }));
      return {
        status: 200,
        data: countries,
      };
   } catch (error) {
      return {
         status: 500,
         data: "Failed to fetch countries!",
      };
   }
};

export const fetchCountryByCode = async (code: string) => {
   const response = await axios.get(BASE_REST_COUNTRIES_API + `/alpha/${code}`);
   return response.data[0];
};
