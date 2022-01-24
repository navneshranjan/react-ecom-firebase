import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductItems from "./ProductItems";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import currencyFormat from "../helper/currencyFormat";

const Products = () => {
  const [product, setProduct] = useState([]);
  const { totalItems, cartTotal } = useCart();
  // Fetch the product....
  useEffect(() => {
    const fetchProduct = async () => {
      // this code was fetching the data from the API I created
      // const { data } = await axios.get("http://localhost:3300/product");
      // setProduct(data.products);
      const fetchedProduct = await getDocs(collection(db, "products"));
      fetchedProduct.forEach((doc) => {
        let docItem = {
          id: doc.id,
          ...doc.data(),
        };
        setProduct((item) => [...item, docItem]);
        console.log(docItem);
      });
    };
    fetchProduct();
  }, []);

  return (
    <>
      {product.map((item, id) => (
        <ProductItems key={id} {...item} item={item} />
      ))}
      <div className="footer_cart_info">
        <div className="price-component">
          {/* item count */}
          <p className="price_info">
            {totalItems > 0 ? totalItems : ""}
            {""}
            {totalItems < 1 ? "addProduct" : totalItems > 1 ? "items " : "item"}
          </p>
          {currencyFormat(cartTotal)}(plus taxes);
        </div>
        {totalItems > 0 ? (
          <div className="cart-component">
            <Link className="btn" to="/cart">
              <img src="shopping-cart.svg" alt="Cart" />
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Products;
