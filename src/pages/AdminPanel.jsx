import React, { useState } from "react";
import Form from "../components/Form";
import Table from "../components/Table";

export default function AdminPanel({ productList, setProductList }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="p-4 space-y-4">
      <Form
        productList={productList}
        setProductList={setProductList}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <Table
        productList={productList}
        setProductList={setProductList}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
}
