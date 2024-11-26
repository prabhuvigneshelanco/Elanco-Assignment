import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState("all");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:3001/countries');
        setCountries(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load countries');
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  

  /**
   *  Filter the country data based on the name, region and then filter
   */
  const filteredCountries = countries.filter((country: any) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCapital = country.capital
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTimezone = country.timezones
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "all" || country.region === selectedRegion;
    return matchesCapital || matchesSearch || matchesTimezone && matchesRegion;
  })

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* Header Component */}
      <Header />
      {/** Search Bar Component */}
      <div className="mb-4">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </div>

      {/* Display filtered countries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country: any) => (
            <CountryCard key={country.code} country={country} />
          ))
        ) : (
          <p className="text-gray-500">No countries found.</p>
        )}
      </div>
    </div>
  );
};
