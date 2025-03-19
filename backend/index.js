
const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');
const path = require("path");


app.use(express.json());
app.use(cors());
// 
connectDB(); 


// data base connection with mongodb
// Serve images statically from the 'images' folder
app.use('/images', express.static(path.join(__dirname, 'upload/images/')));


const userRoute = require('./routes/userRoute.js');
const productRoute = require('./routes/productRoute.js');
const cartRoute = require('./routes/cartRoute.js');
const wishlistRoute = require('./routes/wishListRoute.js');
const categoryRoute = require('./routes/categoryRoute.js');
const orderRoute = require('./routes/orderRoute.js');
const reviewRoute = require('./routes/reviewRoute.js');

app.use('/api',userRoute);
app.use('/api',productRoute);
app.use('/api',cartRoute);
app.use('/api',wishlistRoute);
app.use('/api',categoryRoute);
app.use('/api',orderRoute);
app.use('/api',reviewRoute);

// // api creation
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server running on ${port}`);
})
