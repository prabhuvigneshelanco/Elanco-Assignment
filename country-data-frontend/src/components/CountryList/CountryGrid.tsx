import Loading from "../Common/Loading";
import CountryCard from "./CountryCard";

type Country = {
  name: string;
  flag: string | null;
  region: string;
  code: string;
};

type CountryGridProps = {
  countries: Country[];
  loading: boolean;
};

function CountryGrid({ countries, loading }: CountryGridProps) {
  const isCountryListExists = countries.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {isCountryListExists ? (
          <>
            {countries.map((country, index) => {
              const { name, flag, region, code } = country;
              return (
                <CountryCard
                  key={`${name}_${index}`}
                  name={name}
                  flag={flag}
                  region={region}
                  code={code}
                />
              );
            })}
          </>
        ) : null}
      </div>
      {loading ? (
        <Loading />
      ) : (
        !isCountryListExists && (
          <p className="text-gray-500 text-center col-span-full">
            No countries found.
          </p>
        )
      )}
    </>
  );
}

export default CountryGrid;
