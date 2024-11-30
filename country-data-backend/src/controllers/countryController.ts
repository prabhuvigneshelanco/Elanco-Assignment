import { Request, Response } from "express";
import {
   fetchAllCountriesService,
   fetchCountryByCodeService,
   filterCountriesByRegionService,
   searchCountriesService,
} from "../services/countryService";

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
   const { status, data } = await searchCountriesService(name, capital, region, timezone);
   res.status(status).json(data);
};
