import React from "react";
import { useCart } from "react-use-cart";

const ProductItems = ({ id, price, name, item }) => {
  const { addItem } = useCart();
  return (
    <div className="products" key={id}>
      <div className="product_details">
        <p id="product_title">{name}</p>
        <span id="product_price">Rs.{price}</span>
      </div>
      <button onClick={() => addItem(item)}>Add</button>
    </div>
  );
};

export default ProductItems;
