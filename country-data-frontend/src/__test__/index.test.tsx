import {expect, test, vi} from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/src/pages'
import { AxiosInstance } from "axios";
import {container, Lifecycle} from "tsyringe";
import CountryService, {Country} from "@/src/services/countryService";
import  { CountryContext } from "@/src/contexts/CountryContext";
import React from "react";
import SearchBar from "@/src/components/SearchBar";
import CountryCard from "@/src/components/CountryCard";

const mockResponse: any[] = JSON.parse('[{"name": "New Zealand","flag": "https://flagcdn.com/nz.svg","region": "Oceania" }, {"name": "Nicaragua","flag": "https://flagcdn.com/ni.svg",   "region": "Americas"  },  {    "name": "Anguilla",    "flag": "https://flagcdn.com/ai.svg",    "region": "Americas"  }]');

const MockCountryContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
  const setSearchTerm = vi.fn();
  const Countries: Country[] = mockResponse.map(item =>
    ({
      name: item.name,
      flag: item.flag,
      region: item.region
    }) as Country);
  const SearchTerm: string = "";
  const loading: boolean = false;
  const error: string | null = null;
  return (<CountryContext.Provider value={{Countries, SearchTerm , setSearchTerm, loading, error}}> {children} </CountryContext.Provider>);
};

const mockAxiosInstance: AxiosInstance = {
  create: vi.fn(),
  get: vi.fn(),
  post: vi.fn()
} as AxiosInstance;

export default mockAxiosInstance;

container.register<AxiosInstance>('ICountryServiceClient', { useFactory: () => mockAxiosInstance });
container.register<CountryService>('ICountryService', { useClass: CountryService},  { lifecycle: Lifecycle.Transient } );

test('renders loading state while fetching data', async () => {
  render(<Home />)
  expect(screen.getByText(/loading/i))
})

describe('Home with Countries', () => {
  beforeEach(() =>  {
    render(
        <MockCountryContextProvider>
          <SearchBar />
          <CountryCard />
       </MockCountryContextProvider> );
  });

  it('renders countries from context', () =>
  {
    expect(screen.getByText(/Nicaragua/i))
  });
});