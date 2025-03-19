import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { ShopContext } from '../../context/ShopContext';



const SpecialCase = () => {
    const { getTotalCartItem, getTotalWishlistItems } = useContext(ShopContext);

    return (        
        <div className="fixed top-52 right-2 z-20 sm:flex flex-col gap-2">
            <Link to="/login">
                
                <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
                    <div className="flex justify-center items-center">
                        <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

                        <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
                    </div>
                {localStorage.getItem('auth_token') ? (
            <button onClick={() => { localStorage.removeItem('auth_token'); window.location.replace("/"); }} className="text-xs font-semibold font-titleFont">Logout</button>                   
                    ):(
              <button className="text-xs font-semibold font-titleFont">Login</button>
                )}

                </div>
            </Link>
            <Link to="/wishlist">
                <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
                    <div className="flex justify-center items-center">
                        <CiHeart className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

                        <CiHeart className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
                    </div>
                    <p className="text-xs font-semibold font-titleFont">Wishlist</p>

                    <p className="absolute top-1 right-2  bg-green-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                        {getTotalWishlistItems()}
                    </p>

                </div>
            </Link>
            <Link to="/cart">

                <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
                    <div className="flex justify-center items-center">
                        <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

                        <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
                    </div>
                    <p className="text-xs font-semibold font-titleFont">Buy Now</p>
                    <p className="absolute top-1 right-2  bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                        {getTotalCartItem()}
                    </p>

                </div>
            </Link>
        </div>
    )
}

export default SpecialCase