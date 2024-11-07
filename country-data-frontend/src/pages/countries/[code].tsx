import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { countryService } from "../../services/countryService";
import { Country, Currency } from "../../types/Country";
import { getCurrentTime } from "../../utils/timeUtils";

export default function CountryDetails() {
  const router = useRouter();
  const { code } = router.query;
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (code) {
      getCountry(code as string);
    }
  }, [code]);

  const getCountry = async (code: string) => {
    try {
      const response = await countryService.getCountryByCode(code);
      setCountry(response);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    router.push("/");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error)
    return <p className="text-red-500 text-center text-xl mt-10">{error}</p>;
  if (!country)
    return <p className="text-center text-xl mt-10">No country found</p>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <button
        onClick={handleBackClick}
        className="mb-8 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center shadow-md"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Country List
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 w-full mb-6">
          <Image
            className="object-cover"
            src={country.flag}
            alt={`Flag of ${country.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="px-6 py-4">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            {country.name}
          </h1>

          <p className="text-xl text-center text-gray-600 mb-6">
            Current Time: {getCurrentTime(country.timezones)}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Region" value={country.region} />
            <InfoItem
              label="Capital"
              value={country.capital ? country.capital.join(", ") : "N/A"}
            />
            <InfoItem
              label="Population"
              value={country.population.toLocaleString()}
            />
            <InfoItem
              label="Languages"
              value={Object.values(country.languages || {}).join(", ")}
            />
            <InfoItem
              label="Currencies"
              value={Object.entries(country.currencies || {})
                .map(
                  ([code, currency]: [string, Currency]) =>
                    `${currency.name} (${currency.symbol})`
                )
                .join(", ")}
            />
            <InfoItem label="Timezones" value={country.timezones.join(", ")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number | string[];
}) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}
