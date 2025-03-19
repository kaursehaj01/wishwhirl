import React, { useContext } from 'react';
import star_icon from '../../assets/star_icon.png';
import star_dull_icon from '../../assets/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';
import { Radio, RadioGroup } from '@headlessui/react'


const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row gap-6  mx-2 sm:mx-10 2xl:grid 2xl:grid-cols-2 2xl:mx-32">
      {/* Left Section */}
      <div className="flex flex-col sm:flex-row w-full sm:w-9/12 md:w-10/12 gap-4 2xl:w-full">
        <div className="flex flex-row sm:flex-col gap-2 sm:gap-4">
          <img className=" h-20 w-20 sm:h-36 sm:w-36 md:h-44 md:w-44 object-cover 2xl:h-52 2xl:w-52" src={product.image} alt="" />
          <img className="  h-20 w-20 sm:h-36 sm:w-36 md:h-44 md:w-44 object-cover  2xl:h-52 2xl:w-52" src={product.image} alt="" />
          <img className="  h-20 w-20 sm:h-36 sm:w-36 md:h-44 md:w-44 object-cover  2xl:h-52 2xl:w-52" src={product.image} alt="" />
          <img className="  h-20 w-20 sm:h-36 sm:w-36 md:h-44 md:w-44 object-cover  2xl:h-52 2xl:w-52" src={product.image} alt="" />
        </div>
        <div>
          <img
            className="w-full max-w-lg h-auto md:h-full md:w-full lg:w-full lg:h-full object-cover 2xl:max-w-5xl"
            src={product.image}
            alt=""
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-6 md:ml-10 2xl:mt-32 md:w-3/5 2xl:w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          {product.name}
        </h1>
        <div className="flex items-center gap-2 text-gray-600 text-lg">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="flex gap-6 text-xl font-semibold">
          <span className="text-gray-400 line-through">
            ${product.old_price}
          </span>
          <span className="text-red-500">${product.new_price}</span>
        </div>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem non
          saepe suscipit nostrum nulla labore consectetur aut porro eaque!
          Explicabo vero molestiae laborum?
        </p>
        <div>
          <h1 className="text-lg text-gray-600 font-medium">Select size</h1>
          <div className="flex gap-4 mt-4">
            <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-md cursor-pointer">
              S
            </div>
            <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-md cursor-pointer">
              M
            </div>
            <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-md cursor-pointer">
              L
            </div>
            <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-md cursor-pointer">
              XL
            </div>
            <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-md cursor-pointer">
              XXL
            </div>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}
          className="w-full md:w-auto bg-red-500 text-white px-8 py-3 text-lg font-semibold rounded-md"
        >
          ADD TO CART
        </button>
        <p className="text-gray-600">
          <span className="font-semibold">Category:</span> Women, T-shirt, crop
          top
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Tags:</span> Modern, latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;