import express from 'express'
import { getCountries,getAllRegion,filterCountriesByRegion,getCountryDetails} from '../controller/countryController.js'
const router = express.Router()

router.get('/', getCountries)
router.get('/regions', getAllRegion)
router.get('/region', filterCountriesByRegion)
router.get('/details', getCountryDetails)

export default router
