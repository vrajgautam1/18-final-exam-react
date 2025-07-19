import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import HomePage from "./pages/Home"; 
import Header from "./components/header";
import axios from "axios";

function App() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/products");
                console.log(res.data);
                setProductList(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/admin"
                    element={
                        <AdminPanel
                            productList={productList}
                            setProductList={setProductList}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
