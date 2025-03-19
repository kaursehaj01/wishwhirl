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

