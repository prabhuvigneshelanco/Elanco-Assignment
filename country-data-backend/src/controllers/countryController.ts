import { Request, Response } from "express";
import axios from "axios";
import { fetchAllCountries, fetchCountryByCode } from "../services/countryService";

const REST_COUNTRIES_API = "https://restcountries.com/v3.1/all";

// Get all countries
export const getCountries = async (req: Request, res: Response) => {
   const { status, data } = await fetchAllCountries();
   res.status(status).json(data);
};

// Get country by code
export const getCountryByCode = async (req: Request, res: Response) => {
   const { code } = req.params;
   const { status, data } = await fetchCountryByCode(code);
   res.status(status).json(data);
};

// Filter countries by region
export const filterCountriesByRegion = async (req: Request, res: Response) => {
   const { region } = req.params;
   const response = await axios.get(REST_COUNTRIES_API);
   const countries = response.data.filter((country: any) => country.region === region);
   res.json(countries);
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
