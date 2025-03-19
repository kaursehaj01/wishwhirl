import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const WishList = () => {
    const { all_product, addToWishlist, wishlistData } = useContext(ShopContext);

    const iswishlistEmpty = Object.values(wishlistData).every((item) => item === 0);

    return (
        <div className="pb-20">
            <div className="w-full h-20 bg-[#b3b6b6] text-slate-600 hidden lg:grid grid-cols-6 place-content-center px-6 text-lg font-titleFont font-semibold">
                <h2 >Product</h2>
                <h2 className="col-span-2">Title</h2>
                <h2>Price</h2>
                <h2>Quantity</h2>
                <h2>Sub Total</h2>
            </div>
            <div className="mt-2">
                {all_product.map((e) => {
                    if (wishlistData[e.id] > 0) {
                        return (
                            <div key={e.id}>
                                <div className="w-full grid grid-cols-6 mb-4 border py-2" >
                                    <div className="flex col-span-6 md:col-span-2 items-center lg:col-span-3 gap-4 ml-4 2xl:col-span-3">
                                        
                                        <img className="w-32 h-32" src={e.image} alt="productImage" />
                                        <h1 className="font-titleFont font-semibold text-balance">{e.name}</h1>
                                    </div>
                                    <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 md:px-0 gap-6 md:gap-2">
                                        <div className="flex w-1/3 items-center justify-center lg:justify-normal text-lg font-semibold md:col-span-2">
                                            ${e.new_price}
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>

                        );
                    }
                    return null;
                })}

            </div>
        </div>


    )
}

export default WishList




