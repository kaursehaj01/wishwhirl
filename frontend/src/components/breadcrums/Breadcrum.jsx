import React from 'react';
import './breadCrum.css';
import arrow_icon from '../../assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
  const { product } = props;

  // Check if product is defined
  if (!product) {
    return <div>Loading...</div>; // Or any loading state you prefer
  }

  return (
    <div className='Breadcrum'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> 
      {product.category?.name} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
}

export default Breadcrum;

