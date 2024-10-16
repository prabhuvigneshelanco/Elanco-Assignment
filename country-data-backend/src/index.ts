import express from 'express';
import cors from 'cors';
import countryRoutes from './routes/countryRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/countries', countryRoutes);

// Handle unknown routes (This should be placed *after* all routes)
app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  (error as any).status = 404;
  next(error); // Pass to global error handler
});

// Global Error Handler (Place it at the very end)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
