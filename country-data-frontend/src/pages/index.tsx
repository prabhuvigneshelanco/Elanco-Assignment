import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

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

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <p className="text-red-500">{error}</p>;

  /**
   *  Filter the country data based on the name, region and then filter
   */
  const filteredCountries = countries.filter((country: any) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "all" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  })

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
      <div className="grid grid-cols-4">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.name} className="bg-white rounded-lg shadow-md p-4">
              {/* Accessing the flag from the 'flag' property */}
              {country.flag ? (
                <img
                  className="w-10 h-10 object-cover"
                  src={country.flag}
                  alt={`Flag of ${country.name}`}
                />
              ) : (
                <p className="text-center">No Flag Available</p>
              )}
              <div className="mt-2 text-center">
                <h2>{country.name}</h2>
                <p>{country.region}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No countries found.</p>
        )}
      </div>
    </div>
  );
};
