"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchInput from "../components/SearchBar";
import CountryCard from "../components/CountryCard";
import { fetchCountries } from "../services/countryService";
import { Labels } from "../services/labels";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError(Labels.errorMessage);
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        {Labels.loading}
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  const filteredCountries = countries.filter((country: any) => {
    const matchesSearchTerm = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = country.region
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearchTerm || matchesRegion;
  });

  return (
    <div>
      <Header />
      <div className="p-6">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <CountryCard key={country} country={country} />
            ))
          ) : (
            <p className="text-gray-500">{Labels.noCountryFound}</p>
          )}
        </div>
      </div>
    </div>
  );
}
