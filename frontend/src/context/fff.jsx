import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, fetchWishlist } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchWishlist();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>Your wishlist is empty!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          item.productId && (
            <div key={item.productId._id} className="bg-white shadow-md p-4 rounded-lg text-center">
              <img
                src={item.productId.images?.[0] || "/placeholder.jpg"}
                alt={item.productId.name || "Product Image"}
                className="w-40 h-40 object-cover mx-auto rounded-md"
              />
              <h2 className="mt-2 text-lg font-medium">{item.productId.name || "Unnamed Product"}</h2>
              <p className="text-gray-600">
                <span className="text-xl font-semibold">${item.productId.price}</span>
                {item.productId.old_price && (
                  <span className="ml-2 text-sm text-gray-400 line-through">${item.productId.old_price}</span>
                )}
              </p>
              <button
                onClick={() => removeFromWishlist(item.productId._id)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Wishlist;










import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';

const Wishlist = () => {
  const { wishlist = [], removeFromWishlist, getTotalWishlistItems, fetchWishlist } = useContext(ShopContext); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the wishlist data when the component is mounted
    fetchWishlist();
    setLoading(false);
  }, [fetchWishlist]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Wishlist</h1>
      
      {loading ? (
        <div className="text-center">
          <p className="text-gray-500">Loading your wishlist...</p>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">Your wishlist is empty!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.productId._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center text-center transition-transform transform hover:scale-105"
            >
              <img
                src={item.productId.images[0] || '/path/to/placeholder.jpg'}
                alt={item.productId.name}
                className="w-48 h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="font-semibold text-lg text-gray-800">{item.productId.name}</h2>
              <p className="text-gray-600 mt-2">
                <span className="font-bold text-xl">${item.productId.price}</span>
                {item.productId.old_price && (
                  <span className="ml-2 text-sm text-gray-400 line-through">${item.productId.old_price}</span>
                )}
              </p>
              <button
                onClick={() => removeFromWishlist(item.productId._id)}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;













import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, getTotalWishlistItems, fetchWishlist } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the wishlist data when the component is mounted
    fetchWishlist();
    setLoading(false);
  }, [fetchWishlist]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Wishlist</h1>
      
      {loading ? (
        <div className="text-center">
          <p className="text-gray-500">Loading your wishlist...</p>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">Your wishlist is empty!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.productId._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center text-center transition-transform transform hover:scale-105"
            >
              <img
                src={item.productId.images[0] || '/path/to/placeholder.jpg'}
                alt={item.productId.name}
                className="w-48 h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="font-semibold text-lg text-gray-800">{item.productId.name}</h2>
              <p className="text-gray-600 mt-2">
                <span className="font-bold text-xl">${item.productId.price}</span>
                {item.productId.old_price && (
                  <span className="ml-2 text-sm text-gray-400 line-through">${item.productId.old_price}</span>
                )}
              </p>
              <button
                onClick={() => removeFromWishlist(item.productId._id)}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;












import React, { createContext, useEffect, useState } from 'react'

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all products
    const fetchAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/allproducts');
            const data = await response.json();
            setAll_Product(data);
            console.log("data fetch all product shopcontext1", data)
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/allcategory');
            const data = await response.json();
            setCategories(data);
            console.log("data fetch all categories shopcontext2", data)
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const loadCartFromStorage = async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:8090/api/getcart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch cart');
            const cartData = await response.json();

            if (cartData.cart && cartData.cart.items) {
                const updatedCart = {};
                cartData.cart.items.forEach((item) => {
                    updatedCart[item.productId._id] = item.quantity;
                });

                setCartItems(updatedCart);
                localStorage.setItem(`cartItems_${token}`, JSON.stringify(updatedCart));
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    // Save cart to localStorage
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            localStorage.setItem(`cartItems_${token}`, JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Fetch wishlist from backend
    const fetchWishlist = async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:8090/api/getwish', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch wishlist');
            const data = await response.json();

            setWishlist(data.items || []); // Set wishlist items in state
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    useEffect(() => {
        fetchAllProducts();
        fetchCategories();
        loadCartFromStorage();
        fetchWishlist();  // Fetch wishlist on page load
    }, []);

    // Add product to wishlist
    const addToWishlist = async (productId) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('http://localhost:8090/api/addtowish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });

            const data = await response.json();
            if (response.ok) {
                setWishlist(data.wishlist.items || []);
            } else {
                console.error('Failed to add to wishlist:', data.message);
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    // Remove product from wishlist
    const removeFromWishlist = async (productId) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('http://localhost:8090/api/removefromwish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });

            const data = await response.json();
            if (response.ok) {
                setWishlist(data.wishlist.items || []);
            } else {
                console.error('Failed to remove from wishlist:', data.message);
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    // Add product to cart
    const addToCart = async (productId, quantity = 1) => {
        const token = localStorage.getItem('auth_token');
        if (!token) return alert('Please log in first');

        try {
            const response = await fetch('http://localhost:8090/api/addtocart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ items: [{ productId, quantity }] }),
            });

            if (!response.ok) throw new Error('Failed to add to cart');
            const cartData = await response.json();

            if (cartData.cart && cartData.cart.items) {
                const updatedCart = {};
                cartData.cart.items.forEach((item) => {
                    updatedCart[item.productId._id] = item.quantity;
                });

                // Update state and localStorage
                setCartItems(updatedCart);
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Remove product from cart
    const removeFromCart = async (productId) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('http://localhost:8090/api/removefromcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });

            if (!response.ok) throw new Error('Failed to remove from cart');
            const updatedCart = { ...cartItems };
            if (updatedCart[productId] > 1) {
                updatedCart[productId] -= 1;
            } else {
                delete updatedCart[productId];
            }
            setCartItems(updatedCart);

            // Save updated cart data to localStorage
            localStorage.setItem(`cartItems_${token}`, JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    // Get total cart price
    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, productId) => {
            const product = all_product.find((p) => p._id === productId);
            return total + (product?.price || 0) * cartItems[productId];
        }, 0);
    };

    const getTotalCartItem = () => {
        return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
    };

    const getTotalWishlistItems = () => {
        return wishlist.length;
    };

    const contextValue = {
        getTotalCartItem, 
        getTotalCartAmount, 
        all_product,
        setCartItems, 
        categories,
        cartItems, 
        addToCart,
        removeFromCart,
        addToWishlist,
        setWishlist,
        getTotalWishlistItems,
        removeFromWishlist,
        fetchWishlist // added for fetching wishlist
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;

// next 
// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";

// // Create the context
// const ShopContext = createContext();

// // Create the provider component
// export const ShopProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch wishlist data from backend
//   const getWishlist = async () => {
//     try {
//       const response = await axios.get('/api/wishlist/getwish');  // Backend API endpoint to get wishlist data
//       setWishlist(response.data.items);  // Update state with wishlist items
//     } catch (error) {
//       console.error("Failed to fetch wishlist", error);
//     }
//   };

//   // Add product to wishlist
//   const addToWishlist = async (productId) => {
//     try {
//       const response = await axios.post('/api/wishlist/addtowish', { productId });  // Backend API endpoint to add product
//       setWishlist(response.data.wishlist.items);  // Update state with the new wishlist
//     } catch (error) {
//       console.error("Failed to add to wishlist", error);
//     }
//   };

//   // Remove product from wishlist
//   const removeFromWishlist = async (productId) => {
//     try {
//       const response = await axios.post('/api/wishlist/removefromwish', { productId });  // Backend API endpoint to remove product
//       setWishlist(response.data.wishlist.items);  // Update state with the new wishlist
//     } catch (error) {
//       console.error("Failed to remove from wishlist", error);
//     }
//   };

//   useEffect(() => {
//     getWishlist();  // Fetch wishlist when the component is mounted
//   }, []);

//   return (
//     <ShopContext.Provider
//       value={{
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         loading,
//       }}
//     >
//       {children}
//     </ShopContext.Provider>
//   );
// };

// // Custom hook to use ShopContext
// export const useShopContext = () => useContext(ShopContext);


  
  
  





import React, { createContext, useEffect, useState } from 'react'


export const ShopContext = createContext(null);

const getDefaultCart =() =>{
    let cart ={}
    
    for (let index = 0; index < 300+1; index++) {

        cart[index] = 0;
        
    }
    return cart;
}
// contextprovider

const ShopContextProvider = (props) => {

    const [all_product,setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [wishlistData, setWishlistData] = useState([]);
    // const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
    // const [query, setQuery] = useState(""); s

    useEffect(()=>{
        fetch('http://localhost:8080/allproducts')
        .then((response)=> response.json())
        .then((data)=> {
            setAll_Product(data);
            // adding this
        // setFilteredProducts(data); // Initialize filteredProducts
        });
        if(localStorage.getItem('auth_token')){
            fetch('http://localhost:8080/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth_token':`${localStorage.getItem('auth_token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data))
        }

    },[])
    // search logic
    // useEffect(() => {
    //     if (query.trim() === "") {
    //       setFilteredProducts(all_product); // Show all products when query is empty
    //       console.log('all_product',+ all_product);
    //     } else {
    //       const filtered = all_product.filter(
    //         (product) =>
    //           product?.title?.toLowerCase().includes(query.toLowerCase()) ||
    //           product?.description?.toLowerCase().includes(query.toLowerCase())
             
    //       );
          
    //       setFilteredProducts(filtered);
    //     }
    //   }, [query, all_product]);
    const addToWishlist =(itemId) =>{
        
        setWishlistData((prev) =>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth_token')){
            fetch('http://localhost:8080/wishlist',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth_token':`${localStorage.getItem('auth_token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const addToCart = (itemId) =>{
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth_token')){
            fetch('http://localhost:8080/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth_token':`${localStorage.getItem('auth_token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    // console.log(cartItems)

    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth_token')){
            fetch('http://localhost:8080/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth_token':`${localStorage.getItem('auth_token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }

        // console.log(cartItems)
    }
    const getTotalCartAmount =() =>{
        let totalAmount = 0;
        for(const item in cartItems)
            {
                if(cartItems[item]>0)
                    {
                        let itemInfo = all_product.find((product) => product.id === Number(item))
                        totalAmount += itemInfo.new_price  * cartItems[item];
    // console.log(all_product+"get cart");

                    }
                    
            }
            return totalAmount;
    }

    const getTotalCartItem =() =>{
        let totalItem =0;
        for(const item in cartItems){
            if(cartItems[item]>0)
                {
                    totalItem +=cartItems[item];
                }
        }
        return totalItem;
    }
    

    const contextValue = {getTotalCartItem, getTotalCartAmount, all_product, cartItems, addToCart,removeFromCart,addToWishlist,wishlistData };
        // const contextValue = {getTotalCartItem, getTotalCartAmount, all_product, cartItems, addToCart,removeFromCart, filteredProducts,
        //     setQuery, query };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
  















// backend jwt , shopcontext, user only change in the shop context
// // this is is 30/1 thrusday 
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// // Generate token
// const generateToken = (payload) => {
//     return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
// };

// // Verify token middleware
// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ msg: "You are not authenticated" });
//     }

//     const token = authHeader.split(' ')[1]; // Extract the token

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach decoded user information to request
//         next();
//     } catch (error) {
//         return res.status(401).json({ msg: "Unauthorized user or invalid token" });
//     }
// };

// module.exports = { generateToken, verifyToken };

// // React Context for Shop
// import React, { createContext, useEffect, useState } from 'react';

// export const ShopContext = createContext(null);

// const ShopContextProvider = (props) => {
//     const [all_product, setAll_Product] = useState([]);
//     const [cartItems, setCartItems] = useState(() => {
//         return JSON.parse(localStorage.getItem('cartItems')) || {};
//     });
//     const [wishlist, setWishlist] = useState([]);
//     const [categories, setCategories] = useState([]);

//     // Fetch all products
//     const fetchAllProducts = async () => {
//         try {
//             const response = await fetch('http://localhost:8090/api/allproducts');
//             const data = await response.json();
//             setAll_Product(data);
//         } catch (error) {
//             console.error('Failed to fetch products:', error);
//         }
//     };

//     // Fetch categories
//     const fetchCategories = async () => {
//         try {
//             const response = await fetch('http://localhost:8090/api/allcategory');
//             const data = await response.json();
//             setCategories(data);
//         } catch (error) {
//             console.error('Failed to fetch categories:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAllProducts();
//         fetchCategories();
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }, [cartItems]);

//     const addToCart = async (productId, quantity = 1) => {
//         const token = localStorage.getItem('auth_token');
//         if (!token) return alert('Please log in first');

//         try {
//             const response = await fetch('http://localhost:8090/api/addtocart', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ productId, quantity }),
//             });

//             if (!response.ok) {
//                 throw new Error('Error adding to cart');
//             }

//             const cartData = await response.json();
//             setCartItems(cartData.items);
//         } catch (error) {
//             console.error('Error adding to cart', error);
//         }
//     };

//     const removeFromCart = async (productId) => {
//         try {
//             const token = localStorage.getItem('auth_token');
//             const response = await fetch('http://localhost:8090/api/removefromcart', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ productId }),
//             });

//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message);

//             const updatedCart = {};
//             data.cart.items.forEach((item) => {
//                 updatedCart[item.productId._id] = item.quantity;
//             });
//             localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//             setCartItems(updatedCart);
//         } catch (error) {
//             console.error('Error removing from cart:', error);
//         }
//     };

//     const getTotalCartAmount = () => {
//         return Object.keys(cartItems).reduce((total, productId) => {
//             const product = all_product.find((p) => p._id === productId);
//             const quantity = cartItems[productId];
//             return total + (product?.price || 0) * quantity;
//         }, 0);
//     };

//     const contextValue = {
//         all_product,
//         categories,
//         cartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//     };

//     return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
// };

// export default ShopContextProvider;

// // User Controller
// const Users = require('../models/userModel.js');
// const bcrypt = require('bcrypt');
// const { generateToken } = require('../middleware/jwtAuth.js');

// const userSignUp = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         let userExist = await Users.findOne({ email });
//         if (userExist) return res.status(400).json({ success: false, errors: "User with this email already exists" });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new Users({ name, email, password: hashedPassword });
//         await newUser.save();
//         const token = generateToken({ id: newUser._id });

//         res.status(201).json({ success: true, user: newUser, token });
//     } catch (err) {
//         res.status(500).json({ msg: 'Error creating user', error: err.message });
//     }
// };

// const userSignIn = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await Users.findOne({ email });
//         if (!user) return res.status(404).json({ msg: 'User not found' });

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(401).json({ msg: 'Invalid credentials' });

//         const token = generateToken({ id: user._id });
//         res.status(200).json({ success: true, msg: "Successfully logged in", user, token });
//     } catch (err) {
//         res.status(500).json({ msg: 'Error signing in', error: err.message });
//     }
// };

// const userLogout = async (req, res) => {
//     res.status(200).json({ msg: 'User logged out successfully', token: null });
// };

// module.exports = { userSignUp, userSignIn, userLogout };