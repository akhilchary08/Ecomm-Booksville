import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

const MyOrders = () => {
  let [orderData, setOrderData] = useState([]);

  useEffect(() => {
    let idString = "";

    async function fetchOrders() {
      let orders = await axios.get("http://localhost:3000/orders");
      let bookIdsMap = new Map();
      let bookIds = orders.data.map((item) => {
        if (bookIdsMap.has(item.BookId)) {
          bookIdsMap
            .get(item.BookId)
            .push({ id: item.id, OrderPlaced: item.OrderPlaced });
        } else {
          bookIdsMap.set(item.BookId, [
            { id: item.id, OrderPlaced: item.OrderPlaced },
          ]);
        }
        return item.BookId;
      });
      for (let i = 0; i < bookIds.length; i++) {
        idString += `id=${bookIds[i]}&`;
      }
      idString = idString.substring(0, idString.length - 1);
      let books = await axios.get(`http://localhost:3000/Books?${idString}`);
      orders = orders.data;
      books = books.data;
      let ordersArray = [];
      for (let i = 0; i < books.length; i++) {
        let cnt = bookIdsMap.get(books[i]["id"]).length;
        while (cnt-- > 0) {
          ordersArray.push({
            id: bookIdsMap.get(books[i]["id"])[cnt].id,
            BookTitle: books[i]["BookTitle"],
            author: books[i]["author"],
            price: books[i]["price"],
            image: books[i]["image"],
            status: orders[i]["status"],
            OrderPlaced: bookIdsMap.get(books[i]["id"])[cnt].OrderPlaced,
          });
        }
      }
      ordersArray.sort((a, b) => b.OrderPlaced - a.OrderPlaced);
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
