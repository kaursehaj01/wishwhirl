import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Breadcrum from '../components/breadcrums/Breadcrum';
import ProductDisplay from '../components/productdisplay/ProductDisplay';
import DescriptionBox from '../components/descriptionbox/DescriptionBox';
import RelatedProduct from '../components/relatedproduct/RelatedProduct';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams(); // Get productId from URL

  // console.log('productId from URL:', productId);  // Log to ensure correct productId
  // console.log('All Products:', all_product);

  // Find the product in the array
  const product = all_product.find((item) => item._id === productId);

  // console.log('Product found:', product);  // Log to check if product is found

  if (!product) {
    return <div>Product not found</div>;  // Show an error message if product is not found
  }

  return (
    <div className="product">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProduct />
    </div>
  );
};

export default Product;



// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { useParams } from 'react-router-dom';
// import Breadcrum from '../components/breadcrums/Breadcrum';
// import ProductDisplay from '../components/productdisplay/ProductDisplay';
// import DescriptionBox from '../components/descriptionbox/DescriptionBox';
// import RelatedProduct from '../components/relatedproduct/RelatedProduct';


// const Product = () => {
//   const {all_product} = useContext(ShopContext);
 
// const { productId } = useParams();
// console.log('productId from URL:', productId);  // Log the URL parameter
// console.log('All Products:', all_product);  



// const product = all_product.find((item) => item._id === productId);
// console.log('Product found:', product);

//   // const product = all_product.find((e) => e._id === productId);


//   if (!product) {
//     return <div>Product not found</div>; // Or redirect, show an error, etc.
//   }
  
//   return (
//     <div className="product">
      
//       <Breadcrum product={product}/>
//       <ProductDisplay product={product}/>
//       <DescriptionBox/>
//       <RelatedProduct/>
//     </div>
//   )
// }

// export default Product

//if category is in string then use this if it is in the object format then wee have to use above code 
//andthis based on category 
// const filteredProducts = all_product.filter(
//   (item) => item.category === category
// );
// // for multiple images

