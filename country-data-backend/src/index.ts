import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import countryRoutes from './routes/countryRoutes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/countries', countryRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
