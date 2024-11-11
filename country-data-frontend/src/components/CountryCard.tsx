import Loader from "./loader";


interface CardProps {
    filteredCountries: any;
    loading: any;
};

export default function CountryCard({ filteredCountries, loading }: CardProps) {
    if (loading) return <Loader />;
    return (<div className="grid grid-cols-4">
        {filteredCountries.length > 0 ? (
            filteredCountries.map((country: any) => (
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
        ) : (
            <p className="text-gray-500">No countries found.</p>
        )}
    </div>)
}