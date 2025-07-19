import React from "react";
import Form from "../components/Form";
import Table from "../components/Table";
import Header from "../components/header";

function AdminPanel({ productList, setProductList }) {
    return (
        <div>
            <Form productList={productList} setProductList={setProductList} />
            <Table productList={productList} />
        </div>
    );
}

export default AdminPanel;
