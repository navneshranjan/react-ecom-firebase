import React from "react";
import { useCart } from "react-use-cart";

const ProductItems = ({ id, price, name, item, image }) => {
  const { addItem } = useCart();
  return (
    <div className="products" key={id}>
      <div className="product_details">
        <p id="product_title">{name}</p>
        <span id="product_price">Rs.{price}</span>
        <div className="images">
          <img id="product_image" src={image} alt="" />
        </div>
      </div>
      <button className="btn " onClick={() => addItem(item)}>
        Add
      </button>
    </div>
  );
};

export default ProductItems;
