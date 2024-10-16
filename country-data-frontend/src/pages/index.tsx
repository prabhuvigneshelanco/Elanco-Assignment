import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Fetch countries from the backend on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:3001/countries');
        setCountries(response.data); // Assuming each country has a 'code' field for the ISO code
        setLoading(false);
      } catch (err) {
        setError('Failed to load countries');
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Filter countries by search term and selected region
  const filteredCountries = countries.filter((country: any) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === 'All' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="container mx-auto p-6">
      {/* Header Component */}
      <Header />

      {/* Search and Region Filter Bar */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-10">{error}</p>}

      {/* Display Skeleton Loader or Country Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country: any) => (
              <CountryCard key={country.code} country={country} />
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              No countries found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
