import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import axios, { AxiosInstance, AxiosResponse } from 'axios';


export type Country = {
    name: string
    flag: string
    population: number
    languages: Languages
    region: string
    currency: Currency
}

export type Languages = {
    [key: string]: string
}

export type Currency = {
    [key: string]: CurrencyDetails
}

export type CurrencyDetails = {
    name: string
    symbol: string
}

export type GetCountriesResponse = {
    data: Country[];
};

export type GetCountryResponse = {
    data: Country;
};

type CountrySearchKeys = 'name' | 'capital' | 'region' | 'timezone';

@injectable()
export default class CountryService {

    private apiClient: AxiosInstance;

    constructor(
        @inject('ICountryServiceClient') private apiClientParam: AxiosInstance)
    {
        this.apiClient = apiClientParam;
    }

    public async getCountries() {
        try {
            const response: AxiosResponse<GetCountriesResponse> = await this.apiClient.get<GetCountriesResponse>('');
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    public async getCountryById(countryId: string)  {
        try {
            const response : AxiosResponse<GetCountryResponse> = await this.apiClient.get<GetCountryResponse>('/country/' + countryId);
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    public async getCountriesByRegion(region: string)  {
        try {
            const response : AxiosResponse<GetCountriesResponse> = await this.apiClient.get<GetCountriesResponse>('/region/' + region);
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    public async getSearch(key: CountrySearchKeys, val: string)  {
        try {
            const response : AxiosResponse<GetCountryResponse> = await this.apiClient.get<GetCountryResponse>('/search?' + key+ '=' + val);
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }
}