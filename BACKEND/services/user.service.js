const userModel = require("../models/user.model")


module.exports.createuser = async({
    firstName,lastName,email,password
}) =>{
    if(!firstName || !password || !email){
        throw new Error("All fields are required");
    }
    const user = userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    })
    return user
}