const jwt = require("jsonwebtoken")

const tokenSign = async (patientExist) => {
    return jwt.sign(
        {
            id: patientExist.id,
            role: patientExist.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
}

const verifyToken = async (token) => {
        try{
            return jwt.verify(token, process.env.JWT_SECRET)
        }catch (error){
            return null
        }
}

const decodeSing = (token) => {

}

module.exports = {
    tokenSign,
    verifyToken,
    decodeSing
}