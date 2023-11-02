const { Router } = require("express");
const router = Router();
const {
  getCategories
} = require("../controllers/Category")

router.get("/", getCategories);


module.exports = router;