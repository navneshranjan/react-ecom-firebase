// import axios from "axios";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // fetch the product here
  useEffect(() => {
    const fetchOrders = async () => {
      // const { data } = await axios.get("http://localhost:3300/order");
      // setOrders(data.orders);

      const q = query(collection(db, "orders"), orderBy("created", "desc"));

      const fetchedOrders = await getDocs(q);
      fetchedOrders.forEach((doc) => {
        let docItem = {
          id: doc.id,
          ...doc.data(),
        };
        setOrders((item) => [...item, docItem]);
      });
    };
    fetchOrders();
  }, []);

  return (
    <>
      {/* rendering all the orders here */}
      {orders.map((item) => (
        <div key={item.id}>
          <p>{item.phone}</p>
          <ul>
            {JSON.parse(item.orderDetails).map((e) => (
              <li key={e.id}>
                {e.title} - {e.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Orders;
