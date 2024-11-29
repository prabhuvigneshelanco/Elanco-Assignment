import Image from "next/image";
import Country from "../core/types/country";

export const CountryCard: React.FC<{ country: Country }> = ({ country }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 md:space-x-6">
    {country.flag ? (
      <Image
      className="h-16 w-16 object-cover rounded-md"
      src={country.flag}
      alt={`Flag of ${country.name}`}
      width="70"
      height="70"
    />
    ) : (
      <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 flex items-center justify-center rounded-md">
        <span className="text-gray-500 text-sm">No Flag</span>
      </div>
    )}
    <div className="flex flex-col">
      <h2 className="font-semibold text-base md:text-lg">{country.name}</h2>
      <p className="text-sm text-gray-500">{country.region}</p>
    </div>
  </div>
);
