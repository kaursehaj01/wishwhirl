import React, { useEffect, useState } from 'react';
import Item from '../item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  
  useEffect(() => {
    fetch('https://wishwhirl.onrender.com/api/popularinwomen')
      .then((res) => res.json())
      .then((data) => setPopularProducts(data))
      .catch((error) => console.error('Failed to fetch popular products:', error));
  }, []);

  return (
    <div className="popular pb-[80px] px-4 mx-auto pt-[50px] max-w-2xl sm:px-6 lg:max-w-[85rem] lg:px-6">
      <h1 className="text-xl sm:text-3xl font-semibold pb-2 justify-center border-b-[1px] flex items-center">
        POPULAR IN WOMEN
      </h1>
      <div className="pt-6 popular-item gap-x-6 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 justify-items-center">
        {popularProducts.map((item, i) => {
          // Safely handle the `images` array and pass the first image or a fallback
          const firstImage = item.images?.[0] || '/default-image.jpg';
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              image={firstImage}
              price={item.price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;

