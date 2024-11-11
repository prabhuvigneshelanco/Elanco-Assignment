import React from "react";
import { Labels } from "../services/labels";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="search" className="block text-gray-700">
        {Labels.searchBarLabel}
      </label>
      <input
        id="search"
        type="text"
        placeholder={Labels.searchBarPlaceholder}
        className="border border-gray-300 px-2 py-1 rounded-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
