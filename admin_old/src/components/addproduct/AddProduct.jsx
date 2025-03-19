import React, { useState, useEffect } from 'react';
import './addProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    images: [],
    category: '',
    price: '',
    old_price: '',
    description: '',
    colors: [],
    sizes: [],
    brand: '',
    stock: ''
  });

  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/allcategory');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input changes
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setProductDetails({ ...productDetails, category: e.target.value });
  };

  // Handle image uploads
  const imageHandler = (e) => {
    const files = Array.from(e.target.files);
    setProductDetails({ ...productDetails, images: files });
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // Add and manage colors
  const addColor = () => {
    setProductDetails({ ...productDetails, colors: [...productDetails.colors, ''] });
  };
  const handleColorChange = (index, value) => {
    const newColors = [...productDetails.colors];
    newColors[index] = value;
    setProductDetails({ ...productDetails, colors: newColors });
  };
  const removeColor = (index) => {
    const newColors = productDetails.colors.filter((_, i) => i !== index);
    setProductDetails({ ...productDetails, colors: newColors });
  };

  // Add and manage sizes
  const addSize = () => {
    setProductDetails({ ...productDetails, sizes: [...productDetails.sizes, ''] });
  };
  const handleSizeChange = (index, value) => {
    const newSizes = [...productDetails.sizes];
    newSizes[index] = value;
    setProductDetails({ ...productDetails, sizes: newSizes });
  };
  const removeSize = (index) => {
    const newSizes = productDetails.sizes.filter((_, i) => i !== index);
    setProductDetails({ ...productDetails, sizes: newSizes });
  };

  // Add Product
  const Add_Product = async (e) => {
    e.preventDefault();

    const { name, category, price, stock, images } = productDetails;

    if (!name || !category || !price || !stock || images.length === 0) {
      alert('Please fill out all required fields and upload images.');
      return;
    }

    try {
      let formData = new FormData();
      images.forEach((image) => formData.append('images', image));

      const uploadResponse = await fetch('http://localhost:8090/api/upload', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        alert('Failed to upload images.');
        return;
      }

      const product = {
        ...productDetails,
        images: uploadData.imageurls
      };

      const addResponse = await fetch('http://localhost:8090/api/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      const addData = await addResponse.json();

      if (addData.success) {
        alert('Product added successfully.');
      } else {
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className="add-product">
      <div className="heading">Add Product</div>

      {/* Product Name */}
      <div className="addproduct-itemfield">
        <p>Product Name:</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Enter product name"
        />
      </div>

      {/* Price and Old Price */}
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price:</p>
          <input
            type="number"
            name="price"
            value={productDetails.price}
            onChange={changeHandler}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Old Price:</p>
          <input
            type="number"
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
          />
        </div>
      </div>

      {/* Stock and Brand */}
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Stock:</p>
          <input
            type="number"
            name="stock"
            value={productDetails.stock}
            onChange={changeHandler}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Brand:</p>
          <input
            type="text"
            name="brand"
            value={productDetails.brand}
            onChange={changeHandler}
          />
        </div>
      </div>

      {/* Colors */}
      <div className="addproduct-itemfield">
        <p>Colors:</p>
        {productDetails.colors.map((color, index) => (
          <div key={index}>
            <input
              type="text"
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
            />
            <button onClick={() => removeColor(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addColor}>Add Color</button>
      </div>

      {/* Sizes */}
      <div className="addproduct-itemfield">
        <p>Sizes:</p>
        {productDetails.sizes.map((size, index) => (
          <div key={index}>
            <input
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(index, e.target.value)}
            />
            <button onClick={() => removeSize(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addSize}>Add Size</button>
      </div>

      {/* Category */}
      <div className="addproduct-itemfield">
        <p>Category:</p>
        <select value={productDetails.category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="addproduct-itemfield">
        <p>Description:</p>
        <textarea
          name="description"
          value={productDetails.description}
          onChange={changeHandler}
        ></textarea>
      </div>

      {/* Images */}
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <div className="image-preview">
            {previewImages.length > 0 ? (
              previewImages.map((src, index) => (
                <img key={index} src={src} alt="Preview" className="preview-img" />
              ))
            ) : (
              <img src={upload_area} alt="Upload" className="upload-placeholder" />
            )}
          </div>
        </label>
        <input
          type="file"
          id="file-input"
          multiple
          onChange={imageHandler}
          style={{ display: 'none' }}
        />
      </div>

      {/* Submit Button */}
      <button onClick={Add_Product} className="btn btn-primary">Add Product</button>
    </div>
  );
};

export default AddProduct;

// import React, { useState } from 'react'
// import './addProduct.css'
// import upload_area from '../../assets/upload_area.svg';
// import { useEffect } from 'react';
// const AddProduct = () => {
//     const [image, setImage] = useState(false);
//     const [productDetails, setProductDetails] = useState({
//         name: "",
//         image: [],
//         category: "",
//         price: "",
//         old_price: "",
//         description: "",
//         colors: [],
//         sizes: [],
//         brand: '',
//         stock: ''
//     });
//     const [category, setcategory] = useState([]);

//     const fetchCategories = async () => {
//         await fetch('http://localhost:8090/api/allcategory')
//             .then((res) => res.json())
//             .then((data) => { setcategory(data) });
//     }

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const handleCategoryChange = async (e) => {
//         const categoryId = e.target.value;
//         setcategory({ ...productDetails, category: categoryId });
//     }

//     const imageHandler = (e) => {
//         const files = e.target.files;
//         setImage({...productDetails, images:files});
//         // setImages([...e.target.files]);
//         // setImage({...product, images:files});
//         // setImage(e.target.files[0]);
//     }
//     const changeHandler = (e) => {
//         setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
//     }

//     const addColor = () => {
//         setProductDetails({ ...productDetails, colors: [...productDetails.colors, ''] });
//     };

//     const handleColorChange = (index, value) => {
//         const newColors = [...productDetails.colors];
//         newColors[index] = value;
//         setProductDetails({ ...productDetails, colors: newColors });
//     };

//     const removeColor = (index) => {
//         const newColors = productDetails.colors.filter((_, i) => i !== index);
//         setProductDetails({ ...productDetails, colors: newColors });
//     };

//     const addSize = () => {
//         setProductDetails({ ...productDetails, sizes: [...productDetails.sizes, ''] });
//     };

//     const handleSizeChange = (index, value) => {
//         const newSizes = [...productDetails.sizes];
//         newSizes[index] = value;
//         setProductDetails({ ...productDetails, sizes: newSizes });
//     };

//     const removeSize = (index) => {
//         const newSizes = productDetails.sizes.filter((_, i) => i !== index);
//         setProductDetails({ ...productDetails, sizes: newSizes });
//     };


//     const Add_Product = async (e) => {
//         e.preventDefault();

//         // console.log(productDetails);
//         let responseData;
//         let product = productDetails;

//         let formData = new FormData();
//         for (let i = 0; i < product.images.length; i++) {
//             formData.append('products', product.images[i]);
//         }
//         // formData.append('product',images[i]);

//         await fetch(' http://localhost:8090/api/upload', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//             },
//             body: formData,
//         }).then((resp) => resp.json()).then((data) => { responseData = data });

//         if (responseData.success) {
//             product.image = responseData.image_url;
//             // console.log(product);
//             await fetch('http://localhost:8090/api/addproduct', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(product),
//             }).then((resp) => resp.json()).then((data) => {
//                 data.success ? alert("product added") : alert("failed")
//             });

//         }
//     }
//     return (
//         <div className='add-product'>
//             <div className="heading">
//                 Add Product
//             </div>
//             <div className="addproduct-itemfield">
//                 <p>product Name:</p>
//                 <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='type here' />
//             </div>
//             <div className="addproduct-price">
//                 <div className="addproduct-itemfield">
//                 <div>
//           <label className="block text-sm font-medium text-gray-700">Price:</label>
//           <input
//             type="number"
//             name="price"
//             value={productDetails.price}
//             onChange={changeHandler}
//             required
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>  </div>
//                 <div className="addproduct-itemfield">
//                 <div>
//           <label className="block text-sm font-medium text-gray-700">Old Price:</label>
//           <input
//             type="number"
//             name="old_price"
//             value={productDetails.old_price}
//             onChange={changeHandler}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div> </div>
//             </div>
//             <div className="addproduct-price">
//                 <div className="addproduct-itemfield">
//                 <div>
//           <label className="block text-sm font-medium text-gray-700">Stock:</label>
//           <input
//             type="number"
//             name="stock"
//             value={productDetails.stock}
//             onChange={changeHandler}
//             required
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div></div>
//                 <div className="addproduct-itemfield">
//                 <div>
//           <label className="block text-sm font-medium text-gray-700">Brand:</label>
//           <input
//             type="text"
//             name="brand"
//             value={productDetails.brand}
//             onChange={changeHandler}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div> </div>
//             </div>
//             <div className="addproduct-price">
//                 <div className="addproduct-itemfield">
//                 <div>
//           <label className="block text-sm font-medium text-gray-700">colors:</label>
//           {productDetails.colors.map((color, index) => (
//             <div key={index} className="flex items-center space-x-2">
//               <input
//                 type="text"
//                 value={color}
//                 onChange={(e) => handleColorChange(index, e.target.value)}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeColor(index)}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addColor}
//             className="text-blue-500 mt-2"
//           >
//             Add color
//           </button>
//         </div>

//                 </div>
//                 <div className="addproduct-itemfield">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Sizes:</label>
//                         {productDetails.sizes.map((size, index) => (
//                             <div key={index} className="flex items-center space-x-2">
//                                 <input
//                                     type="text"
//                                     value={size}
//                                     onChange={(e) => handleSizeChange(index, e.target.value)}
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => removeSize(index)}
//                                     className="text-red-500"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         ))}
//                         <button
//                             type="button"
//                             onClick={addSize}
//                             className="text-blue-500 mt-2"
//                         >
//                             Add Size
//                         </button>
//                     </div>
//                 </div>
//             </div>

// <div className="addproduct-price">
//             <div className="addproduct-itemfield">
//                 <p>category:</p>
//                 <select value={productDetails.category} onChange={handleCategoryChange} name="category" id="" className="add-product-selector">
//                     <option value="">Select category</option>
//                     {category.map((category)=>(
//                     <option key={category._id} value={category._id}>{category.name}</option>

//                     ))}
                    
//                 </select>
//             </div>
//             <div className="addproduct-itemfield">
//                 <p>Description:</p>
//                 <textarea name="description" value={productDetails.description}
//                  onChange={changeHandler} ></textarea>
//             </div>
//             </div>
//             <div className="addproduct-itemfield">
//                 <label htmlFor="file-input">
//                     <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-thumnail-img' />
//                 </label>
//                 <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
//             </div>
//             <button onClick={() => { Add_Product() }} className='addproduct-btn'>ADD</button>
//         </div>
//     )
// }

// export default AddProduct



// import React, { useState } from 'react';
// import './addProduct.css';
// import upload_area from '../../assets/upload_area.svg';

// const AddProduct = () => {
//   const [images, setImages] = useState([]);
//   const [productDetails, setProductDetails] = useState({
//     name: '',
//     category: '',
//     price: '',
//     old_price: '',
//     stock: '',
//     colors: [],
//     sizes: [],
//   });
//   const [colorInput, setColorInput] = useState('');
//   const [sizeInput, setSizeInput] = useState('');

//   // Handle multiple image uploads
//   const imageHandler = (e) => {
//     setImages([...e.target.files]);
//   };

//   // Handle changes in other product fields
//   const changeHandler = (e) => {
//     setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//   };

//   // Handle adding colors to the array
//   const addColor = () => {
//     if (colorInput.trim()) {
//       setProductDetails({
//         ...productDetails,
//         colors: [...productDetails.colors, colorInput.trim()],
//       });
//       setColorInput('');
//     }
//   };

//   // Handle adding sizes to the array
//   const addSize = () => {
//     if (sizeInput.trim()) {
//       setProductDetails({
//         ...productDetails,
//         sizes: [...productDetails.sizes, sizeInput.trim()],
//       });
//       setSizeInput('');
//     }
//   };

//   const Add_Product = async () => {
//     try {
//       let responseData;
//       let formData = new FormData();

//       // Append images to formData
//       images.forEach((image) => {
//         formData.append('images', image);
//       });

//       // Upload images
//       await fetch('http://localhost:8090/api/upload', {
//         method: 'POST',
//         body: formData,
//       })
//         .then((resp) => resp.json())
//         .then((data) => {
//           responseData = data;
//         });

//       if (responseData.success) {
//         const imageUrls = responseData.imageurls;

//         // Add image URLs to product details
//         const product = { ...productDetails, images: imageUrls };

//         // Send product details to the backend
//         await fetch('http://localhost:8090/api/addproduct', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(product),
//         })
//           .then((resp) => resp.json())
//           .then((data) => {
//             if (data.success) {
//               alert('Product added successfully');
//               // Reset form
//               setImages([]);
//               setProductDetails({
//                 name: '',
//                 category: '',
//                 price: '',
//                 old_price: '',
//                 stock: '',
//                 colors: [],
//                 sizes: [],
//               });
//             } else {
//               alert('Failed to add product');
//             }
//           });
//       } else {
//         alert('Image upload failed');
//       }
//     } catch (error) {
//       console.error('Error adding product:', error);
//       alert('An error occurred while adding the product.');
//     }
//   };

//   return (
//     <div className="add-product">
//       <div className="addproduct-itemfield">
//         <p>Product Title</p>
//         <input
//           value={productDetails.name}
//           onChange={changeHandler}
//           type="text"
//           name="name"
//           placeholder="Type here"
//         />
//       </div>
//       <div className="addproduct-price">
//         <div className="addproduct-itemfield">
//           <p>Price</p>
//           <input
//             value={productDetails.old_price}
//             onChange={changeHandler}
//             type="text"
//             name="old_price"
//             placeholder="Type here"
//           />
//         </div>
//         <div className="addproduct-itemfield">
//           <p>Offer Price</p>
//           <input
//             value={productDetails.price}
//             onChange={changeHandler}
//             type="text"
//             name="price"
//             placeholder="Type here"
//           />
//         </div>
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Stock</p>
//         <input
//           value={productDetails.stock}
//           onChange={changeHandler}
//           type="number"
//           name="stock"
//           placeholder="Stock count"
//         />
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Product Category</p>
//         <select
//           value={productDetails.category}
//           onChange={changeHandler}
//           name="category"
//           className="add-product-selector"
//         >
//           <option value="">Select Category</option>
//           <option value="men">Men</option>
//           <option value="women">Women</option>
//           <option value="kid">Kid</option>
//         </select>
//       </div>
//       <div className="addproduct-itemfield">
//         <label htmlFor="file-input">
//           <img
//             src={images.length > 0 ? URL.createObjectURL(images[0]) : upload_area}
//             alt="Upload Thumbnail"
//             className="addproduct-thumnail-img"
//           />
//         </label>
//         <input
//           onChange={imageHandler}
//           type="file"
//           name="images"
//           id="file-input"
//           hidden
//           multiple
//         />
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Colors</p>
//         <div className="addproduct-array-input">
//           <input
//             value={colorInput}
//             onChange={(e) => setColorInput(e.target.value)}
//             type="text"
//             placeholder="Add color"
//           />
//           <button onClick={addColor}>Add</button>
//         </div>
//         <div className="addproduct-array-list">
//           {productDetails.colors.map((color, index) => (
//             <span key={index} className="array-item">
//               {color}
//             </span>
//           ))}
//         </div>
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Sizes</p>
//         <div className="addproduct-array-input">
//           <input
//             value={sizeInput}
//             onChange={(e) => setSizeInput(e.target.value)}
//             type="text"
//             placeholder="Add size"
//           />
//           <button onClick={addSize}>Add</button>
//         </div>
//         <div className="addproduct-array-list">
//           {productDetails.sizes.map((size, index) => (
//             <span key={index} className="array-item">
//               {size}
//             </span>
//           ))}
//         </div>
//       </div>
//       <button onClick={Add_Product} className="addproduct-btn">
//         ADD
//       </button>
//     </div>
//   );
// };

// export default AddProduct;







