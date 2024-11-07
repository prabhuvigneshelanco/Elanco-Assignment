import axios from "axios";
import { countryService } from "../services/countryService";
import { Country } from "../types/Country";
import { describe, it, beforeEach, vi, expect } from "vitest";

// Change the mocking approach for Vitest
vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

// Use Vitest's type for mocked axios
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

process.env.NEXT_PUBLIC_API_URL = "http://test-api";

describe("countryService", () => {
  const mockCountry: Country = {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    region: "Europe",
    population: 67391582,
    languages: { fra: "French" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    capital: ["Paris"],
    timezones: ["UTC+01:00"],
  };

  const mockCountries: Country[] = [
    {
      code: "US",
      name: "United States",
      flag: "🇺🇸",
      region: "Americas",
      population: 331002651,
      languages: { eng: "English" },
      currencies: { USD: { name: "United States dollar", symbol: "$" } },
      capital: ["Washington, D.C."],
      timezones: [
        "UTC-12:00",
        "UTC-11:00",
        "UTC-10:00",
        "UTC-09:00",
        "UTC-08:00",
        "UTC-07:00",
        "UTC-06:00",
        "UTC-05:00",
        "UTC-04:00",
      ],
    },
    {
      code: "FR",
      name: "France",
      flag: "🇫🇷",
      region: "Europe",
      population: 67391582,
      languages: { fra: "French" },
      currencies: { EUR: { name: "Euro", symbol: "€" } },
      capital: ["Paris"],
      timezones: ["UTC+01:00"],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllCountries", () => {
    it("should fetch all countries", async () => {
      // Setup the mock response
      vi.mocked(mockedAxios.get).mockResolvedValueOnce({ data: mockCountries });

      const result = await countryService.getAllCountries();

      expect(result).toEqual(mockCountries);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/countries`
      );
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe("getCountryByCode", () => {
    it("should fetch country by code", async () => {
      vi.mocked(mockedAxios.get).mockResolvedValueOnce({ data: mockCountry });

      const result = await countryService.getCountryByCode("FR");

      expect(result).toEqual(mockCountry);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/countries/FR`
      );
    });
  });

  describe("getCountriesByRegion", () => {
    it("should fetch countries by region", async () => {
      vi.mocked(mockedAxios.get).mockResolvedValueOnce({ data: mockCountries });

      const result = await countryService.getCountriesByRegion("Europe");

      expect(result).toEqual(mockCountries);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/countries/region/Europe`
      );
    });
  });

  describe("error handling", () => {
    it("should throw error when API call fails", async () => {
      const error = new Error("API Error");
      vi.mocked(mockedAxios.get).mockRejectedValueOnce(error);

      await expect(countryService.getAllCountries()).rejects.toThrow(
        "API Error"
      );
    });
  });
});
