import { Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Products from "./components/Products";
import { CartProvider } from "react-use-cart";
import Add_Product from "./components/admin/addProduct/Add_Product";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/admin/addproduct" element={<Add_Product />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
