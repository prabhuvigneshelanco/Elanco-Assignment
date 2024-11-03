"use client";

import React from 'react'
import {useCountryContext} from "@/src/contexts/CountryContext";

export const SearchBar: React.FC = () => {

    const context = useCountryContext();

    if (!context.loading)
        return (
           <div className="mb-4">
            <label className="block text-gray-700">
                Search for a Country
            </label>
            <input
                id="search"
                type="text"
                placeholder="Enter country name"
                className="border border-gray-300"
                value={context.SearchTerm}
                onChange={(e) => context.setSearchTerm(e.target.value)}
            />
        </div>
        );
};

export default SearchBar;