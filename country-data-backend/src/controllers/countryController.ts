import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { Country } from "../entities/country";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const REST_COUNTRIES_API = "https://restcountries.com/v3.1";

// Get all countries
export const getCountries = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await axios.get<Country[]>(`${REST_COUNTRIES_API}/all`);
    const countries = response.data.map((country: Country) => ({
      code: country.cca3,
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
      timezones: country.timezones,
    }));
    res.json(countries);
  }
);

// Get country by code
export const getCountryByCode = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.params;

    const response = await axios.get<Country[]>(
      `${REST_COUNTRIES_API}/alpha/${code}`
    );

    if (response.data.length === 0) {
      return next(new AppError(`Country with code ${code} not found`, 404));
    }

    const country = response.data[0];
    res.json({
      code: country.cca3,
      name: country.name.common,
      flag: country.flags.svg,
      population: country.population,
      languages: country.languages,
      region: country.region,
      capital: country.capital,
      currencies: country.currencies,
      timezones: country.timezones,
    });
  }
);

// Filter countries by region
export const filterCountriesByRegion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { region } = req.params;

    const response = await axios.get<Country[]>(`${REST_COUNTRIES_API}/all`);
    const countries = response.data
      .filter((country: Country) => country.region === region)
      .map((country: Country) => ({
        code: country.cca3,
        name: country.name.common,
        flag: country.flags.svg,
        region: country.region,
        timezones: country.timezones,
      }));

    res.json(countries);
  }
);

// Search countries
export const searchCountries = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, capital, region, timezone } = req.query;

    const response = await axios.get(`${REST_COUNTRIES_API}/all`);
    let countries = response.data;

    if (name) {
      countries = countries.filter((country: Country) =>
        country.name.common
          .toLowerCase()
          .includes((name as string).toLowerCase())
      );
    }
    if (capital) {
      countries = countries.filter(
        (country: Country) =>
          country.capital &&
          country.capital[0]
            .toLowerCase()
            .includes((capital as string).toLowerCase())
      );
    }
    if (region) {
      countries = countries.filter(
        (country: Country) => country.region === region
      );
    }
    if (timezone) {
      countries = countries.filter((country: Country) =>
        country.timezones.includes(timezone as string)
      );
    }

    res.json(countries);
  }
);
