import { Request, Response } from 'express';
import axios from 'axios';

const REST_COUNTRIES_API = 'https://restcountries.com/v3.1/all';

const mapCountryData = (country: any) => ({
  name: country.name?.common,
  flag: country.flags?.svg,
  region: country.region,
  population: country.population,
  languages: country.languages,
  currency: country.currencies,
});

// Get all countries
export const getCountries = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data.map(mapCountryData);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve countries' });
  }
};

// Get country by code
export const getCountryByCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    const country = response.data[0];
    if (!country) {
      res.status(404).json({ error: 'Country not found' });
    } else {
      res.json(mapCountryData(country));
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve country by code' });
  }
};

// // Filter countries by region
export const filterCountriesByRegion = async (req: Request, res: Response) => {
  const { region } = req.params;
  try {
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data
      .filter((country: any) => country.region?.toLowerCase() === region.toLowerCase())
      .map(mapCountryData);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter countries by region' });
  }
};

// // Search countries with dynamic filtering
export const searchCountries = async (req: Request, res: Response) => {
  const { name, capital, region, timezone } = req.query;

  try {
    const response = await axios.get(REST_COUNTRIES_API);
    let countries = response.data;
    const filters = [
      (country: any) => !name || country.name?.common.toLowerCase().includes((name as string).toLowerCase()),
      (country: any) => !capital || (country.capital?.[0]?.toLowerCase() || '').includes((capital as string).toLowerCase()),
      (country: any) => !region || country.region?.toLowerCase() === (region as string).toLowerCase(),
      (country: any) => !timezone || country.timezones?.includes(timezone as string),
    ];

    countries = countries
      .filter((country: any) => filters.every(filter => filter(country)))
      .map(mapCountryData);

    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search countries' });
  }
};
