import React, { useEffect, useState } from 'react';
import './listProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://wishwhirl.onrender.com/api/allproducts');
      const data = await response.json();
      setAllProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Remove product by ID
  const removeProduct = async (id) => {
    try {
      const response = await fetch(`https://wishwhirl.onrender.com/api/removeproduct/${id}`, {
        method: 'POST',
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Product removed successfully');
        fetchProducts(); // Refresh the product list after deletion
      } else {
        alert(result.message || 'Failed to remove product');
      }
    } catch (error) {
      console.error('Error removing product:', error);
      alert('An error occurred while removing the product.');
    }
  };

  return (
    <div className="listproduct">
      <h1>All Product List</h1>
      {loading ? (
        <p>Loading Products...</p>
      ) : (
        <>
          <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>sizes</p>
            <p>colors</p>
            <p>brand</p>
            <p>stock</p>
            <p>Remove</p>
          </div>
          <div className="listproduct-allproduct">
            <hr />
            {allproducts.map((product) => (
              <React.Fragment key={product._id}>
                <div className="listproduct-format-main listproduct-format">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="listproduct-product-icon"
                  />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.price}</p>
                  <p>{product.category?.name || 'Uncategorized'}</p>
                  <p>{product.sizes?.join(', ') || 'N/A'}</p>
                  <p>{product.colors?.join(', ') || 'N/A'}</p>
                  <p>{product.brand || 'No Brand'}</p>
                  <p>{product.stock || 0}</p>
                  <img
                    onClick={() => removeProduct(product._id)}
                    className="listproduct-remove-icon"
                    src={cross_icon}
                    alt="Remove"
                  />
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListProduct;

