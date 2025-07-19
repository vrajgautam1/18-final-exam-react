import React from 'react';
import axios from 'axios';

function Table({ productList, setProductList, setSelectedProduct }) {
  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      const updated = productList.filter((product) => product.id !== id);
      setProductList(updated);
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  }

  return (
    <div className="container mt-4">
      <h3>Product List</h3>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>SKU</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Category</th>
            <th>Rating</th>
            <th>In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>
                {product.image?.url && (
                  <img src={product.image.url} alt={product.name} width="50" />
                )}
              </td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.rating}</td>
              <td>{product.inStock ? 'Yes' : 'No'}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setSelectedProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
