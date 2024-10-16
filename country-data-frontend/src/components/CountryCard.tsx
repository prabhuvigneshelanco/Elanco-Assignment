import React from 'react';
import Link from 'next/link';

interface CountryCardProps {
  country: {
    name: string;
    region: string;
    flag: string;
    code: string; // Use the `code` field (alpha-3 code)
  };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Link href={`/countries/${country.code}`} passHref>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
        {country.flag ? (
          <img
            className="w-full h-32 object-cover rounded-t-lg"
            src={country.flag}
            alt={`Flag of ${country.name}`}
          />
        ) : (
          <p className="text-center">No Flag Available</p>
        )}
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold">{country.name}</h2>
          <p className="text-gray-500">{country.region}</p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
