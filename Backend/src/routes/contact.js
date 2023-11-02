const { Router } = require("express");
const router = Router();
const { getContacts, insertContact, deleteContact, updateContact, getContactById ,sortContactByName, searchContact } = require("../controllers/Contact")



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/contacts", getContacts);
router.get("/contact/search", searchContact)
router.get("/contact/sort", sortContactByName)
router.get("/contact/:id", getContactById)
router.post("/contact", insertContact)
router.put("/contact/:id", updateContact)
router.delete("/contact/:id", deleteContact)
module.exports = router;