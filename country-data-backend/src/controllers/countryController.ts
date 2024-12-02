import axios from "axios";
import { Request, Response } from "express";

const BASE_API = "https://restcountries.com/v3.1";
const ITEMS_PER_PAGE = 40;

const fetchCountriesByQuery = async (endpoint: string): Promise<any[]> => {
  try {
    const response = await axios.get(endpoint);
    return response.data.map((country: any) => ({
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
      code: country.cca2.toLowerCase(),
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw new Error("Failed to fetch countries");
  }
};

const paginate = (data: any[], page: number, itemsPerPage: number) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  return {
    data: data.slice(startIndex, endIndex),
    currentPage: page,
    totalPages: Math.ceil(data.length / itemsPerPage),
  };
};

export const getCountries = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const allCountries = await fetchCountriesByQuery(`${BASE_API}/all`);
    const paginated = paginate(allCountries, page, ITEMS_PER_PAGE);
    res.json(paginated);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch countries data" });
  }
};

export const getCountryByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${BASE_API}/alpha/${code.toUpperCase()}`);
    const country = response.data[0];
    res.json({
      name: country.name.common,
      flag: country.flags.svg,
      population: country.population,
      languages: country.languages,
      region: country.region,
      currency: country.currencies,
    });
  } catch (error) {
    console.error("Error fetching country by code:", error);
    res.status(500).json({ error: "Failed to fetch country data" });
  }
};

export const searchCountries = async (req: Request, res: Response) => {
  try {
    const { name, capital, region, timezone, page = 1 } = req.query;
    let endpoint = `${BASE_API}/all`;
    let filterFn = (country: any) => true;

    if (name && region) {
      endpoint = `${BASE_API}/name/${name}`;
      filterFn = (country: any) =>
        country.region.toLowerCase() === (region as string).toLowerCase();
    } else if (capital && region) {
      endpoint = `${BASE_API}/capital/${capital}`;
      filterFn = (country: any) =>
        country.region.toLowerCase() === (region as string).toLowerCase();
    } else if (name) {
      endpoint = `${BASE_API}/name/${name}`;
    } else if (capital) {
      endpoint = `${BASE_API}/capital/${capital}`;
    } else if (region) {
      endpoint = `${BASE_API}/region/${region}`;
    } else if (timezone) {
      filterFn = (country: any) =>
        country.timezones?.some((tz: string) =>
          tz.includes(timezone as string)
        );
    }

    const allCountries = await fetchCountriesByQuery(endpoint);
    const filteredCountries = allCountries.filter(filterFn);
    const paginated = paginate(
      filteredCountries,
      parseInt(page as string),
      ITEMS_PER_PAGE
    );
    res.json(paginated);
  } catch (error) {
    console.error("Error in searchCountries:", error);
    res.status(500).json({ error: "Failed to search countries" });
  }
};
