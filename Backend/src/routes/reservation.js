const { Router } = require("express");
const router = Router();
const {
   addReservation,
   getReservationByTherapistId,
   getReservationByPatientId,
   deleteReservation, 
   sendMail
} = require("../controllers/reservation")


router.post("/", addReservation)
router.get("/therapist/:id", getReservationByTherapistId)
router.get("/patient/:id", getReservationByPatientId)
router.delete("/:id", deleteReservation)

router.post("/sendMail", sendMail);

module.exports = router;