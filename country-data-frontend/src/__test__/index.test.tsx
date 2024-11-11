import { expect, test, vi, assert } from 'vitest'
import { renderHook } from '@testing-library/react';
import { render, screen } from '@testing-library/react'
import useCountries from '../hooks/useCountries';
import Home from '../pages'
import { filterCountries } from '../services/countryService';


test('renders loading state while fetching data', async () => {
  (useCountries as jest.Mock).mockReturnValue([[], true, null]);
  render(<Home />)
  expect(screen.getByText(/loading/i))
})


test('should return countries', () => {
  vi.mock("../hooks/useCountries");
  vi.mock("../services/countryService");
  let mockContries = [
    {
      "name": "South Georgia",
      "flag": "https://flagcdn.com/gs.svg",
      "region": "Antarctic"
    },
    {
      "name": "Grenada",
      "flag": "https://flagcdn.com/gd.svg",
      "region": "Americas"
    }];
  (useCountries as jest.Mock).mockReturnValue([mockContries, false, null]);
  (filterCountries as jest.Mock).mockReturnValue(mockContries);
  render(<Home />)
  expect(screen.getByText(/South Georgia/i));
});


test('should return Error message', () => {
  vi.mock("../hooks/useCountries");
  (useCountries as jest.Mock).mockReturnValue([[], false, 'Failed to load countries']);

  render(<Home />)
  expect(screen.getByText(/Failed to load countries/i));
});

test('should return filtered result', () => {
  let mockContries = [
    {
      "name": "South Georgia",
      "flag": "https://flagcdn.com/gs.svg",
      "region": "Antarctic"
    },
    {
      "name": "Grenada",
      "flag": "https://flagcdn.com/gd.svg",
      "region": "Americas"
    }];
  let result = filterCountries(mockContries, 'a')

  assert.strictEqual(result.length, 2)
});