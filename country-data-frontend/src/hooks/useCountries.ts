import { useState, useEffect } from "react";
import axios from 'axios';

const useCountries = (url: string):any[] => {
    const [countries, setCountries] = useState<Array<string>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');
    

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setCountries(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load countries');
                setLoading(false);
            }
        };
        fetchCountries();
    }, [url]);

    return [countries,loading, error];
};

export default useCountries;
