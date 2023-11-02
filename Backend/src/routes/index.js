const { Router } = require("express");

const userRoutes = require("./user");
const contactRoutes = require("./contact")
const authRoutes = require("./auth");
const patientRoutes = require("./patient");
const therapistRoutes = require("./therapist");
const passport = require("passport");
const router = Router();
const ratingRoutes = require("./rating")
const categoryRoutes = require("./category")
const countryRoutes = require("./country")
const hourRoutes = require("./hour")
const availabilityRoutes = require("./availability")
const reservationRoutes = require("./reservation")

const decode  = require('./decoding')


router.use("/", userRoutes);
router.use("/",contactRoutes);
// Auth0 goggle (Patient)
router.use("/auth",passport.authenticate("auth-google",{
    scope:[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
    session: false,
}), authRoutes);

//Patients
router.use("/", patientRoutes);

//Therapyst
router.use("/therapist", therapistRoutes);
router.use("/rating", ratingRoutes)
router.use("/category", categoryRoutes)

router.use("/hour", hourRoutes)
router.use("/availability", availabilityRoutes)
router.use("/reservation", reservationRoutes)
router.use("/country", countryRoutes)
module.exports = router;


//Decoding
router.use('/decoding', decode)

module.exports = router;