import React,{useState} from 'react';
import { regions } from '../constants';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedRegion: string;
    setSelectedRegion: (region: string) => void;
}
/**
 * SearchBar Component 
 */
const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
}) => {
    const [selectedFilter, setSelectedFilter] = useState(selectedRegion);
    const [searchQuery, setSearchQuery] = useState(searchTerm);

    // Handle the search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

     // Handle the filter change
    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    // Trigger search with the current filter
    const handleSearch = () => {
        setSearchTerm(searchQuery)
        setSelectedRegion (selectedFilter);
    };

    // Clear the search
    const handleClear = () => {
        setSearchTerm('')
        setSearchQuery('')
        setSelectedFilter('all')
        setSelectedRegion('all')
    };
    return (
        <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <div className="flex space-x-4">
                {/* Search Input */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                
                {/* Region Dropdown */}
                <select
                    value={selectedFilter}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {regions.map((region) => (
                    <option key={region} value={region}>
                        {region}
                    </option>
                    ))}
                </select>
                {searchQuery && (
                <button
                    onClick={handleClear}
                    className="text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
                )}
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Search
                </button>

            </div>
        </div>
    );
};

export default SearchBar;