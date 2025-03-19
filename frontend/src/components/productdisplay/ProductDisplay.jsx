import React, { useContext, useState } from 'react';
import star_icon from '../../assets/star_icon.png';
import star_dull_icon from '../../assets/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  // console.log("displayb", product);

  // State for the selected size and color
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');

  // State for the currently selected image
  const [mainImage, setMainImage] = useState(product.images?.[0]);
  
  // State to store thumbnails (excluding the main image)
  const [thumbnails, setThumbnails] = useState(product.images?.slice(1, 5));

  const handleImageSwap = (selectedImage) => {
    // Swap the selected thumbnail with the main image
    const updatedThumbnails = thumbnails.map((img) => 
      img === selectedImage ? mainImage : img
    );

    setMainImage(selectedImage);
    setThumbnails(updatedThumbnails);
  };

  return (
    <div className="flex flex-col md:flex-row gap-y-6 gap-x-6 mx-2 sm:mx-10 2xl:max-w-[85rem] 2xl:justify-center 2xl:mx-auto 2xl:justify-items-center">
      {/* Left Section: Images */}
      <div className="flex flex-col sm:flex-row w-full gap-4 md:w-3/5 lg:w-3/5 xl:w-1/2 2xl:w-1/2">
        {/* Thumbnail Images */}
        <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 sm:w-1/5 md:w-1/4">
          {thumbnails.map((image, index) => (
            <img
              key={index}
              className="h-28 w-36 sm:h-36 sm:w-32 md:h-44 md:w-44 object-cover rounded-md cursor-pointer border border-gray-300 hover:border-red-500 transition-all duration-200 2xl:h-52 2xl:w-52"
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleImageSwap(image)} // Update main image on click
            />
          ))}
        </div>
        {/* Main Image */}
        <div className="w-full sm:w-4/5 sm:h-full md:w-3/4">
          <img
            className="w-full max-w-lg h-auto md:h-full md:w-full lg:w-full lg:h-full object-cover 2xl:max-w-5xl"
            src={mainImage}
            alt="Main Product"
          />
        </div>
      </div>

      {/* Right Section: Product Details */}
      <div className="flex flex-col gap-6 md:ml-4 md:w-2/5 lg:w-2/5 lg:mt-20 xl:w-1/2 2xl:w-1/2 2xl:mt-32">
        {/* Product Name */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">{product.name}</h1>

        {/* Ratings */}
        <div className="flex items-center gap-2 text-gray-600 text-lg">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        {/* Price */}
        <div className="flex gap-6 text-xl font-semibold">
          <span className="text-gray-400 line-through">${product.old_price}</span>
          <span className="text-red-500">${product.price}</span>
        </div>

        {/* Product Description */}
        <p className="text-gray-700">{product.description}</p>

        {/* Sizes */}
        <div>
          <h1 className="text-lg text-gray-600 font-medium">Select size</h1>
          <div className="flex gap-4 mt-4">
            {product.sizes?.map((size, index) => (
              <div
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md cursor-pointer ${
                  selectedSize === size ? 'bg-red-500 text-white' : 'bg-gray-50 border-gray-300'
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h1 className="text-lg text-gray-600 font-medium">Select color</h1>
          <div className="flex gap-4 mt-4">
            {product.colors?.map((color, index) => (
              <div
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border rounded-md cursor-pointer ${
                  selectedColor === color ? 'bg-red-500 text-white' : 'bg-gray-50 border-gray-300'
                }`}
              >
                {color}
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product._id)}
          className="w-full md:w-auto bg-red-500 text-white px-8 py-3 text-lg font-semibold rounded-md"
        >
          ADD TO CART
        </button>

        {/* Category and Tags */}
        <p className="text-gray-600">
          <span className="font-semibold">Category:</span> {product.category?.name}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Tags:</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
