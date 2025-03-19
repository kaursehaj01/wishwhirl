const mongoose = require("mongoose")

require('dotenv').config();

const  mongo_uri = process.env.MONGO_URI
const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(mongo_uri);
        console.log("database connected");
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connectDB;