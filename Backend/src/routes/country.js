const { Router } = require("express");
const router = Router();
const {
  getCountries
} = require("../controllers/country")

router.get("/", getCountries);


module.exports = router;