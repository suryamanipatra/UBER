const userModel = require("../models/user.model")
const captainModel = require("../models/captain.model")
const blacklistTokenModel = require("../models/blacklistToken.mmodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require('express-validator')

module.exports.authUser = async(req,res,next) =>{
    const token  = req.headers.authorization?.split(' ')[ 1 ] || req.cookies.token
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    const isBlackListed = await blacklistTokenModel.findOne({token:token})
    if(isBlackListed){
        return res.status(401).json({message: "Unauthorized"})
        }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        req.user = user
        return next();
        }
    catch(error){
        return res.status(401).json({message: "Unauthorized"})
    }    
}


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}