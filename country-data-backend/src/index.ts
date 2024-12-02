import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import countryRoutes from "./routes/countryRoutes";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/countries", countryRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
