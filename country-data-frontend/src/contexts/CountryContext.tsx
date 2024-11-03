"use client";
import 'reflect-metadata';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import CountryService, {Country} from "@/src/services/countryService";
import {container} from 'tsyringe';

type CountryContextProps = {
    Countries: Country[];
    SearchTerm : string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    error: string | null;
    loading: boolean;
}

interface CountryProviderProps {
    children: ReactNode;
}

export const CountryContext = createContext<CountryContextProps | undefined>(undefined);

export default function CountryContextProvider ({ children }: CountryProviderProps) {

    const service = container.resolve(CountryService);
    const [Countries, setCountries] = useState<Country[]>([]);
    const [SearchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const data = await service.getCountries();
            if (data !== undefined) {
                setCountries(data);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setError('Failed to fetch data');
        }
    }
    fetchData();

    return (<CountryContext.Provider value={{Countries, SearchTerm , setSearchTerm, loading, error}}> {children} </CountryContext.Provider>);
};

export const useCountryContext = (): CountryContextProps => {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error('useCountryContext must be used within a CountryContextProvider');
    }
    return context;
};