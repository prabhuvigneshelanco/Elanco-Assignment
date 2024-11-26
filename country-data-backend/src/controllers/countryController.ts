import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';


const REST_COUNTRIES_API = 'https://restcountries.com/v3.1/all';

const TEST_SERVER_SELF_SIGN = " http://localhost:4000/countries"

const cache = new NodeCache(); // cache

// Get all countries based on pagination
export const getCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const cachedData = cache.get('countries');
      if (cachedData) {
        res.json(cachedData); // Send response, but don't return anything
        return;
      }
      const { page = 1, limit = 10 } = req.query;
      const response = await axios.get(TEST_SERVER_SELF_SIGN);

      const countries = response.data.map((country: any) => ({
        name: country.name.common,
        flag: country.flags.svg,
        region: country.region,
        timezones: country.timezones[0],
        code: country.cca3,
        capital: country.capital? country.capital[0] : 'NA'
      }));
      
      // Parse page and limit parameters
      const pageNum = Number(page);
      const limitNum = Number(limit);

      // // Calculate the indices for the slice
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;

      // Get the batch of countries based on pagination
      const countriesBatch = countries.slice(startIndex, endIndex);
      console.log(countriesBatch)
      res.status(200).json(countriesBatch);
  } catch (error) {
    next(error); // return the error
  }
};

// Get country by code
export const getCountryByCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { code } = req.params;
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
      const country = response.data[0];
      let currency = country.currencies
      if (!country) {
        res.status(404).json({ error: 'Country not found' });
        return;
      }

      res.json({
        name: country.name.common,
        flag: country.flags.svg,
        population: country.population,
        languages: country.languages,
        region: country.region,
        currency: country.currencies? currency[Object.keys(currency)[0]].name : 'NA',
        capital: country.capital? country.capital[0] : 'NA'
      });
    } catch (error) {
      next(error);
    }
};

// Filter countries by region
export const filterCountriesByRegion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { region } = req.params;
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data.filter((country: any) => country.region === region);
    res.json(countries);
  } catch (error) {
    next(error);
  }
};

// Search countries
export const searchCountries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name = '', capital = '', region = '', timezone = '' } = req.query;
      const response = await axios.get(REST_COUNTRIES_API);
      let countries = response.data;

      countries = countries.filter((country: any) =>
        country.name.common.toLowerCase().includes((name as string).toLowerCase()) &&
        (country.capital ? country.capital[0].toLowerCase().includes((capital as string).toLowerCase()) : true) &&
        country.region.toLowerCase().includes((region as string).toLowerCase()) &&
        country.timezones.some((tz: string) => tz.includes(timezone as string))
      );

      res.json(countries);
    } catch (error) {
      next(error);
    }
  }
