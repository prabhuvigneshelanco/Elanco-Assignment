import { Box, Typography, Card, CardMedia, CardContent, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function CountryDetail() {
  const location = useLocation();
  const { countryDetails } = location.state || {}; 
  console.log(countryDetails)
  if (!countryDetails) {
    return <Typography align="center" color="error" mt={4}>No country details available.</Typography>;
  }
  return (
    <Box p={4}>
      <Card style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
        <CardMedia
          component="img"
          height="150px"
          image={countryDetails.flag}
          alt={`${countryDetails.name} flag`} 
          style={{ objectFit: 'cover', borderRadius: '4px' }}
        />
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {countryDetails.name}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />

          <Typography variant="body1" color="textPrimary" gutterBottom>
            <strong>Region:</strong> {countryDetails.region || 'Unknown'}
          </Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            <strong>Population:</strong> {countryDetails.population?.toLocaleString() || 'Unknown'}
          </Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            <strong>Capital:</strong> {countryDetails.capital || 'Unknown'}
          </Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            <strong>Language(s):</strong> {
            countryDetails.language
                ? Object.values(countryDetails.language).join(', ') || 'Unknown'
                : 'Unknown'
            }
          </Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            <strong>Currency:</strong> {
            countryDetails.currencies
                ? Object.entries(countryDetails.currencies).map(([currencyCode, currency]) => {
                    return `${currency.name} (${currency.symbol || 'Unknown'})`;
                }).join(', ') || 'Unknown'
                : 'N/A'
            }
          </Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            <strong>Timezone:</strong> {countryDetails.timezones|| 'Unknown'} 
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
