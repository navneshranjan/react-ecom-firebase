import "./App.css";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Products from "./components/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
