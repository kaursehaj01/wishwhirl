
const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');
const path = require("path");


// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const { default: mongoose } = require("mongoose");
// const { type } = require("os");
// const { error } = require("console");

// 
app.use(express.json());
app.use(cors());
// 
connectDB(); 

// 98XXSIpgSZTXAnu3 --> password
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


// app.get("/",(req, res) =>{
//     res.send("express app is running")
// })

// image storage engine
// const Storage = multer.diskStorage({
//     destination: './upload/images/',
//     filename:(req,file,cb)=>{
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({storage: Storage});

// creating upload endpoint for images
// app.use('/images',express.static('upload/images/'));

// app.post("/upload", upload.single('product'),(req,res)=>{
//     res.json({
//         success:1,
//         image_url:`http://localhost:${port}/images/${req.file.filename}`
//     })
// })

// schema for creating products
// const Product = mongoose.model("Product",{
//     id:{
//         type: Number,
//         required: true,
//     },
//     name:{
//         type: String,
//         required:true,
//     },
//     image:{
//         type: String,
//         required: true,
//     },
//     category:{
//         type: String,
//         required:true,
//     },
//     new_price:{
//         type: Number,
//         required: true,
//     },
//     old_price:{
//         type: Number,
//         required: true,
//     },
//     date:{
//         type: Date,
//         default:Date.now,
//     },
//     available:{
//         type:Boolean,
//         default:true,
//     }
// })
// // endpoint for the addproduct
// app.post('/addproduct',async (req,res)=>{
//     let products = await Product.find({});
//     let id;
//     if(products.length>0){
//         let last_product_array = products.slice(-1);
//         let last_product = last_product_array[0];
//         id = last_product.id+1;
//     }
//     else{
//         id=1;
//     }
//     const product = new Product({
//         id:id,
//         name:req.body.name,
//         image:req.body.image,
//         category:req.body.category,
//         new_price:req.body.new_price,
//         old_price:req.body.old_price,
//     });
//     // console.log(product);
//     await product.save();
//     console.log("save");
//     res.json({
//         success:true,
//         name:req.body.name,
//     })

// })

// // endpoint remove product
// app.post('/removeproduct',async (req,res)=>{
//     await Product.findOneAndDelete({id:req.body.id});
//     console.log("removed");
//     res.json({
//         success:true,
//         name: req.body.name
//     })
// })
// // getting all product
// app.get('/allproducts', async(req, res)=>{
//     let products = await Product.find({});
//     res.send(products);
// })
// // userSchema 
// const Users = mongoose.model('Users',{
//     name:{
//         type: String,
//     },
//     email:{
//         type: String,
//         unique:true,
//     },
//     password:{
//         type:String,
//     },
//     cartData: {
//         type: Object,
//         default: () => {
//             let cart = {};
//             for (let i = 0; i < 300; i++) {
//                 cart[i] = 0;
//             }
//             return cart;
//         },
//     },
//     wishlist:{
//         type: [String],

//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     }
// })


// app.post('/signup', async (req, res) => {
//     try {
//         // Check if the user already exists
//         let check = await Users.findOne({ email: req.body.email });
//         if (check) {
//             return res.status(400).json({ success: false, errors: "User with this email already exists" });
//         }

//         // Create a new user
//         const user = new Users({
//             name: req.body.username,
//             email: req.body.email,
//             password: req.body.password, // Consider hashing the password here for security
//         });

//         // Save the user to the database
//         await user.save();

//         // Generate a JWT token
//         const data = {
//             user: {
//                 id: user.id,
//             },
//         };
//         const token = jwt.sign(data, 'secret_ecom');
//         res.json({ success: true, token });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, errors: "Internal Server Error" });
//     }
// });



// // end point foe login
// app.post('/login', async(req,res)=>{
//     let user = await Users.findOne({email:req.body.email});
//     if(user){
//         const passCompare = req.body.password === user.password;
//         if(passCompare){
//             const data ={
//                 user:{
//                     id:user.id
//                 }
//             }
//             const token = jwt.sign(data,'secret_ecom');
//             res.json({success:true,token})

//         } else{
//             res.json({success:false,errors:"wrong password"});

//         }

//     } else{
//         res.json({success:false,errors:"wrong email"});

//     }

// })

// // creating endpoint for new collection data
// app.get('/newcollections',async (req,res)=>{
//     let products = await Product.find({});
//     let newcollection = products.slice(1).slice(-8);
//     res.send(newcollection);
// })

// // creating endpoint for popular in women 
// app.get('/popularinwomen',async (req,res)=>{
//     let products = await Product.find({category:"women"});
//     let popular_in_women = products.slice(0,4);
//     res.send(popular_in_women);
// })
// creating middleware to fetch the user
// const fetchUser = async(req,res,next)=>{
//     const token = req.header('auth_token');
//     console.log("tokendsfsdfrf:",token);
//     if(!token){
//         res.status(401).send({errors:"please authenticate using validate token"});
//     }else{
//         try {
//             const data = jwt.verify(token, 'secret_ecom');
//             req.user = data.user;
//             next();
//         } catch (error) {
//             if (error.name === 'TokenExpiredError') {
//                 return res.status(401).send({ errors: "Token has expired. Please log in again." });
//             } else {
//                 return res.status(401).send({ errors: "Invalid token. Please authenticate." });
//             }
//         }
//     }
// }

// const validateToken = (req) => {
//     const token = req.header('auth_token');
//     // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2ZDVkM2MwNjllOWQ5NTdiMmJlOWI3In0sImlhdCI6MTczNTIyNzMwMH0.0zWavdT2brXwxAnm3bFV3aSuv3VB_JHbo8r2s4WUoeg";
//     const secretKey = 'secret_ecom'; // Replace with your actual secret key
//     try {
//         const decoded = jwt.verify(token, secretKey);
//         console.log("Token is valid:", decoded);
//         return { valid: true, decoded };
//     } catch (error) {
//         console.error("Token validation failed:", error.message);
//         return { valid: false, error: error.message };
//     }
// };
// creating endpoint for adding product in cartdata
// app.post('/addtocart',validateToken,async(req,res)=>{
//     console.log(req.body,req.user);
//     let userData = await Users.findOne({_id:req.user.id});
// userData.cartData[req.body.itemId]+=1;
// await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
// res.send("added");

// })

// const fetchUser = async(req,res,next)=>{
//     const token =req.header('auth_token');
//     if(!token){
//         res.status(401).send({errors:"authenticate with correct token"})
//     }
//     else{
//         try {
//             const data =jwt.verify(token,'secret_ecom');
//             req.user =data.user;
//             next();
            
//         } catch (error) {
//         res.status(401).send({errors:"authenticate with correct token"})
            
//         }
//     }
// }
// // wishlist
// // app.post('/wishlist',async(req,res)=>{
    
// // })
// app.post('/wishlist', async (req, res) => {
//     try {
//         const user = await Users.findById(req.user.id);

//         if (!user) {
//             return res.status(404).json({ success: false, msg: "User not found" });
//         }

//         // Initialize wishlist if it doesn't exist
//         if (!user.wishlist) {
//             user.wishlist = [];
//         }

//         // Add the item to the wishlist
//         const { itemId } = req.body;
//         if (!user.wishlist.includes(itemId)) {
//             user.wishlist.push(itemId);
//             await user.save();

//             return res.status(200).json({
//                 success: true,
//                 msg: "Item added to wishlist successfully",
//                 wishlist: user.wishlist,
//             });
//         }

//         res.status(400).json({ success: false, msg: "Item already in wishlist" });
//     } catch (error) {
//         console.error("Error while adding to wishlist:", error);
//         res.status(500).json({ success: false, msg: "Internal Server Error" });
//     }
// });



// app.post('/addtocart',fetchUser,async(req,res)=>{
//         console.log(req.body,req.user);
// let userData = await Users.findOne({_id:req.user.id});
// userData.cartData[req.body.itemId]+=1;
// await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
// res.send("added");
//     })
// // creating to remove product  from cartdata
//     app.post('/removefromcart',fetchUser,async(req,res)=>{
//         console.log("remove",req.body.itemId);
// let userData = await Users.findOne({_id:req.user.id});
// if(userData.cartData[req.body.itemId]>0)
// userData.cartData[req.body.itemId]-=1;
// await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
// res.send("remove");
//     })

// // creating to get data again while login

// app.post('/getcart',fetchUser,async(req,res)=>{
//     // console.log("getcart");
// let userData = await Users.findOne({_id:req.user.id});
// res.json(userData.cartData);

// })

// // server connection
// app.listen(port,(error) =>{
//     if(!error){
//         console.log("server running on port" +port)
//     }
//     else{
//         console.log("Error" +error)
//     }
// })