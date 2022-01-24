// import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { db } from "../firebase";
import currencyFormat from "../helper/currencyFormat";
import ProductItems from "./Product_Items";

const Products = () => {
  const [product, setProduct] = useState([]);
  const { totalItems, cartTotal } = useCart();

  // fetch the product here
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
      {/* {product.map((item) => (
        <ProductItems key={item.id} {...item} item={item} />
      ))} */}

      {product.map((item, id) => (
        <ProductItems key={id} {...item} item={item} />
      ))}

      <div className="footer_cart_info">
        <div className="price-component">
          {/* item count */}
          <p className="price_info">
            {totalItems > 0 ? totalItems : ""}{" "}
            {totalItems < 1 ? "Add product" : totalItems > 1 ? "ITEMS" : "ITEM"}
          </p>
          {/* total cart value */}
          {currencyFormat(cartTotal)} (plus taxes)
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
