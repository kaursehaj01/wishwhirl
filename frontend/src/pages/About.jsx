import React from "react";
import img from '../assets/images/ban1.png'
const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center py-12 px-6">
      {/* Heading */}
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About WishWhirl</h1>
        <p className="text-gray-600 text-lg">
          Welcome to WishWhirl – your ultimate destination for trendy fashion, accessories, and more. 
          We believe in offering stylish, high-quality products at the best prices.
        </p>
      </div>

      {/* Image */}
      <div className="w-full max-w-4xl my-8">
        <img
          src={img}
          alt="WishWhirl Team"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Mission Section */}
      <div className="max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600">
          At WishWhirl, we are dedicated to bringing you the latest styles with unmatched quality.
          Our goal is to make fashion accessible, affordable, and enjoyable for everyone.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-3xl text-center mt-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900">Premium Quality</h3>
            <p className="text-gray-600">We offer hand-picked, high-quality products.</p>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900">Affordable Prices</h3>
            <p className="text-gray-600">Trendy fashion at prices that won’t break the bank.</p>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900">Fast & Secure Shipping</h3>
            <p className="text-gray-600">Quick deliveries with secure packaging.</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-3xl text-center mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-gray-600">
          Have questions? Reach out to us anytime at{" "}
          <span className="font-semibold text-gray-900">support@wishwhirl.com</span>
        </p>
      </div>
    </div>
  );
};

export default About;
