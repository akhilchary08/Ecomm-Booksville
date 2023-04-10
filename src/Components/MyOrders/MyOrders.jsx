import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

const MyOrders = () => {
  let [orderData, setOrderData] = useState([]);

  useEffect(() => {
    let idString = "";

    async function fetchOrders() {
      let orders = await axios.get("http://localhost:3000/orders");
      let bookIds = orders.data.map((item) => item.BookId);
      for (let i = 0; i < bookIds.length; i++) {
        idString += `id=${bookIds[i]}&`;
      }
      idString = idString.substring(0, idString.length - 1);
      let books = await axios.get(`http://localhost:3000/Books?${idString}`);
      orders = orders.data;
      books = books.data;
      let ordersArray = [];
      for (let i = 0; i < books.length; i++) {
        ordersArray.push({
          id: books[i]["id"],
          BookTitle: books[i]["BookTitle"],
          author: books[i]["author"],
          price: books[i]["price"],
          image: books[i]["image"],
          status: orders[i]["status"],
          OrderPlaced: orders[i]["OrderPlaced"],
        });
      }
      setOrderData(ordersArray);
    }

    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      {orderData.map((item) => (
        <OrderItem order={item} key={item.id} />
      ))}
    </div>
  );
};

export default MyOrders;

// let books = await axios.get(`http://localhost:3000/Books?${idString}`);
//       orders=orders.data;
//       books = books.data;
//       console.log(books,orders);
//       for (let i = 0; i < books.length; i++) {
//         setOrderData([
//           ...orderData,
//           {
//             id: books.id,
//             BookTitle: books["BookTitle"],
//             author: books["author"],
//             price: books["price"],
//             image: books["image"],
//             status: orders["status"],
//             OrderPlaced: orders["OrderPlaced"],
//           },
//         ]);
//       }
//       console.log(orderData)
