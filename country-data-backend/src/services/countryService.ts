import axios from "axios";
import { ALL_COUNTRIES, BASE_REST_COUNTRIES_API } from "../core/constants";
import { Country } from "../core/types/country";
import { APIResponse } from "../core/types/apiResponse";

export const fetchAllCountries = async () => {
   let result: APIResponse = {
      status: 0,
      data: "",
   };

   try {
      const { data } = await axios.get(BASE_REST_COUNTRIES_API + ALL_COUNTRIES);
      const countries: Country = data.map((country: any) => ({
         name: country.name.common,
         flag: country.flags.svg,
         region: country.region,
      }));

      result.status = 200;
      result.data = countries;
      return result;
   } catch (error) {
      result.status = 500;
      result.data = "Failed to fetch countries!";
      return result;
   }
};

export const fetchCountryByCode = async (code: string) => {
   let result: APIResponse = {
      status: 0,
      data: "",
   };

   try {
      const url = BASE_REST_COUNTRIES_API + `/alpha/${code}`;
      const response = await axios.get(url);
      const responseData = response.data?.[0];

      const country: Country = {
         name: responseData.name.common,
         flag: responseData.flags.svg,
         population: responseData.population,
         languages: responseData.languages,
         region: responseData.region,
         currency: responseData.currencies,
      };

      result.status = 200;
      result.data = country;
   } catch (error: any) {
      switch (error.status) {
         case 400:
            result.data = "Country code is required";
            break;
         case 404:
            result.data = "Country not found";
            break;
         default:
            result.data = "Failed to fetch country by code";
            break;
      }
      result.status = error.status;
   } finally {
      return result;
   }
};
