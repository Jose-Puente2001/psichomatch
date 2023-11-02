const { Router } = require("express");
const router = Router();
const {
    getRatingsByTherapistId,
    InsertRating,
    getRatingsByTherapistIdWithPagination
} = require("../controllers/rating")

router.get("/:id", getRatingsByTherapistId);
router.get("/page/:id", getRatingsByTherapistIdWithPagination);
router.post("/", InsertRating)

module.exports = router;