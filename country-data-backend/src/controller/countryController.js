import axios from 'axios';

const REST_COUNTRIES_API = 'https://restcountries.com/v3.1/all';

function convertTo12HourFormat(format) {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();

  const setHours = parseInt(format.split(':')[0], 10); 
  const setMinutes = parseInt(format.split(':')[1] || 0, 10); 

  let adjustedHours = utcHours + setHours;
  let adjustedMinutes = utcMinutes + setMinutes;

  if (adjustedMinutes >= 60) {
      adjustedMinutes -= 60;
      adjustedHours += 1;
  } else if (adjustedMinutes < 0) {
      adjustedMinutes += 60;
      adjustedHours -= 1;
  }

  if (adjustedHours >= 24) {
      adjustedHours -= 24;
  } else if (adjustedHours < 0) {
      adjustedHours += 24;
  }
  const period = adjustedHours >= 12 ? 'PM' : 'AM';
  const hour12 = adjustedHours % 12 || 12;
  const formattedMinutes = adjustedMinutes.toString().padStart(2, '0');

  return `${hour12}:${formattedMinutes} ${period}`;
}

export const getCountries = async (req, res) => {
  try {
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data.map((country) => ({
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region
    }));
     res.status(200).json(countries)
 
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch countries.' })
  }
};

export const getCountryDetails = async (req, res) => {
  const countryName = req.query.name;
  if (!countryName) {
    return res.status(400).json({ error: 'Country name is required' });
  }
  try {
    const response = await axios.get(REST_COUNTRIES_API);
    let countries = response.data.filter((country) => country.name.common.toLowerCase() === countryName.toLowerCase())
    .map((country) => ({
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
      capital: country.capital[0],
      population: country.population,
      language: country && country.languages  || "Unknown",
      currencies: country.currencies,
      timezones: convertTo12HourFormat(country.timezones[0])
    }));
     res.status(200).json(countries[0]);
 
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch countries.' })
  }
};

export const filterCountriesByRegion = async (req, res) => {
    let region = req.query.region ? req.query.region.toLowerCase() : ''
    try {
      const response = await axios.get(REST_COUNTRIES_API);
      console.log(response.data)
      const countries = response.data
        .filter((country) => country.region.toLowerCase() === region.toLowerCase())
        .map((country) => ({
            name: country.name.common,
            flag: country.flags.svg,
            region: country.region,
        }));
      console.log(countries)
      res.status(200).json(countries)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to fetch countries.' })
    }
};


export const getAllRegion = async (req, res) => {
    try {
        const response = await axios.get(REST_COUNTRIES_API);
        const regions = response.data
        .map((data) => data.region) 
        .filter((region) => region) 
        .reduce((acc, region) => {
          if (!acc.includes(region)) {
            acc.push(region);
          }
          return acc;
        }, []);
      res.status(200).json(regions)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to fetch countries.' })
    }
};

export const getCountryDetail = async (req, res) => {
  const countryName = req.params.countryName;

  try {
    const response = await axios.get(`${REST_COUNTRIES_API}/${countryName}`);
    const countryData = response.data[0];
    const countryDetails = {
      name: countryData.name.common,
      population: countryData.population,
      currency: countryData.currencies ? Object.values(countryData.currencies).map(c => c.name).join(', ') : 'Unknown',
      languages: countryData.languages ? Object.values(countryData.languages).join(', ') : 'Unknown',
      timezone: countryData.timezones ? countryData.timezones.join(', ') : 'Unknown',
      capital: countryData.capital ? countryData.capital[0] : 'Unknown',
      flag: countryData.flags ? countryData.flags[0] : 'Unknown'
    };

    res.status(200).json(countryDetails); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch country details' });
  }
};