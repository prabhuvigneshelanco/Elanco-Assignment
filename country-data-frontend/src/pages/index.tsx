import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';
import CountryListSkeleton from '../components/CountryListSkeleton';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Function to load countries based on the current page
  const loadCountries = async (page) => {
    if (loading || !hasMore) return; // Prevent multiple requests while loading

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3001/countries?page=${page}&limit=12`);
      const data = await res.json();

      // Append new countries to the existing list
      setCountries((prevCountries) => [...prevCountries, ...data]);

      // If the number of countries returned is less than the requested limit, no more data exists
      if (data.length < 10) {
        setHasMore(false);
      }

      setCurrentPage(page + 1);
    } catch (error) {
      console.error('Error loading countries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll event listener to trigger lazy loading
  const handleScroll = () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

    if (nearBottom) {
      loadCountries(currentPage);
    }
  };

  useEffect(() => {
    loadCountries(currentPage);
  }, []);

   // Attach the scroll listener
   useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  

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

  if (loading) return(<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <CountryListSkeleton key={index} />
      ))}
    </div>
  )

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
        {!hasMore && <p>No more countries to load.</p>}
      </div>
    </div>
  );
};
