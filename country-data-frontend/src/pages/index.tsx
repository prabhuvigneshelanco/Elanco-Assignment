import { useState, useEffect } from 'react';
import { CountryList } from '../components/CountryList';
import { SearchBar } from '../components/SearchBar';
import { RegionFilter } from '../components/RegionFilter';
import { Country } from '../types/Country';
import { countryService } from '../services/countryService';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [capitalSearch, setCapitalSearch] = useState('');
  const [timezoneSearch, setTimezoneSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const fetchCountries = async (region = 'All') => {
    console.log(`Fetching countries for region: ${region}`);

    setLoading(true);

    try {
      let response;
      
      if (region === 'All') {
        response = await countryService.getAllCountries();
      }
      else {
        response = await countryService.getCountriesByRegion(region);
      }
      setCountries(response);
      setLoading(false);
    } catch (err) {
      setError('Failed to load countries');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries(selectedRegion);
  }, [selectedRegion]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <p className="text-red-500">{error}</p>;

  console.log('countries:', countries);
  const filteredCountries = countries.filter((country: Country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex space-x-4">
      <div className="">
        <SearchBar 
            countrySearch={countrySearch}
            capitalSearch={capitalSearch}
            timezoneSearch={timezoneSearch}
            onCountrySearchChange={setCountrySearch}
            onCapitalSearchChange={setCapitalSearch}
            onTimezoneSearchChange={setTimezoneSearch}
          />
        </div>
        <div className="">
          <RegionFilter selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
        </div>
      </div>
      <CountryList countries={filteredCountries} />
    </div>
  );
};
