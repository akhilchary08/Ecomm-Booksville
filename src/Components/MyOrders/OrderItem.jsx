import React from "react";
import "./MyOrders.css";
const OrderItem = ({ order }) => {
  let orderDate = new Date(Number(order["OrderPlaced"]));
  orderDate = orderDate.toLocaleDateString();
  return (
    <div className="order-item">
      <div className="date-status">
        <p className="ordered-date">Order Placed : {orderDate}</p>
        <p>Status:{order["status"]}</p>
      </div>
      <div className="book-info">
        <div className="book-image">
          <img src={order.image} alt="" />
        </div>
        <div className="book-details">
          <p>Title: {order["BookTitle"]}</p>
          <p>Author: {order["author"]}</p>
          <p>Price: ₹{order["price"]}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
