import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Header } from "@/src/components/Header";
import { fetchCountriesByRegion } from "@/src/services/countryService";
import { CountryCard } from "@/src/components/CountryCard";
import { CountryDetails } from "@/src/core/types/countryDetails";
import { SearchBar } from "@/src/components/SearchBar";

export default function RegionPage() {
   const router = useRouter();
   const { code } = router.query; // Get the dynamic route parameter
   const [countries, setCountries] = useState<CountryDetails[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      if (!code) return; // Wait until `code` is available

      const loadCountriesByRegion = async () => {
         setLoading(true);
         try {
            const response: CountryDetails[] = await fetchCountriesByRegion(code as string);
            setCountries(response);
         } catch (err) {
            setError(`Failed to load countries. Please try again later. Error: ${err}`);
         } finally {
            setLoading(false);
         }
      };

      loadCountriesByRegion();
   }, [code]);

   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
   if (error) return <p className="text-red-500 text-center">{error}</p>;
   const filteredCountries: CountryDetails[] = countries.filter((country: CountryDetails) => country.name.common.includes(searchTerm));


   return (
      <div className="min-h-screen bg-gray-100">
         <Header />

         <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold mb-4">Countries in {code}</h1>

            {/* Search Input */}
            <SearchBar value={searchTerm} onChange={setSearchTerm} />

            {/* Display filtered countries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => <CountryCard key={country.name.common} country={country} />)
               ) : (
                  <p className="text-gray-500 text-center">No countries found for this region.</p>
               )}
            </div>
         </div>
      </div>
   );
}
