import { useState, useEffect } from 'react';

import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/loader';
import useCountries from '../hooks/useCountries';
import { filterCountries } from '../services/countryService';

export default function Home() {
  const baseUrl = 'http://localhost:3001/countries';

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [constructedURL, setConstructedURL] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<any>([]);
  const [countries, loading, error] = useCountries(`${baseUrl}${constructedURL}`);

  useEffect(() => {
    if (searchType != 'region') {
      const result:any = filterCountries(countries as Array<any>, searchTerm);
      setFilteredCountries(result);
    }else{
      setFilteredCountries(countries);
    }
  }, [searchType, searchTerm, countries])

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* Search Input */}
      <SearchBar setSearchType={setSearchType} setSearchTerm={setSearchTerm} setConstructedURL={setConstructedURL} constructedURL={constructedURL} searchTerm={searchTerm} searchType={searchType} />
      {/* Display filtered countries */}
      {loading ? (<Loader />) : (<CountryCard filteredCountries={filteredCountries} loading={loading} />)}
    </div>
  );
};
