import axios from "axios";
import { ALL_COUNTRIES, BASE_REST_COUNTRIES_API } from "../core/constants";
import { Country, CountryDetails } from "../core/types/country";
import { APIResponse } from "../core/types/apiResponse";

export const fetchAllCountriesService = async () => {
   let result: APIResponse = {
      status: 0,
      data: "",
   };

   const response = await fetchAllCountriesCompleteData();

   if (Array.isArray(response.data) && response.data.every((item) => typeof item === "object")) {
      const countries: Country[] = response.data.map((country: any) => ({
         name: country.name.common,
         flag: country.flags.svg,
         region: country.region,
      }));
      result.status = 200;
      result.data = countries;
      return result;
   } else {
      return response;
   }
};

export const fetchCountryByCodeService = async (code: string) => {
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

export const filterCountriesByRegionService = async (region: string) => {
   let result: APIResponse = {
      status: 0,
      data: "",
   };

   const response = await fetchAllCountriesCompleteData();

   if (Array.isArray(response.data) && response.data.every((item) => typeof item === "object")) {
      const filteredCountries = response.data.filter((country: any) => country.region === region);
      result.status = 200;
      result.data = filteredCountries;
      return result;
   } else {
      return response;
   }
};

export const searchCountriesService = async (name: any, capital: any, region: any, timezone: any) => {
   let result: APIResponse = {
      status: 0,
      data: "",
   };

   const response = await fetchAllCountriesCompleteData();
   const countries = response.data as CountryDetails[];

   if (Array.isArray(countries) && countries.every((item) => typeof item === "object")) {
      let filteredCountries: CountryDetails[] = countries;

      if (name) {
         filteredCountries = filteredCountries.filter((country: any) =>
            country.name.common.toLowerCase().includes((name as string).toLowerCase())
         );
      }
      if (capital) {
         filteredCountries = filteredCountries.filter(
            (country: any) =>
               country.capital && country.capital[0].toLowerCase().includes((capital as string).toLowerCase())
         );
      }
      if (region) {
         filteredCountries = filteredCountries.filter((country: any) => country.region === region);
      }
      if (timezone) {
         const formattedTimezone = formatTimezone(timezone);
         if (formattedTimezone) {
            filteredCountries = filteredCountries.filter((country: any) =>
               country.timezones.includes(formattedTimezone)
            );
         }
      }

      result.status = 200;
      result.data = filteredCountries;
      return result;
   } else {
      return response;
   }
};

const fetchAllCountriesCompleteData = async () => {
   let result: APIResponse = {
      status: 0,
      data: "",
   };

   try {
      const { data } = await axios.get(BASE_REST_COUNTRIES_API + ALL_COUNTRIES);
      result.status = 200;
      result.data = data;
      return result;
   } catch (error) {
      result.status = 500;
      result.data = "Failed to fetch countries!";
      return result;
   }
};

const formatTimezone = (timezone: string) => {
   let decodedTimezone = decodeURIComponent(timezone as string);

   // Format to UTC+HH:mm format
   if (decodedTimezone) {
      const match = decodedTimezone.match(/^UTC([+-]?)(\d{1,2}):(\d{2})$/);
      if (match) {
         const [, sign, hours, minutes] = match;
         const paddedHours = hours.padStart(2, "0"); // Ensure two digits for hours
         decodedTimezone = `UTC${sign}${paddedHours}:${minutes}`;
         return decodedTimezone;
      }
   }
};
