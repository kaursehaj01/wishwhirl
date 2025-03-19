import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, all_product, getTotalCartAmount } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMethod: 'credit_card',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Placed:', formData);
    // Add order processing logic here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Checkout Form */}
      <div className="border p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" required className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" required className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="text" name="address" placeholder="Shipping Address" required className="w-full p-2 border rounded" onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required className="w-full p-2 border rounded" onChange={handleChange} />
          <select name="paymentMethod" className="w-full p-2 border rounded" onChange={handleChange}>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>
          <button type="submit" className="w-full bg-slate-900 text-white py-2 rounded hover:bg-black">Place Order</button>
        </form>
      </div>
      
      {/* Cart Summary */}
      <div className="border p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
        <div className="space-y-4">
          {all_product.map((product) => {
            if (!cartItems[product._id]) return null;
            return (
              <div key={product._id} className="flex items-center gap-4 border-b pb-2">
                <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">Qty: {cartItems[product._id]}</p>
                </div>
                <p className="font-semibold">${product.price * cartItems[product._id]}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 border-t pt-4 flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>${getTotalCartAmount()}</span>
        </div>
        <Link to="/cart" className="text-blue-500 underline block text-right mt-2">Edit Cart</Link>
      </div>
    </div>
  );
};

export default Checkout;
