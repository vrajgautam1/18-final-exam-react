import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    inStockOnly: false,
    sort: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setAllProducts(res.data);
        setDisplayedProducts(res.data);
      } catch (error) {
        console.log("Error:", error.message);
      }
    }
    fetchData();
  }, []);

  // Apply filters/sorting/search
  useEffect(() => {
    let filtered = [...allProducts];

    // Search
    if (search) {
      filtered = filtered.filter((p) =>
        `${p.name} ${p.sku}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // In Stock
    if (filters.inStockOnly) {
      filtered = filtered.filter((p) => p.inStock === true);
    }

    // Sorting
    if (filters.sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === "brand") {
      filtered.sort((a, b) => a.brand.localeCompare(b.brand));
    }

    setDisplayedProducts(filtered);
  }, [search, filters, allProducts]);

  // Add to Cart Logic
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  const handleQtyChange = (productId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, qty: Math.max(1, item.qty + change) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">🛒 Home Page – Product Store</h2>

      {/* 🔍 Search + Filter + Sort */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search by name or SKU"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">All Categories</option>
            <option value="menswear">Menswear</option>
            <option value="electronics">Electronics</option>
            <option value="mobiles">Mobiles</option>
            <option value="laptops">Laptops</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sort: e.target.value }))
            }
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="brand">Brand</option>
          </select>
        </div>

        <div className="col-md-2 d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-2"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
            }
          />
          <label className="form-check-label">In Stock Only</label>
        </div>
      </div>

      {/* 📦 Product Cards */}
      <div className="row">
        {displayedProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {product.image?.url && (
                <img
                  src={product.image.url}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.brand}</p>
                <p className="card-text fw-bold">₹{product.price}</p>
                <p className="card-text">
                  <small className="text-muted">{product.category}</small>
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🛒 Cart */}
      <div className="mt-5">
        <h4>🛒 Cart Summary</h4>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleQtyChange(item.id, -1)}
                    >
                      -
                    </button>
                    {item.qty}
                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={() => handleQtyChange(item.id, 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>₹{item.price * item.qty}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="text-end fw-bold">
                  Total:
                </td>
                <td className="fw-bold">₹{totalPrice}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default HomePage;
