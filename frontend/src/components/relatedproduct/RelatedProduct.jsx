import React from 'react'
// import './relatedProduct.css';
import data_product from '../../assets/data';
import Item from '../item/Item';

const RelatedProduct = () => {
  return (
    <div className='mx-auto relatedproduct popular pb-[80px] px-4  pt-[50px] max-w-2xl sm:px-6 lg:max-w-[85rem] lg:px-6'>
<h1 className='text-xl sm:text-3xl font-semibold pb-2 border-b-[1px] justify-center flex items-center'>RELATED PRODUCTS</h1>
<div className="pt-6 relatedproduct-item gap-x-6 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 justify-items-center">
    {data_product.map((item, i)=>{
        return <Item key={i} id={item.id} name ={item.name} image ={item.image} new_price ={item.new_price} old_price ={item.old_price} />
        
})}
</div>
    </div>
  )
}

export default RelatedProduct