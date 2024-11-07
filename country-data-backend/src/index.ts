import express from "express";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes";
import errorHandler from "./middleware/errorHandler";
import AppError from "./utils/appError";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use("/countries", countryRoutes);

app.all("*", (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  ) as any;
  next(err);
});

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
