
import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import remove_icon from '../../assets/cart_cross_icon.png';
import emptyCart from '../../assets/images/emptyCart.png';

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CartItem = () => {
  const { getTotalCartAmount, all_product, cartItems, setCartItems, addToCart, removeFromCart } = useContext(ShopContext);
  const isCartEmpty = !Object.keys(cartItems).length;

// const isCartEmpty = Object.values(cartItems).every((item) => item === 0);
// const isCartEmpty = !Object.keys(cartItems).length || Object.values(cartItems).every(item => item === 0);
console.log('cartItems came from cartitem.jsx:', cartItems); // Add this before calling reduce

  return (
<>
<div className="max-w-container 2xl:max-w-[85rem] mx-auto px-2 md:px-10 mt-5">
      
        {!isCartEmpty ? (
         <div className="pb-20">
           <div className="w-full h-20 bg-[#b3b6b6] text-slate-600 hidden lg:grid grid-cols-6 place-content-center px-6 text-lg font-titleFont font-semibold">
             <h2 >Product</h2>
             <h2 className="col-span-2">Title</h2>
             <h2>Price</h2>
             <h2>Quantity</h2>
             <h2>Sub Total</h2>
           </div>
           <div className="mt-2">
           {all_product.map((product) => {
              if (!cartItems[product._id] )return null;
           return (
            <div key={product._id}>
             <div className="w-full grid grid-cols-6 mb-4 border py-2" >
             <div className="flex col-span-6 md:col-span-2 items-center lg:col-span-3 gap-4 ml-4 2xl:col-span-3">
                 <img
                   className="cartitems-remove-icon w-2 h-2 sm:w-5 sm:h-5 md:w-5 md:h-5 cursor-pointer"
                   src={remove_icon}
                   onClick={() => removeFromCart(product._id)}
                   alt="Remove"
                  />
                 <img className="w-32 h-32" src={product.images[0]} alt={product.name} />
                 <h1 className="font-titleFont font-semibold text-balance">{product.name}</h1>
               </div>
               <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 md:px-0 gap-6 md:gap-2">
                  <div className="flex w-1/3 items-center justify-center lg:justify-normal text-lg font-semibold md:col-span-2">
                     ${product.price}
                   </div>
                    <div className="w-1/3 flex items-center gap-6 text-lg">
                        <span
           
                           onClick={() => removeFromCart(product._id)}
                            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                                 >
                                      -
                         </span>
                            <p>{cartItems[product._id]}</p>
                           <span
                            onClick={() => addToCart(product._id)}
                            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                                 >
                                    +
                                 </span>
                     </div>
                     <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
                        <p>${product.price * cartItems[product._id]}</p>
                       </div>
                  </div>
                </div>
              </div>       

             ); 
             })}

           </div>
           <div className="flex flex-col md:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
             <div className="flex items-center gap-4">
               <input
                 className="w-44x h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                 type="text"
                 placeholder="Coupon Number"
               />
               <p className="text-sm mdl:text-base font-semibold">
                 Apply Coupon
               </p>
             </div>
             <p className="text-lg font-semibold">Update Cart</p>
           </div>
           <div className="max-w-7xl gap-4 flex justify-end mt-4">
             <div className="w-96 flex flex-col gap-4">
               <h1 className="text-2xl font-semibold text-right">Cart total</h1>
               <div>
                 <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                   Subtotal
                   <span className="font-semibold tracking-wide font-titleFont">
                   ${getTotalCartAmount()}
                   </span>
                 </p>
                 <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                   Shipping Charge
                   <span className="font-semibold tracking-wide font-titleFont">
                     {/* ${shippingCharge} */}
                     free
                   </span>
                 </p>
                 <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                   Total
                   <span className="font-bold tracking-wide text-lg font-titleFont">
                   ${getTotalCartAmount()}
                   </span>
                 </p>
               </div>
               <div className="flex justify-end">
                 <Link to="/checkout">
                   <button className="w-52 h-10 bg-slate-900 text-white hover:bg-black duration-300">
                     Proceed to Checkout
                   </button>
                 </Link>
               </div>
             </div>
           </div>
         </div>
        ) : ( 
          <motion.div
           initial={{ y: 30, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.4 }}
           className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
         >
           <div>
             <img
               className="w-80 rounded-lg p-4 mx-auto"
               src={emptyCart}
               alt="emptyCart"
             />
           </div>
           <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
             <h1 className="font-titleFont text-xl font-bold uppercase">
               Your Cart feels lonely.
             </h1>
             <p className="text-sm text-center px-10 -mt-2">
               Your Shopping cart lives to serve. Give it purpose - fill it with
               books, electronics, videos, etc. and make it happy.
             </p>
             <Link to="/">
               <button className="bg-slate-800 rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                 Continue Shopping
               </button>
             </Link>
           </div>
         </motion.div> 
        )} 
     </div>
     </>
   );
 };


 export default CartItem;

