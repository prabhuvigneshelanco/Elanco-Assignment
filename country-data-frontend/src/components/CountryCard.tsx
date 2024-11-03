"use client";

import React from 'react'

import {useCountryContext} from "@/src/contexts/CountryContext";

export const CountryCard: React.FC = () => {

    const context = useCountryContext();

    if (context.loading)
        return <div className="flex justify-center items-center h-screen">Loading...</div>;

    if (context.error)
        return <p className="text-red-500">{context.error}</p>;

    if (!context.loading && context.Countries !== undefined) {
        const filteredCountries = context.Countries.filter((country: any) => country.name.includes(context.SearchTerm));

        return (
            <div className="grid grid-cols-4">
                {filteredCountries?.length < 1 ? (
                    <p className="text-gray-500">No countries found.</p>
                ) : (
                    filteredCountries?.map((country) => (
                        <div key={country.name} className="bg-white rounded-lg shadow-md p-4">
                            {/* Accessing the flag from the 'flag' property */}
                            {country.flag ? (
                                <img
                                    className="w-10 h-10 object-cover"
                                    src={country.flag}
                                    alt={`Flag of ${country.name}`}
                                />
                            ) : (
                                <p className="text-center">No Flag Available</p>
                            )}
                            <div className="mt-2 text-center">
                                <h2>{country.name}</h2>
                                <p>{country.region}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    }
};

export default CountryCard;