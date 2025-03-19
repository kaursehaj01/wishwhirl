import React, { createContext, useEffect, useState } from 'react'


export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [all_product,setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [categories, setCategories] = useState([]);
    
     // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/allproducts');
      const data = await response.json();
      setAll_Product(data);
      console.log("data fetch all product", data)
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
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };
  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);

 
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

 // Load cart data from localStorage on page load
 useEffect(() => {
  const storedCart = localStorage.getItem('cartItems');
  if (storedCart) {
    setCartItems(JSON.parse(storedCart));
  }
}, []);

  // Add product to cart
// const addToCart = async (productId) => {
//   try {
//     const token = localStorage.getItem('auth_token');
//     const response = await fetch('http://localhost:8090/api/addtocart', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ productId, quantity: 1 }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       const updatedCart = {};
//       data.cart.items.forEach((item) => {
//         updatedCart[item.productId._id] = item.quantity;
//       });

//       // Save updated cart data to localStorage
//       localStorage.setItem('cartItems', JSON.stringify(updatedCart));
//       setCartItems(updatedCart);
//       console.log('updatedCart', updatedCart);
//     } else {
//       console.error('Failed to add to cart:', data.message);
//     }
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//   }
// };
const addToCart = async (productId, quantity) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    try {
      const response = await fetch('http://localhost:8090/api/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        console.error('Error adding to cart');
      }

      const cartData = await response.json();
      setCartItems(cartData.items); // Update cart state with new cart data
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  } else {
    alert('Please log in first');
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

    const data = await response.json();
    if (response.ok) {
      const updatedCart = {};
      data.cart.items.forEach((item) => {
        updatedCart[item.productId._id] = item.quantity;
      });

      // Save updated cart data to localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } else {
      console.error('Failed to remove from cart:', data.message);
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};


  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, productId) => {
      const product = all_product.find((p) => p._id === productId);
      const quantity = cartItems[productId];
      return total + (product?.price || 0) * quantity;
    }, 0);
  };
// Updated function for calculating total cart items

  

   
  const getTotalCartItem = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };
  

  const getTotalWishlistItems = () => {
    return wishlist.length;
  };

    const contextValue = {getTotalCartItem, getTotalCartAmount, all_product, categories,cartItems, addToCart,removeFromCart,addToWishlist,setWishlist,getTotalWishlistItems,removeFromWishlist };
       
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;