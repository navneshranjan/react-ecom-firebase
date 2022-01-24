import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/index";

const Products = () => {
  const [product, setProduct] = useState([]);

  // Fetch the product....
  useEffect(() => {
    const fetchProduct = async () => {
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
    <div>
      <h1>Products</h1>
    </div>
  );
};

export default Products;
