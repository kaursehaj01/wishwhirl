import React, { useEffect, useState } from 'react'
import Item from '../item/Item'

const NewCollection = () => {
  const [new_collection, setNew_collection] =useState([]);

  useEffect(()=>{
    fetch('https://wishwhirl.onrender.come/api/newcollections')
    .then((response)=> response.json())
    .then((data)=> setNew_collection(data))
    .catch((error) => console.error('Failed to fetch popular products:', error));

},[]);
  return (
<div className=" mx-auto new-collection  pb-[80px] pt-[20px] px-4 max-w-2xl sm:px-6 lg:max-w-[85rem] lg:px-6">
<h1 className=' text-xl sm:text-3xl font-semibold pb-2 justify-center border-b-[1px] flex items-center'>NEW COLLECTION</h1>

<div className="pt-6 collection gap-x-6 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
{new_collection.map((item,i)=>{

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

export default NewCollection