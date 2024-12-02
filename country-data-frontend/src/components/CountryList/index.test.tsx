import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { vi } from "vitest";
import CountryList from "./index";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockCountries = [
  {
    name: "India",
    flag: "https://flagcdn.com/in.svg",
    region: "Asia",
    code: "IN",
  },
  {
    name: "Japan",
    flag: "https://flagcdn.com/jp.svg",
    region: "Asia",
    code: "JP",
  },
];

describe("CountryList Component", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it("debounces search input", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: mockCountries,
        currentPage: 1,
        totalPages: 1,
      },
    });

    render(<CountryList />);

    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, { target: { value: "ind" } });

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith("/api/countries/search", {
        params: {
          name: "ind",
          region: undefined,
          page: 1,
        },
      });
    });
  });
});
