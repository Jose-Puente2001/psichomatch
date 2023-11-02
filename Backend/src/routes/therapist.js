const { Router } = require("express");
const router = Router();
const {
    createTherapist,
    addInfoTherapist,
    updateDescriptionTherapist,
    updateImgTherapist,
    updateTherapistPrice,
    updateTherapistPriceByPorcent,
    deleteTherapist,
    switchTherapistState,
    getTherapists,
    getTherapistById,
    searchByNameLastName,
    searchByPrice,
    searchByUbication,
    filterTherapistByCategoryId,
    searchByCountry,
    filterTherapists,
    logInTherapist,
    updateTherapist,
} = require("../controllers/therapist")
router.get("/filter/category/country", filterTherapists)
router.get("/", getTherapists);
router.get("/getTherapistByID/:id", getTherapistById)
router.get("/category/:id", filterTherapistByCategoryId)
router.post("/create", createTherapist)
router.put("/update/all", updateTherapist)
router.put("/addInfo/:id", addInfoTherapist)
router.put("/changeDescription/:id", updateDescriptionTherapist)
router.put("/updateImg/:id", updateImgTherapist)
router.put("/updatePrice/:id", updateTherapistPrice)
router.put("/updatePricePercent/:id", updateTherapistPriceByPorcent)
router.delete("/delete/:id", deleteTherapist)   
router.put("/switchTherapist/:id", switchTherapistState)
router.post("/login", logInTherapist)

/* Routes for searches */ 

router.get("/search", searchByNameLastName)
router.get("/searchPrice/:price", searchByPrice)
router.get("/searchUbication/:ubication", searchByUbication)
router.get("/searchCountry/:country", searchByCountry)

module.exports = router;