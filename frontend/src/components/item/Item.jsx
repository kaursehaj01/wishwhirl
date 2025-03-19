import React, { useContext } from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';
import { GiReturnArrow } from 'react-icons/gi';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineLabelImportant } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

const Item = (props) => {
  const { addToCart, addToWishlist } = useContext(ShopContext);


  return (





    <div className="item w-full relative group">
      {/* Product Image Section */}
      <div className="relative overflow-hidden sm:max-w-96 sm:max-h-96 md:max-w-80 md:max-h-80 2xl:max-w-full 2xl:max-h-full">
        <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            src={props.image}
            alt={props.name || 'Product Image'}
            className="w-full h-full item-img 2xl:w-full 2xl:h-full object-cover object-center  transition-transform duration-300 hover:scale-105"
          />
        </Link>
        

        {/* <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
  <div className="w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-lg">
    <img
      src={props.image}
      alt={props.name || 'Product Image'}
      className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
    />
  </div>
</Link> */}

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
              onClick={() => addToCart(props.id)}
              className="text-[#767676] hover:text-[#262626] text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-[#262626] flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            {/* View Details Link */}
            <Link
              to={`/product/${props.id}`}
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
              onClick={() => addToWishlist(props.id)}
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
      <div className="sm:max-w-96 md:max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4 2xl:max-w-full 2xl:max-h-full ">
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


