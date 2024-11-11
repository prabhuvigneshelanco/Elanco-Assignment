import React from "react";
import { Labels } from "../services/labels";

interface CountryCardProps {
  country: {
    name: string;
    region: string;
    flag?: string;
  };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="bg-white border rounded-lg p-4 hover:cursor-pointer hover:shadow-md flex justify-between items-center">
      {country.flag ? (
        <img
          className="w-10 h-10 object-cover"
          src={country.flag}
          alt={`Flag of ${country.name}`}
        />
      ) : (
        <p className="text-center">{Labels.noFlag}</p>
      )}
      <div className="mt-2 text-center">
        <h2>{country.name}</h2>
        <p>{country.region}</p>
      </div>
    </div>
  );
};

export default CountryCard;
