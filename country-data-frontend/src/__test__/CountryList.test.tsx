import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountryList from '../components/CountryList';
import { describe, it, vi, expect } from 'vitest';
import { fetchCountries } from '../services/countryService';

vi.mock('../services/countryService', () => ({
  fetchCountries: vi.fn(),
}));

describe('CountryList Component', () => {
  const mockCountries = [
    { name: 'United States', region: 'Americas', flag: 'https://example.com/flag1.png' },
    { name: 'India', region: 'Asia', flag: 'https://example.com/flag2.png' },
    { name: 'Australia', region: 'Oceania', flag: 'https://example.com/flag3.png' },
  ];

  it('renders loading state initially', () => {
    (fetchCountries as jest.Mock).mockResolvedValueOnce([]);
    render(<CountryList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message if fetch fails', async () => {
    (fetchCountries as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));
    render(<CountryList />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to load countries/i)).toBeInTheDocument();
    });
  });

  it('renders country cards when fetch is successful', async () => {
    (fetchCountries as jest.Mock).mockResolvedValueOnce(mockCountries);
    render(<CountryList />);
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('India')).toBeInTheDocument();
      expect(screen.getByText('Australia')).toBeInTheDocument();
    });
  });

  it('filters countries based on search input', async () => {
    (fetchCountries as jest.Mock).mockResolvedValueOnce(mockCountries);
    render(<CountryList />);
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('textbox'); // Assuming SearchBar renders an input box
    await userEvent.type(searchInput, 'India');
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
    expect(screen.getByText('India')).toBeInTheDocument();
  });

  it('shows no countries found if search yields no results', async () => {
    (fetchCountries as jest.Mock).mockResolvedValueOnce(mockCountries);
    render(<CountryList />);
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, 'NonExistentCountry');
    expect(screen.getByText('No countries found.')).toBeInTheDocument();
  });
});
