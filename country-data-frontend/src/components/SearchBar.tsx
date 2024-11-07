import React from "react";

interface SearchBarProps {
  countrySearch: string;
  capitalSearch: string;
  timezoneSearch: string;
  onCountrySearchChange: (value: string) => void;
  onCapitalSearchChange: (value: string) => void;
  onTimezoneSearchChange: (value: string) => void;
}

export const SearchBar = ({ 
  countrySearch, 
  capitalSearch, 
  timezoneSearch, 
  onCountrySearchChange, 
  onCapitalSearchChange, 
  onTimezoneSearchChange 
}: SearchBarProps ) => {
    return (
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="w-fullblock text-sm font-medium text-gray-700 mb-2">
              Search Countries
            </label>
            <input
              id="search"
              type="text"
              placeholder="Country name"
              className="w-full border border-gray-300 px-4 py-2"
              value={countrySearch}
              onChange={(e) => onCountrySearchChange(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="capital-search" className="block text-sm font-medium text-gray-700 mb-2">
                Search by Capital
            </label>
            <input
                id="capital-search"
                type="text"
                placeholder="Enter capital city"
                className="w-full border border-gray-300 px-4 py-2"
                value={capitalSearch}
                onChange={(e) => onCapitalSearchChange(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="timezone-search" className="block text-sm font-medium text-gray-700 mb-2">
                Search by Timezone
            </label>
            <input
                id="timezone-search"
                type="text"
                placeholder="Enter timezone (e.g., UTC+05:30)"
                className="w-full border border-gray-300 px-4 py-2"
                value={timezoneSearch}
                onChange={(e) => onTimezoneSearchChange(e.target.value)}
            />
          </div>
      </div>
    )
};