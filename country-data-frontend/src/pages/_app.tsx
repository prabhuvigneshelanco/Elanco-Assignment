import '../styles/globals.css';
import type {AppProps} from 'next/app';
import 'reflect-metadata';
import {container, Lifecycle} from 'tsyringe';
import axios, {AxiosInstance} from "axios";
import CountryService from "@/src/services/countryService";


export const createAxiosInstance = (baseURL: string): AxiosInstance => {
    return axios.create({
        baseURL, headers: {'Content-Type': 'application/json'}
    });
};

container.register<AxiosInstance>('ICountryServiceClient', { useFactory: () => createAxiosInstance('http://localhost:3001/countries'), });
container.register<CountryService>('ICountryService', { useClass: CountryService},  { lifecycle: Lifecycle.Singleton } );

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
