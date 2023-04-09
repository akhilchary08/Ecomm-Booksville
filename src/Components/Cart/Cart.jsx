import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import "./Cart.css";
const Cart = () => {
  const cartData = useSelector((state) => state);
  const [booksCost, setBooksCost] = useState(0);
  useEffect(() => {
    let price = 0;
    price = cartData.cart.reduce((acc, cur) => {
      acc += cur.price;
      return acc;
    }, 0);
    setBooksCost(price);
  }, [cartData]);
  return (
    <>
      <div className="shipping-address"></div>
      <div className="cart-details">
        {cartData.cart.map((item) => {
          return <CartItem key={item.id} cartData={item} />;
        })}
      </div>
      <div className="payment-details">
        <p>Pura books pe karcha</p>
        <p>{booksCost}</p>
      </div>
    </>
  );
};

export default Cart;
