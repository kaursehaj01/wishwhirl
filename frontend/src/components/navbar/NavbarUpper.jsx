import React, { useContext, useEffect, useState } from 'react'
import all_product from '../../assets/all_product.js';
import { ShopContext } from '../../context/ShopContext';
import { FaSearch } from "react-icons/fa";
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import cart_icon from '../../assets/cart_icon.png';
import { CiHeart } from "react-icons/ci";

const NavbarUpper = () => {
    const [searchQuery, setSeasrchQuery] = useState('');
    const { getTotalCartItem,getTotalWishlistItems,setCartItems } = useContext(ShopContext);
    const [filteredProducts, setFilteredProducts] = useState([]);


    const handleQuerySearch = (e) => {
        setSeasrchQuery(e.target.value);
    }
    useEffect(() => {
        const filtered = all_product.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery]);

    return (
        <div className="w-full h-[72px] bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
            <nav className="h-full px-4 max-w-container mx-auto relative">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="w-10 h-10" />
                        <p className="text-xl font-bold ml-2">WishWhirl</p>
                    </Link>

                    {/* input search qurery */}

                    <div className="relative w-[140px]  sm:w-[250px] md:w-[400px] lg:w-[600px] h-[35px] md:h-[50px] text-base text-primeColor bg-white shadow-sm flex items-center gap-2 sm:px-6 rounded-xl">
                        <input
                            className="flex-1 w-[140px] rounded  sm:w-auto h-full outline-none px-1 placeholder:text-[#C4C4C4] placeholder:text-[12px] sm:placeholder:text-[14px]"
                            type="text"
                            onChange={handleQuerySearch}
                            value={searchQuery}
                            placeholder="Search products"
                        />
                        <FaSearch className=" absolute right-4 w-3 h-3 md:w-5 md:h-5" />

                        {/* Search Results */}

                        {searchQuery && filteredProducts.length > 0 && (
                            <div className="w-full mx-auto h-96 bg-white top-16 absolute left-0 z-[100] overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
                                {searchQuery && filteredProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3 p-2"
                                    >
                                        {/* <Link to={`/product/${product.id}`}> */}
                                        <img
                                            onClick={() => window.scrollTo(0, 0)}
                                            src={product.image[0] || "../../assets/product_13.png"} // Default image fallback
                                            alt={product.name}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                        {/* </Link> */}
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold text-lg">{product.name}</p>
                                            {/* <p className="text-xs">{product.description}</p> */}
                                            <p className="text-sm">
                                                <span className="text-primeColor font-semibold">
                                                    ${product.price}
                                                </span>
                                                {product.old_price && (
                                                    <span className="line-through ml-2 text-gray-500">
                                                        ${product.old_price}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* No Results Message */}
                        {searchQuery && filteredProducts.length === 0 && (
                            <div className="w-full mx-auto bg-white top-16 absolute left-0 z-50 p-4 text-center shadow-2xl">
                                <p className="text-gray-500">No products found for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>

                    {/* Cart and Auth */}
                    <div className="hidden sm:flex items-center space-x-4">
                        {localStorage.getItem('auth_token') ? (
                            <button onClick={() => { localStorage.removeItem('auth_token'); setCartItems({}); window.location.replace("/"); }} className="text-base">Logout</button>
                        ) : (
                            <Link to='/login'>
                                <button className="text-base">Login</button>
                            </Link>
                        )}
                        <Link to='/wishlist'>
                            <CiHeart className="w-6 h-6" />
                            <div className="absolute top-5 right-12 bg-green-600 text-white rounded-full text-xs px-1 py-0">{getTotalWishlistItems()}</div>


                        </Link>

                        <Link to='/cart'>
                            <img src={cart_icon} alt="Cart" className="w-6 h-6" />
                            <div className="absolute top-5 right-2 bg-red-600 text-white rounded-full text-xs px-1 py-0">{getTotalCartItem()}</div>
                        </Link>
                    </div>



                </div>
            </nav>
        </div>
    )
}

export default NavbarUpper
