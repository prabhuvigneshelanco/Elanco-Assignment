import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  TextField,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
} from '@mui/material';

export default function Country() {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountriesAndRegions = async () => {
      try {
        setLoading(true);
        const [regionsResponse, countriesResponse] = await Promise.all([
          axios.get('http://localhost:3000/countries/regions'),
          axios.get('http://localhost:3000/countries'),
        ]);
        setRegions(regionsResponse.data);
        setCountries(countriesResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };
    fetchCountriesAndRegions();
  }, []);

  useEffect(() => {
    const fetchCountriesByRegion = async () => {
      if (!selectedRegion) {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:3000/countries');
          setCountries(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to load all countries');
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:3000/countries/region?region=${selectedRegion}`
          );
          setCountries(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to load countries for the selected region');
          setLoading(false);
        }
      }
    };

    fetchCountriesByRegion();
    setCurrentPage(1); 
  }, [selectedRegion]);

  useEffect(() => {
    setCurrentPage(1); 
  }, [searchTerm]);

  if (loading) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const handleCardClick = async (country) => {
    setError('');
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/countries/details?name=${country.name}`
      );
      console.log(response)
      navigate(`/country/${country.name}`, { state: { countryDetails: response.data } });
    } catch {
      setError('Failed to load country details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          select
          label="Region"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          variant="outlined"
          style={{ minWidth: '200px' }}
        >
          <MenuItem value="">All Regions</MenuItem>
          {regions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Search for a Country"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ minWidth: '100px' }}
        />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        gap={2}
        justifyContent="center"
        alignItems="center"
        mx="auto"
      >
        {currentCountries.length > 0 ? (
          currentCountries.map((country) => (
            <Card
              key={country.name}
              onClick={() => handleCardClick(country)}
              style={{
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <CardMedia
                component="img"
                height="80"
                image={country.flag}
                alt={`${country.name} flag`}
                style={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {country.name}
                </Typography>
                <Typography color="textSecondary" align="center">
                  {country.region}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography align="center">No countries found.</Typography>
        )}
      </Box>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
