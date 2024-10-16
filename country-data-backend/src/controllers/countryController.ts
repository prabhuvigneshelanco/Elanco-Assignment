import { Request, Response, NextFunction, RequestHandler } from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';

const REST_COUNTRIES_API = 'https://restcountries.com/v3.1/all';
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// Get all countries
export const getCountries: RequestHandler = async (req, res, next) => {
  try {
    const cachedData = cache.get('countries');
    if (cachedData) {
      res.json(cachedData); // Send response, but don't return anything
      return;
    }

    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data.map((country: any) => ({
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
      code: country.cca3,
    }));

    cache.set('countries', countries); // Cache the result
    res.json(countries); // Send the response
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

// Get country by code
export const getCountryByCode: RequestHandler = async (req, res, next) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    const country = response.data[0];

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
      currency: country.currencies,
    });
  } catch (error) {
    next(error);
  }
};


// Filter countries by region
export const filterCountriesByRegion: RequestHandler = async (req, res, next) => {
  try {
    const { region } = req.params;
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data.filter((country: any) => country.region === region);
    res.json(countries);
  } catch (error) {
    next(error);
  }
};

// Search countries by multiple parameters
export const searchCountries: RequestHandler = async (req, res, next) => {
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
};
