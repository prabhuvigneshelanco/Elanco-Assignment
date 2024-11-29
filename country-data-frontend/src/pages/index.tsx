import { useState, useEffect } from "react";
import Country from "../core/types/country";
import { fetchCountries } from "../services/countryService";
import { CountryCard } from "../components/CountryCard";
import { SearchBar } from "../components/SearchBar";
import { Header } from "../components/Header";

export default function Home() {
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
      return <p className="text-red-500">{error}</p>;
   }

   const filteredCountries: Country[] = countries.filter((country: Country) => country.name.includes(searchTerm));

   return (
      <div className="p-6">
         {/* App Header */}
         <Header />

         {/* Search countries */}
         <SearchBar value={searchTerm} onChange={setSearchTerm} />

         {/* Display filtered countries */}
         <div className="grid grid-cols-4">
            {filteredCountries.length > 0 ? (
               filteredCountries.map((country) => <CountryCard key={country.name} country={country} />)
            ) : (
               <p className="text-gray-500">No countries found.</p>
            )}
         </div>
      </div>
   );
}
