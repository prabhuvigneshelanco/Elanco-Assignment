import { Request, Response } from "express";
import axios from "axios";
import { fetchAllCountriesService, fetchCountryByCodeService, filterCountriesByRegionService } from "../services/countryService";

const REST_COUNTRIES_API = "https://restcountries.com/v3.1/all";

// Get all countries
export const getCountries = async (req: Request, res: Response) => {
   const { status, data } = await fetchAllCountriesService();
   res.status(status).json(data);
};

// Get country by code
export const getCountryByCode = async (req: Request, res: Response) => {
   const { code } = req.params;
   const { status, data } = await fetchCountryByCodeService(code);
   res.status(status).json(data);
};

// Filter countries by region
export const filterCountriesByRegion = async (req: Request, res: Response) => {
   const { region } = req.params;
   const { status, data } = await filterCountriesByRegionService(region);
   res.status(status).json(data);
};

// Search countries
export const searchCountries = async (req: Request, res: Response) => {
   const { name, capital, region, timezone } = req.query;
   const response = await axios.get(REST_COUNTRIES_API);
   let countries = response.data;
   if (name) {
      countries = countries.filter((country: any) =>
         country.name.common.toLowerCase().includes((name as string).toLowerCase())
      );
   }
   if (capital) {
      countries = countries.filter(
         (country: any) =>
            country.capital && country.capital[0].toLowerCase().includes((capital as string).toLowerCase())
      );
   }
   if (region) {
      countries = countries.filter((country: any) => country.region === region);
   }
   if (timezone) {
      countries = countries.filter((country: any) => country.timezones.includes(timezone as string));
   }
   res.json(countries);
};
