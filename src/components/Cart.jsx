import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { db } from "../firebase";
import currencyFormat from "../helper/currencyFormat";

const Cart = () => {
  // const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const { isEmpty, items, updateItemQuantity, cartTotal, emptyCart } =
    useCart();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // check if phone is valid or not
      if (data.phone && data.phone.length !== 10) return alert("Invalid phone");

      // make a post request to the API and on success, clear the cart and redirect to homepage
      const config = {
        phone: data.phone,
        orderDetails: JSON.stringify(items),
        created: Timestamp.now(),
      };

      const newOrderRef = await addDoc(collection(db, "orders"), config);

      if (newOrderRef.id) {
        emptyCart();
        return;
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  if (isEmpty) {
    return (
      <div className="empty_cart">
        <p>
          Your cart is empty. Go back to <Link to="/">Home</Link> or view all{" "}
          <Link to="/orders">Orders</Link>
        </p>
      </div>
    );
  }

  // const phoneSubmit = async () => {};

  return (
    <div className="cart_page">
      <div className="cart_page_heading">Checkout</div>
      <div className="order_items_details">
        {items.map((item) => (
          <div className="order_items" key={item.id}>
            <div className="order_item_details">
              <p className="order_item_title">{item.name}</p>
              <span>{currencyFormat(item.price)}</span>
            </div>

            <div className="btn_total_group">
              {/* Button for decreasing the quantity */}
              <div className="quantity_btn_group">
                <button
                  id="quantity_btn_decrease"
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                {item.quantity}
                {/* Button for increasing the quantity */}
                <button
                  id="quantity_btn_increase"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <span>{currencyFormat(item.quantity * item.price)}</span>
            </div>
          </div>
        ))}
        <div className="cart_total_group">
          <p>Cart Total ₹{cartTotal}/- </p>
          <button className="empty_cart_btn" onClick={emptyCart}>
            Empty Cart
          </button>
        </div>
      </div>

      <div className="place_order">
        <button className="btn_place_order" onClick={() => setViewModal(true)}>
          Place Order
        </button>
      </div>

      {/* div for phone number input */}

      {viewModal ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_group">
            <p className="input_label">Please enter Phone number</p>
            <input
              {...register("phone")}
              className="input"
              type="text"
              id="phone"
            />
            <button className="submit_phone_number">Submit</button>
            <button onClick={() => setViewModal(false)} className="link">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
