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
      const response = await fetch('https://wishwhirl.onrender.com/api/allcategory');
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

      const uploadResponse = await fetch('https://wishwhirl.onrender.com/api/upload', {
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

      const addResponse = await fetch('https://wishwhirl.onrender.com/api/addproduct', {
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

