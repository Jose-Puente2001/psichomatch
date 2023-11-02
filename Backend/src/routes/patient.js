const { Router } = require("express");
const router = Router();
const { getpatients,insertPatient,logInPatient,loginPatientGoogle,recoverPass,recoverPass2,updatePatient,deletePatient, getPatientById, inserNewPatient } = require("../controllers/patient")
const checkAuth = require('../middlewares/authentification')
const  checkRoleAuth  = require('../middlewares/roleAuth')

// Configurar los routers
//Ejemplo: router.use('/auth', authRouter);


//Para utilizar esta ruta necesito 
//                      (Una session Valida |  Que El rol sea de Usuario)
router.get("/patients",     checkAuth,         checkRoleAuth(['patient']),  getpatients);
//

router.get("/patient/:id", getPatientById);
router.post("/registerPatient", insertPatient);
router.post("/patient", inserNewPatient)

//Login Generando Un token
router.post("/patient/login",logInPatient);
router.post("/patient/loginGoogle",loginPatientGoogle);


router.post("/recoverPass",recoverPass)
router.get("/recoverPass2/:id",recoverPass2)
router.put("/patient/:id", updatePatient);
router.delete("/patient/:id", deletePatient);

module.exports = router;