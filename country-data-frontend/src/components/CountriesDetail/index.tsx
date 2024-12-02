import Image from "next/image";

type Country = {
  name: string;
  flag: string;
  population: number;
  region: string;
  languages: { [key: string]: string };
  currency: { [key: string]: { name: string; symbol: string } };
};
function CountryDetail({ country }: { country: Country }) {
  const { name, flag, population, region, languages, currency } = country;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Image
          src={flag}
          alt={`Flag of ${name}`}
          className="w-32 h-20 object-cover rounded"
          width={64}
          height={64}
        />
        <h1 className="text-3xl font-bold">{name}</h1>
      </div>
      <div className="mt-4">
        <p>
          <strong>Population:</strong> {population.toLocaleString()}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Languages:</strong> {Object.values(languages).join(", ")}
        </p>
        <p>
          <strong>Currencies:</strong>{" "}
          {currency
            ? Object.values(currency)
                .map((cur) => `${cur.name} (${cur.symbol})`)
                .join(", ")
            : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default CountryDetail;
