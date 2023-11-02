const { Router } = require("express");
const router = Router();
const {gethours} = require("../controllers/hour")




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", gethours);

module.exports = router;