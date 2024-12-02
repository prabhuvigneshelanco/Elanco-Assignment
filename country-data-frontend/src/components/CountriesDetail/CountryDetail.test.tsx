import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import CountryDetail from "./index";

const mockCountry = {
  name: "Japan",
  flag: "https://flagcdn.com/jp.svg",
  population: 125800000,
  region: "Asia",
  languages: { jpn: "Japanese" },
  currency: { JPY: { name: "Japanese Yen", symbol: "¥" } },
};

describe("CountryDetail Component", () => {
  it("renders country details correctly", () => {
    render(<CountryDetail country={mockCountry} />);

    expect(screen.getByAltText(/flag of japan/i)).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /japan/i })).toBeInTheDocument();

    const populationElement = screen.getByText(/population:/i).parentElement;
    expect(populationElement).toHaveTextContent("Population: 125,800,000");

    const regionElement = screen.getByText(/region:/i).parentElement;
    expect(regionElement).toHaveTextContent("Region: Asia");

    const languagesElement = screen.getByText(/languages:/i).parentElement;
    expect(languagesElement).toHaveTextContent("Languages: Japanese");

    const currenciesElement = screen.getByText(/currencies:/i).parentElement;
    expect(currenciesElement).toHaveTextContent("Currencies: Japanese Yen (¥)");
  });
});
