import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages";
import { Labels } from "../services/labels";
import { fetchCountries } from "../services/countryService";

vi.mock("../services/countryService", () => ({
  fetchCountries: vi.fn(),
}));

test("renders loading state while fetching data", async () => {
  vi.mocked(fetchCountries).mockReturnValueOnce(new Promise(() => {}));
  render(<Home />);
  expect(screen.getByText(Labels.loading));
});

test("displays an error message if fetching countries fails", async () => {
  vi.mocked(fetchCountries).mockRejectedValueOnce(new Error("Failed to fetch"));

  render(<Home />);
  await waitFor(() => {
    expect(screen.getByText(Labels.errorMessage));
  });
});

test("displays an error message if fetching countries fails", async () => {
  vi.mocked(fetchCountries).mockRejectedValueOnce(new Error("Failed to fetch"));

  render(<Home />);
  await waitFor(() => {
    expect(screen.getByText(Labels.errorMessage));
  });
});

test("displays a list of countries when data is fetched successfully", async () => {
  const mockCountries = [
    { name: "United States", region: "Americas", flag: "url" },
    { name: "Germany", region: "Europe", flag: "url" },
  ];
  vi.mocked(fetchCountries).mockResolvedValueOnce(mockCountries);
  render(<Home />);
  await waitFor(() => {
    expect(screen.getByText("United States"));
    expect(screen.getByText("Germany"));
  });
});
