// const addToCart = async (productId, quantity) => {
//   const token = localStorage.getItem('auth_token');
//   if (token) {
//     try {
//       const response = await fetch('/api/cart/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ productId, quantity }),
//       });

//       if (!response.ok) {
//         console.error('Error adding to cart');
//       }

//       const cartData = await response.json();
//       setCartItems(cartData.items); // Update cart state with new cart data
//     } catch (error) {
//       console.error('Error adding to cart', error);
//     }
//   } else {
//     alert('Please log in first');
//   }
// };




// const Cart = require('../models/Cart');
// const Product = require('../models/Product');  // Assuming you have a Product model

// // Get Cart by User
// const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user.id }).populate('items.productId', 'name price image');
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Add Item to Cart
// const addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;

//   try {
//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Find the user's cart
//     let cart = await Cart.findOne({ user: req.user.id });

//     // If no cart exists, create a new one
//     if (!cart) {
//       cart = new Cart({
//         user: req.user.id,
//         items: [{ productId, quantity }],
//       });
//     } else {
//       // If the product already exists in the cart, update the quantity
//       const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         cart.items.push({ productId, quantity });
//       }
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Remove Item from Cart
// const removeFromCart = async (req, res) => {
//   const { productId } = req.body;

//   try {
//     let cart = await Cart.findOne({ user: req.user.id });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     // Remove item from the cart
//     cart.items = cart.items.filter(item => item.productId.toString() !== productId);
//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { getCart, addToCart, removeFromCart };











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Track admin status
  const navigate = useNavigate();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/signin' : '/api/signup';

    try {
      const response = await axios.post(`http://localhost:8070${endpoint}`, formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      localStorage.setItem('isAdmin', user.isAdmin); // Store admin status
      setIsAdmin(user.isAdmin); // Update admin state
      alert(isLogin ? 'Login successful!' : 'Signup successful!');
      navigate('/'); // Redirect to home or dashboard after success
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong!');
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    alert('Logged out successfully!');
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            className="text-blue-500 underline ml-2"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

        {/* Logout Button (Visible only for logged-in users) */}
        {localStorage.getItem('token') && (
          <div className="mt-6">
            <p className="text-center text-gray-700 mb-4">
              {isAdmin ? 'You are logged in as an Admin.' : 'You are logged in as a User.'}
            </p>
            <button
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// // Create the context
// const ShopContext = createContext();

// // Context provider component
// export const ShopProvider = ({ children }) => {
//   // States
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered product list
//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [user, setUser] = useState(null); // User state
//   const [loading, setLoading] = useState(false);
 
//   const { categoryId, subcategoryId } = useParams(); // Getting category and subcategory from URL params



//     // States for filters and sorting
//     const [filters, setFilters] = useState({
//       size: [],
//       brand: [],
//       color: [],
//       price: null, // { min: 0, max: 100 }
//     });
//     const [sortOption, setSortOption] = useState(null); // e.g., 'price-asc', 'price-desc'
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:8070/api/categories`);

//       setCategories(response.data);
//       console.log("shopcontext data",response.data)
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       // const response = await axios.get(`http://localhost:8070/api/getproducts`);
//       const response = await axios.get(
//         `http://localhost:8070/api/getproducts?category=${categoryId}&subcategory=${subcategoryId}`
//       );
//       setProducts(response.data);
//       setFilteredProducts(response.data); // Initialize filteredProducts
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const applyFilters =() =>{
//     let filtered = products;
//      // Filter by subcategory if selected
//      if (selectedSubcategory) {
//       filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
//     }

//     if(filters.size.length > 0){
//       filtered = filtered.filter(product => filters.size.includes(product.size));
//     }
//     if (filters.brand.length > 0) {
//       filtered = filtered.filter(product => filters.brand.includes(product.brand));
//     }
//     if (filters.color.length > 0) {
//       filtered = filtered.filter(product => filters.color.includes(product.color));
//     }
    
//     if (filters.price) {
//       filtered = filtered.filter(
//         product =>
//           product.price >= filters.price.min && product.price <= filters.price.max
//       );
//     }
//       // Apply sorting
//       if (sortOption) {
//         filtered = filtered.sort((a, b) => {
//           if (sortOption === 'price-asc') return a.price - b.price;
//           if (sortOption === 'price-desc') return b.price - a.price;
//           return 0;
//         });
//       }
//       setFilteredProducts(filtered);
//   };
//     // Handle filter change
//     const handleFilterChange = (type, value) => {
//       setFilters(prevFilters => ({
//         ...prevFilters,
//         [type]: value,
//       }));
//     };
//      // Handle sort change
//   const handleSortChange = option => {
//     setSortOption(option);
//   };

  
// // Fetch initial data (categories and products) on load
// useEffect(() => {
//   fetchCategories();
//   if (selectedCategory && selectedSubcategory) {
//     fetchProducts(selectedCategory, selectedSubcategory);
//   }

//   // Load user from localStorage
//   const storedUser = localStorage.getItem("user");
//   if (storedUser) {
//     setUser(JSON.parse(storedUser));
//   }
// }, [selectedCategory, selectedSubcategory]); // Fetch products when category or subcategory changes


//   // Apply filters whenever filters or sortOption change
//   useEffect(() => {
//     applyFilters();
//   }, [filters, sortOption, products]);

//   // Add to cart
//   const addToCart = async (productId, quantity = 1) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8070/api/addcart`,
//         { productId, quantity },
//         { headers: { Authorization: `Bearer ${user?.token}` } }
//       );
//       setCart(response.data.cart);
//     } catch (error) {
//       console.error("Failed to add to cart:", error);
//     }
//   };

//   // Remove from cart
//   const removeFromCart = async (productId) => {
//     try {
//       const response = await axios.delete(`http://localhost:8070/api/removecart/${productId}`, {
//         headers: { Authorization: `Bearer ${user?.token}` },
//       });
//       setCart(response.data.cart);
//     } catch (error) {
//       console.error("Failed to remove from cart:", error);
//     }
//   };

//   // Add to wishlist
//   const addToWishlist = async (productId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8070/api/addwishlist`,
//         { productId },
//         { headers: { Authorization: `Bearer ${user?.token}` } }
//       );
//       setWishlist(response.data.wishlist);
//     } catch (error) {
//       console.error("Failed to add to wishlist:", error);
//     }
//   };

//   // Remove from wishlist
//   const removeFromWishlist = async (productId) => {
//     try {
//       const response = await axios.delete(`http://localhost:8070/api/removewishlist/${productId}`, {
//         headers: { Authorization: `Bearer ${user?.token}` },
//       });
//       setWishlist(response.data.wishlist);
//     } catch (error) {
//       console.error("Failed to remove from wishlist:", error);
//     }
//   };



//   // Fetch initial data
//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();

//     // Load user from localStorage
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Provide context values
//   return (
//     <ShopContext.Provider
//       value={{
//         categories,
//         products,
//         filteredProducts,
//         cart,
//         wishlist,
//         user,
//         loading,
//         filters,
//         sortOption,
//         selectedCategory,
//         selectedSubcategory,
//         handleFilterChange,
//         handleSortChange,
//         fetchCategories,
//         fetchProducts,
//         addToCart,
//         removeFromCart,
//         addToWishlist,
//         applyFilters,
//         removeFromWishlist,
//         setSelectedCategory,
//         setSelectedSubcategory,
//         // login,
//         // logout,
//       }}
//     >
//       {children}
//     </ShopContext.Provider>
//   );
// };

// // Export the context
// export default ShopContext;

//   // Login user
// //   const login = async (email, password) => {
// //     try {
// //       const response = await axios.post(`${BASE_URL}/auth/login`, {
// //         email,
// //         password,
// //       });
// //       setUser(response.data.user);
// //       localStorage.setItem("user", JSON.stringify(response.data.user));
// //     } catch (error) {
// //       console.error("Failed to log in:", error);
// //     }
// //   };

// //   // Logout user
// //   const logout = () => {
// //     setUser(null);
// //     localStorage.removeItem("user");
// //   };