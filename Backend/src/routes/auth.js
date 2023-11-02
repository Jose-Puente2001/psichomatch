const { Router } = require("express");
const router = Router();
const {authGoogle} = require("../controllers/auth")




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/google", authGoogle);

module.exports = router;