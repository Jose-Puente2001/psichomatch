const { verifyToken } = require ("../helpers/generateToken")

const checkAuth = async (req, res, next) => {
    try {
        //Capturo solo el token
        const token = req.headers.authorization.split(' ').pop()
        
        const tokenData = await verifyToken(token)
        if(tokenData.id){
            next() // continua el flujo
        }else {
            res.status(409)
            res.send({error: "Forbbiden Entry1"})
        }
    } catch (error) {
        console.log(error)
        res.status(409)
        res.send({error:"Forbbiden Entry2"})
    }
}

module.exports = checkAuth
//Check