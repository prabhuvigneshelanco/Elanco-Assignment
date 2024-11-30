import { render, screen } from '@testing-library/react';
import { CountryCard } from '../components/CountryCard';
import { describe, it, expect } from 'vitest';

describe('CountryCard Component', () => {
  const countryMock = {
    name: 'Sample Country',
    flag: 'https://example.com/flag.png',
    region: 'Sample Region',
  };

  const countryDetailsMock = {
    name: { common: 'Detailed Country' },
    flag: '🏳️',
    region: 'Detailed Region',
  };

  const noFlagMock = {
    name: 'No Flag Country',
    region: 'Flagless Region',
  };

  it('renders correctly for a simple country object', () => {
    render(<CountryCard country={countryMock} />);
    expect(screen.getByAltText('Flag of Sample Country')).toBeInTheDocument();
    expect(screen.getByText('Sample Country')).toBeInTheDocument();
    expect(screen.getByText('Sample Region')).toBeInTheDocument();
  });

  it('renders correctly for a detailed country object', () => {
    render(<CountryCard country={countryDetailsMock} />);
    expect(screen.getByText('🏳️')).toBeInTheDocument();
    expect(screen.getByText('Detailed Country')).toBeInTheDocument();
    expect(screen.getByText('Detailed Region')).toBeInTheDocument();
  });

  it('renders fallback when no flag is provided', () => {
    render(<CountryCard country={noFlagMock} />);
    expect(screen.getByText('No Flag')).toBeInTheDocument();
    expect(screen.getByText('No Flag Country')).toBeInTheDocument();
    expect(screen.getByText('Flagless Region')).toBeInTheDocument();
  });

  it('renders flag when provided as a character', () => {
    render(<CountryCard country={countryDetailsMock} />);
    expect(screen.getByText('🏳️')).toBeInTheDocument();
  });
});
