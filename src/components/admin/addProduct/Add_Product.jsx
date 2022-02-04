import React from "react";
import "./Add_product.css";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function Add_Product() {
  // add products to firestore
  const addProduct = async () => {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: name,
        image: image,
        price: parseInt(price),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="add_product">
      <br />
      <input id="name" type="text" placeholder="name" />
      <input id="price" type="number" placeholder="price" />
      <input id="image" type="text" placeholder="image url" />
      <button onClick={addProduct}>upload</button>
    </div>
  );
}

export default Add_Product;
