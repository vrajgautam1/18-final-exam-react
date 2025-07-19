import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Form({
  productList,
  setProductList,
  selectedProduct,
  setSelectedProduct,
}) {
  const [product, setProduct] = useState({
    sku: "",
    name: "",
    image: null,
    price: "",
    brand: "",
    description: "",
    category: "",
    rating: "",
    inStock: false,
  });

  const imgRef = useRef();

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;

    if (name === "image") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          image: reader.result, // ✅ Just Base64 string
        }));
      };

      reader.readAsDataURL(file);
      return;
    }

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (product.id) {
        await axios.put(
          `http://localhost:3000/products/${product.id}`,
          product
        );
        const updatedList = productList.map((p) =>
          p.id === product.id ? product : p
        );
        setProductList(updatedList);
        console.log("Product updated.");
      } else {
        const res = await axios.post("http://localhost:3000/products", product);
        console.log("product added to db.json");
        setProductList([...productList, res.data]);
        console.log("Product added.");
      }
    } catch (error) {
      console.error("Error saving product:", error.message);
    }

    setProduct({
      sku: "",
      name: "",
      image: null,
      price: "",
      brand: "",
      description: "",
      category: "",
      rating: "",
      inStock: false,
    });
    imgRef.current.value = "";
    setSelectedProduct(null);
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{product.id ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        {/* Form Fields (same as before) */}
        {/* ... All input fields unchanged ... */}
        <div className="mb-3">
          <label className="form-label">SKU</label>
          <input
            type="text"
            className="form-control"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            accept="image/*"
            onChange={handleChange}
            ref={imgRef}
          />
          {product.image?.url && (
            <img
              src={product.image.url}
              alt="Preview"
              className="mt-2"
              style={{ width: 100 }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="menswear">Menswear</option>
            <option value="womenswear">Womenswear</option>
            <option value="footwear">Footwear</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Rating (out of 5)</label>
          <input
            type="number"
            className="form-control"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="inStock"
            checked={product.inStock}
            onChange={handleChange}
          />
          <label className="form-check-label">In Stock</label>
        </div>
        <button type="submit" className="btn btn-primary">
          {product.id ? "Update Product" : "Submit Product"}
        </button>
      </form>
    </div>
  );
}
