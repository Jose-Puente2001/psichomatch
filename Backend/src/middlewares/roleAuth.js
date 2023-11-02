const { verifyToken } = require('../helpers/generateToken')
const { Patient } = require("../db");

const checkRoleAuth = (roles) => async (req, res, next) => {
    try{
       
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        const patientData = await Patient.findByPk(tokenData.id);
        
        // Si la ruta contiene alguno elemento del array de la ruta permite el acceso
        if([].concat(roles).includes(patientData.role)){
            next()
        } else {
            res.status(409),
            res.send({error:"Forbbiden Entry3"})
        }
    }catch (error){
        res.status(409)
        res.send({error:"Forbbiden Entry4"})
    }
}


module.exports = checkRoleAuth