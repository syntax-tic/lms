const mongoose = require("mongoose");
const uri = process.env.MONGO_URI
const connectDb = async ()=>{
    try{
        await mongoose.connect(uri);
        console.log("Connection to database successful\n");
    }catch(err){
        console.error("Database connection failed: ", err);
        process.exit(0);
    }
}


module.exports = connectDb;