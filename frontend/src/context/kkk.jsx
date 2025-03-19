import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Add product to cart
  const addToCart = (productId) => {
    const existingProduct = cart.find((item) => item.productId === productId);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { productId, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    const existingProduct = cart.find((item) => item.productId === productId);
    if (existingProduct.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.productId !== productId));
    }
  };

  // Add product to wishlist
  const addToWishlist = async (productId) => {
    try {
      const response = await fetch('http://localhost:8090/api/addtowish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      const response = await fetch('http://localhost:8090/api/removefromwish', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  // Get total cart amount
  const getTotalCartAmount = () => {
    return cart.reduce((total, item) => {
      const product = allProducts.find((p) => p._id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  // Get total cart items
  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total wishlist items
  const getTotalWishlistItems = () => {
    return wishlist.length;
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        allProducts,
        cart,
        wishlist,
        categories,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        getTotalCartAmount,
        getTotalCartItems,
        getTotalWishlistItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// mdnsbfbfb
import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/api/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (response.ok) {
        setCart(data.cart || []);
      } else {
        console.error('Failed to add to cart:', data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    const existingProduct = cart.find((item) => item.productId === productId);
    if (existingProduct.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.productId !== productId));
    }
  };

  // Add product to wishlist
  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
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
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/api/removefromwish', {
        method: 'DELETE',
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

  // Get total cart amount
  const getTotalCartAmount = () => {
    return cart.reduce((total, item) => {
      const product = allProducts.find((p) => p._id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  // Get total cart items
  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total wishlist items
  const getTotalWishlistItems = () => {
    return wishlist.length;
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        allProducts,
        cart,
        wishlist,
        categories,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        getTotalCartAmount,
        getTotalCartItems,
        getTotalWishlistItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
localStorage.setItem('token', 'YOUR_JWT_TOKEN');
// storage
import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Load cart and wishlist from localStorage
  const loadCartAndWishlist = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    
    if (storedCart) {
      setCart(storedCart);
    }
    if (storedWishlist) {
      setWishlist(storedWishlist);
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/api/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (response.ok) {
        const updatedCart = data.cart || [];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save cart to localStorage
      } else {
        console.error('Failed to add to cart:', data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    const existingProduct = cart.find((item) => item.productId === productId);
    if (existingProduct.quantity > 1) {
      const updatedCart = cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
    } else {
      const updatedCart = cart.filter((item) => item.productId !== productId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
    }
  };

  // Add product to wishlist
  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
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
        const updatedWishlist = data.wishlist.items || [];
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Save wishlist to localStorage
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
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/api/removefromwish', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (response.ok) {
        const updatedWishlist = data.wishlist.items || [];
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Save updated wishlist to localStorage
      } else {
        console.error('Failed to remove from wishlist:', data.message);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    return cart.reduce((total, item) => {
      const product = allProducts.find((p) => p._id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  // Get total cart items
  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total wishlist items
  const getTotalWishlistItems = () => {
    return wishlist.length;
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
    loadCartAndWishlist(); // Load cart and wishlist from localStorage
  }, []);

  return (
    <ShopContext.Provider
      value={{
        allProducts,
        cart,
        wishlist,
        categories,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        getTotalCartAmount,
        getTotalCartItems,
        getTotalWishlistItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};


// example
// import React, { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';

// const ExampleComponent = () => {
//   const { allProducts, addToCart, getTotalCartItems } = useContext(ShopContext);

//   return (
//     <div>
//       <h1>Total Cart Items: {getTotalCartItems()}</h1>
//       <button onClick={() => addToCart('productId123')}>Add to Cart</button>
//     </div>
//   );
// };

// export default ExampleComponent;


import React, { useContext } from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';
import { GiReturnArrow } from 'react-icons/gi';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineLabelImportant } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

const Item = (props) => {
  const { product } = props;
  const { addToCart, addToWishlist } = useContext(ShopContext);

  return (
    <div className="item w-full relative group">
      {/* Product Image Section */}
      <div className="relative overflow-hidden sm:max-w-96 sm:max-h-96 md:max-w-80 md:max-h-80 2xl:max-w-full 2xl:max-h-full">
        <Link to={`/product/${props._id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            src={props.images}
            alt={props.name}
            className="w-full h-full item-img 2xl:w-full 2xl:h-full object-cover"
          />
        </Link>
        {/* Action Section */}
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700 divide-y divide-slate-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            {/* Compare Button */}
            <li className="text-[#767676] hover:text-[#262626] text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-[#262626] flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            {/* Add to Cart Button */}
            <li
              onClick={() => addToCart(props._id)}
              className="text-[#767676] hover:text-[#262626] text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-[#262626] flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            {/* View Details Link */}
            <Link
              to={`/product/${props._id}`}
              className="w-full h-full"
              onClick={() => window.scrollTo(0, 0)}
            >
              <li className="text-[#767676] hover:text-[#262626] text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-[#262626] flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                View Details
                <span className="text-lg">
                  <MdOutlineLabelImportant />
                </span>
              </li>
            </Link>
            {/* Add to Wishlist Button */}
            <li
              onClick={() => addToWishlist(props._id)}
              className="text-[#767676] hover:text-[#262626] text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-[#262626] flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* Product Info Section */}
      <div className="sm:max-w-96 md:max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4 2xl:max-w-full 2xl:max-h-full">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="font-bold text-slate-900 text-lg">{props.name}</h2>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-900 text-base">${props.price}</p>
          <p className="text-gray-400 text-base line-through">${props.old_price}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
