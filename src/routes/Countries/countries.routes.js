const { Router } = require("express");
const getAllCountries = require("../../controllers/Countries/getAllCountries");
const getCountryById = require("../../controllers/Countries/getCountryById");
const getCountryByName = require("../../controllers/Countries/getCountryByName");

const router = Router();

router.get("/", getAllCountries);
router.get("/name", getCountryByName);
router.get("/:id", getCountryById);

module.exports = router;
