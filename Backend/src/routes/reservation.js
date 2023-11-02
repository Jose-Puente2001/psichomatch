const { Router } = require("express");
const router = Router();
const {
   addReservation,
   getReservationByTherapistId,
   getReservationByPatientId,
   deleteReservation
} = require("../controllers/reservation")


router.post("/", addReservation)
router.get("/therapist/:id", getReservationByTherapistId)
router.get("/patient/:id", getReservationByPatientId)
router.delete("/:id", deleteReservation)

module.exports = router;