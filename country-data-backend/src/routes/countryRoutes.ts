import express from "express";
import {
  getCountries,
  getCountryByCode,
  searchCountries,
} from "../controllers/countryController";

const router = express.Router();

router.get("/", getCountries);
router.get("/search", searchCountries);
router.get("/:code", getCountryByCode);

export default router;
