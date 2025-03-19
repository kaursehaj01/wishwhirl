import React, { useEffect, useState } from 'react';
import './listProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/allproducts');
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
      const response = await fetch(`http://localhost:8090/api/removeproduct/${id}`, {
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

// // nnote ---> handle all image
// {product.images.map((image, index) => (
//     <img key={index} src={image} alt={`Product Image ${index + 1}`} />
//   ))}
// Handling Multiple Images:

// If you want to display all images in the array, you can loop through
//  product.images and render all images. For example:
  




// 2nd one bus image ni show horei bus
// import React, { useEffect, useState } from 'react'
// import './listProduct.css'
// import cross_icon from '../../assets/cross_icon.png'
// const ListProduct = () => {
//     const [allproducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);


//     const fetchProducts = async () => {
//         try {
//             const response = await fetch('http://localhost:8090/api/allproducts');
//             const data = await response.json();
//             setAllProducts(data);
//             setLoading(false);
//         } catch (error) {
//             console.error('failed to fetch product:', error);
//         }
//     };
//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const removeProduct = async(id) =>{
//         try {
//             const response = await fetch(`http://localhost:8090/api/removeproduct/${id}`,{
//                 method:'POST',
//             });
//             const result = await response.json();
//             if (response.ok) {
//               alert(result.message || 'Product removed successfully');
//               fetchProducts(); // Refresh the product list after deletion
//             } else {
//               alert(result.message || 'Failed to remove product');

//             }

//         } catch (error) {
//             console.error('error removing product:', error);
//       alert('An error occurred while removing the product.');

//         }


//     };
//     return (
       
//         <div className='listproduct'>
//             <h1>All product list</h1>
//             {loading ? (
//                 <p>Loading Products.....</p>
        
//             ):(
//                 <>
//             <div className="listproduct-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Old_price</p>
//                 <p>New_price</p>
//                 <p>Category</p>
//                 <p>Remove</p>
//             </div>
//             <div className='listproduct-allproduct'>
//                 <hr />
//             {allproducts.map((product) => (
//               <React.Fragment key={product._id}>
//                 <div className="listproduct-format-main listproduct-format">
//                   <img src={product.images} alt={product.name} className="listproduct-product-icon" />
                 
//                   <p>{product.name}</p>
//                   <p>${product.old_price}</p>
//                   <p>${product.price}</p>
//                   <p>{product.category?.name || 'Uncategorized'}</p>
//                   <img
//                     onClick={() => removeProduct(product._id)}
//                     className="listproduct-remove-icon"
//                     src={cross_icon}
//                     alt="Remove"
//                   />
//                 </div>
//                 <hr />
//               </React.Fragment>
//             ))}
//             </div>
//             </>
//             )}
//         </div>
//     )
// }

// export default ListProduct;

// first
// import React, { useEffect, useState } from 'react'
// import './listProduct.css'
// import cross_icon from '../../assets/cross_icon.png'
// const ListProduct = () => {
//     const [allproducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);


//     const fetchInfo = async () => {
//         await fetch('http://localhost:8090/api/allproducts')
//             .then((res) => res.json())
//             .then((data) => { setAllProducts(data) });


//     }
//     useEffect(() => {
//         fetchInfo();
//     }, []);

//     const remove_product = async(id) =>{
//         await fetch(`http://localhost:8090/api/removeproduct/${id}`,{
//             method:'POST',
//             headers:{
//                 Accept:'application/json',
//                 'Content-Type':'application/json',
//             },
//             body:JSON.stringify({id:id}),
//         })
//         await fetchInfo();


//     }
//     return (
       
//         <div className='listproduct'>
//             <h1>All product list</h1>
//             <div className="listproduct-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Old_price</p>
//                 <p>New_price</p>
//                 <p>Category</p>
//                 <p>Remove</p>
//             </div>
//             <div className='listproduct-allproduct'>
//                 <hr />
//                 {allproducts.map((product, index) => {
//                     return  <>
//                     <div key={index} className="listproduct-format-main listproduct-format">
//                         <img src={product.image} alt="" className="listproduct-product-icon" />
//                         <p>{product.name}</p>
//                         <p>${product.old_price}</p>
//                         <p>${product.new_price}</p>
//                         <p>{product.category}</p>
//                         <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
//                     </div>
//                     <hr/>
//                 </>
//                 })}
//             </div>
//         </div>
//     )
// }

// export default ListProduct