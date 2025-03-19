
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

const Wishlist = () => {

  const { wishlist, removeFromWishlist, fetchWishlist } = useContext(ShopContext);
  console.log("Wishlist state:", wishlist);

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
          // {wishlist.length > 0 && wishlist.map((item) => (
          //    item?.productId?._id ? (  // ✅ More robust check

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
        ))
      }
      </div>
    </div>
  );
};

export default Wishlist;

