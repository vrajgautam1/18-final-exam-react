import React from "react";

function Card({ product }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        {product.image?.url && (
          <img
            src={product.image.url}
            className="card-img-top"
            alt={product.name}
            style={{ height: "250px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{product.brand}</h6>
          <p className="card-text" style={{ minHeight: "60px" }}>
            {product.description}
          </p>
          <p className="card-text">
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p className="card-text">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="card-text">
            <strong>Rating:</strong> ⭐ {product.rating}
          </p>
          <p className={`card-text ${product.inStock ? "text-success" : "text-danger"}`}>
            <strong>{product.inStock ? "In Stock" : "Out of Stock"}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
