import Countries, { getServerSideProps } from "@/pages/countries/[code]";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { describe, it, vi } from "vitest";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockCountry = {
  name: "India",
  flag: "https://flagcdn.com/in.svg",
  population: 1393409038,
  region: "Asia",
  languages: { hin: "Hindi", eng: "English" },
  currency: { INR: { name: "Indian Rupee", symbol: "₹" } },
};

describe("Countries Page", () => {
  it("renders CountryDetail with correct data", async () => {
    render(<Countries country={mockCountry} />);

    expect(screen.getByRole("heading", { name: /india/i })).toBeInTheDocument();

    const populationElement = screen.getByText(/population:/i).parentElement;
    expect(populationElement).toHaveTextContent("Population: 1,393,409,038");

    const regionElement = screen.getByText(/region:/i).parentElement;
    expect(regionElement).toHaveTextContent("Region: Asia");

    const languagesElement = screen.getByText(/languages:/i).parentElement;
    expect(languagesElement).toHaveTextContent("Languages: Hindi, English");

    const currenciesElement = screen.getByText(/currencies:/i).parentElement;
    expect(currenciesElement).toHaveTextContent("Currencies: Indian Rupee (₹)");
  });

  it("fetches country data with getServerSideProps", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockCountry });

    const context = { params: { code: "in" } };
    const response = await getServerSideProps(context as any);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.API_URL}/countries/in`
    );
    expect(response).toEqual({ props: { country: mockCountry } });
  });

  it("returns notFound when no data is fetched", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    const context = { params: { code: "invalid-code" } };
    const response = await getServerSideProps(context as any);

    expect(response).toEqual({ notFound: true });
  });
});
