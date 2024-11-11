import axios from 'axios';

export const fetchCountries = async () => {
  const response = await axios.get('http://localhost:3001/countries');
  return response.data;
};