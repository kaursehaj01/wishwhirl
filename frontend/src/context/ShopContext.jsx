import React, { createContext, useEffect, useState } from 'react'


export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [all_product,setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const [categories, setCategories] = useState([]);
  
     // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await fetch('https://wishwhirl.onrender.com/api/allproducts');
      const data = await response.json();
      setAll_Product(data);
      console.log("data fetch all product shopocntext1", data)
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
   // Fetch categories
   const fetchCategories = async () => {
    try {
      const response = await fetch('https://wishwhirl.onrender.com/api/allcategory');
      const data = await response.json();
      setCategories(data);
      console.log("data fetch all categories shopocntext2", data)

    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };


  const loadCartFromStorage = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
  
    try {
      const response = await fetch('https://wishwhirl.onrender.com/api/getcart', {
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
          const response = await fetch('https://wishwhirl.onrender.com/api/getwish', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
          });

          if (!response.ok) throw new Error('Failed to fetch wishlist');
          const data = await response.json();
          
          console.log("data getlist",data);
          console.log("Fetched wishlist:", data.items);  // Debugging log

          // setWishlist(data.items || []); // Set wishlist items in state
          setWishlist([...data.items] || []);


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
      const response = await fetch('https://wishwhirl.onrender.com/api/addtowish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (response.ok) {
        // setWishlist(data.wishlist.items || []);
        setWishlist([...data.wishlist.items] || []);
        fetchWishlist(); 
        
        console.log("data is wishlist",wishlist);
        console.log("data.wishlist.items is wishlist",data.wishlist.items);
       

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
      const response = await fetch('https://wishwhirl.onrender.com/api/removefromwish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (response.ok) {
        // setWishlist(data.wishlist.items || []);
        setWishlist([...data.wishlist.items] || []);
        fetchWishlist(); 
      } else {
        console.error('Failed to remove from wishlist:', data.message);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };



const addToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem('auth_token');
  console.log("get token addtocart at shopocntext3", token);

  if (!token) return alert('Please log in first');

  try {
    const response = await fetch('https://wishwhirl.onrender.com/api/addtocart', {
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
    const response = await fetch('https://wishwhirl.onrender.com/api/removefromcart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) throw new Error('Failed to remove from cart');
    // const cartData = await response.json();

    // Update local state
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
// Updated function for calculating total cart items
const getTotalCartItem = () => {
  return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
};

  

  const getTotalWishlistItems = () => {
    console.log("wishlist.length",wishlist.length);

    return wishlist.length;
  };

  
    const contextValue = {getTotalCartItem, getTotalCartAmount,wishlist, all_product,setCartItems, categories,cartItems, addToCart,removeFromCart,addToWishlist,setWishlist,getTotalWishlistItems,removeFromWishlist,fetchWishlist };
       
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;


