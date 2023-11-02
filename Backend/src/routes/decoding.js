const { Router } = require("express");
const router = Router();
const jwt_decode = require('jwt-decode');


router.put("/decode", (req,res) => {
    
    token = req.body.token
    console.log(token)

    const decodedToken = jwt_decode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    if (expirationTime < currentTime) {
    
    res.status(409).send(false);
    } else {
    
    res.status(200).send(true);
}
})

router.put("/decode", (req,res) => {
    
    token = req.body.token
    console.log(token)

    const decodedToken = jwt_decode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    if (expirationTime < currentTime) {
    
    res.status(409).send(false);
    } else {
    
    res.status(200).send(true);
}
})

module.exports = router