import { useDebounce } from "@/hooks/useDebounce";
import { debounce } from "@/utils/helperFunction";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import CountryGrid from "./CountryGrid";
import SearchBar from "./SearchBar";

type Country = {
  name: string;
  flag: string | null;
  region: string;
  code: string;
};

export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchCountries = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/countries/search`, {
        params: {
          [searchType]: debouncedSearchQuery || undefined,
          region: region || undefined,
          page: currentPage,
        },
      });

      const fetchedCountries = response.data?.data || [];
      const total = response.data?.totalPages || 1;
      setTotalPages(total);
      setHasMore(currentPage < total);
      setCountries((prev) =>
        currentPage === 1 ? fetchedCountries : [...prev, ...fetchedCountries]
      );
    } catch (err: any) {
      setError(err.message || "Failed to load countries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries(page);
  }, [page]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchCountries(1);
  }, [region, debouncedSearchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setPage(1);
      setHasMore(true);
      fetchCountries(1);
    }
  }, [searchType]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore &&
      page < totalPages
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore, totalPages]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [handleScroll]);

  if (error)
    return <p className="text-red-500 text-center">{error || "Error"}</p>;

  return (
    <div className="p-6">
      {/* Search and Region Filters */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-1">
              <SearchBar
                searchType={searchType}
                setSearchType={setSearchType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <div className="flex-1">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:border-blue-300 bg-[#fff]"
              >
                <option value="">All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Country Grid */}
      <CountryGrid countries={countries} loading={loading} />
    </div>
  );
}
