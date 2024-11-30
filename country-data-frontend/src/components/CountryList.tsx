import { useEffect, useState } from "react";
import Country from "../core/types/country";
import { fetchCountries } from "../services/countryService";
import { CountryCard } from "./CountryCard";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";

export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
     const loadCountries = async () => {
        try {
           const response: Country[] = await fetchCountries();
           setCountries(response);
        } catch (err) {
           setError(`Failed to load countries. Error: ${err}`);
        } finally {
           setLoading(false);
        }
     };
     loadCountries();
  }, []);

  if (loading) {
     return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
     return <p className="text-red-500 text-center">{error}</p>;
  }

  const filteredCountries: Country[] = countries.filter((country: Country) => country.name.includes(searchTerm));

  return (
   <div className="min-h-screen bg-gray-100">
     {/* Header */}
     <Header />

     <div className="p-4 sm:p-6">
       {/* Search Input */}
       <SearchBar value={searchTerm} onChange={setSearchTerm} />

       {/* Display filtered countries */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         {filteredCountries.length > 0 ? (
           filteredCountries.map((country) => (
             <CountryCard key={country.name} country={country} />
           ))
         ) : (
           <p className="text-gray-500 text-center">No countries found.</p>
         )}
       </div>
     </div>
   </div>
 );
}
