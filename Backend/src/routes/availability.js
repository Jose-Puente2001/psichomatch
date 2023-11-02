const { Router } = require("express");
const router = Router();
const {
  getAvailabilityByTherapistId,
  getAvailabilityByTherapistIdAndDate,
  insertAvailability,
  get4AvailabilityByTherapistIdAndDate,
  getAvailabilityHourByTherapistIDByDateBy,
  deleteAvailability

} = require("../controllers/availability")
router.post("/hour", getAvailabilityHourByTherapistIDByDateBy)
router.post("/dates/:id", get4AvailabilityByTherapistIdAndDate);
router.post("/:id", getAvailabilityByTherapistIdAndDate);
router.post("/create/disp", insertAvailability)
router.get("/:id", getAvailabilityByTherapistId)
router.delete("/", deleteAvailability)


module.exports = router;