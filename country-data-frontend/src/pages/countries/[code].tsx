import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import { countryService } from '../../services/countryService';
import { Country, Currency } from '../../types/Country';

export default function CountryDetails() {
    const router = useRouter();
    const { code } = router.query;
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!country) return <p>No country found</p>;

    console.log('Country data:', country);
    console.log('Currencies:', country.currencies);
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{country.name}</h1>
            <div className="relative w-32 h-32 mb-4">
                <Image
                    className="object-contain"
                    src={country.flag}
                    alt={`Flag of ${country.name}`}
                    fill
                    sizes="64px"
                />
            </div>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Population:</strong> {country.population}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
            <p>
                <strong>Currencies:</strong> { 
                    Object.entries(country.currencies || {}).map(([code, currency]: [string, Currency]) => (
                        `${currency.name} (${currency.symbol})`
                    )).join(', ') 
                }
            </p>
        </div>
    )
}