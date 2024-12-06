const mongoose = require("mongoose")

const connectToDb = () =>{
    mongoose.connect(process.env.DB_CONNECT).then(()=>{
        console.log("Connect to DB ")
    }).catch(err => console.log(err))
}

module.exports = connectToDb;