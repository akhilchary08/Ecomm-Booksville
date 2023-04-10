import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import CartItem from "./CartItem";
import { clearCart } from "../../features/cartSlice";
import "./Cart.css";
const Cart = () => {
  const cartData = useSelector((state) => state);
  const dispatch = useDispatch();
  const [booksCost, setBooksCost] = useState(0);

  useEffect(() => {
    let price = 0;
    price = cartData.cart.reduce((acc, cur) => {
      acc += cur.price;
      return acc;
    }, 0);
    setBooksCost(price);
  }, [cartData]);

  const handleCheckout = () => {
    let postUrl = " http://localhost:3000/orders";
    cartData.cart.forEach((item) => {
      let id = v4().substring(0, 8);
      axios
        .post(postUrl, {
          id,
          BookId: item.id,
          status: "Delivered",
          OrderPlaced: new Date().getTime(),
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    dispatch(clearCart());
  };

  return (
    <>
      <div className="shipping-address"></div>
      <div className="cart-details">
        {cartData.cart.map((item) => {
          return <CartItem key={item.id} cartData={item} />;
        })}
      </div>

      {booksCost > 0 ? (
        <div className="payment-details">
          <h3>Payment Details</h3>
          <p>Total cost: ₹{booksCost}</p>
          <p>Tax: ₹{Math.floor(booksCost * (12 / 100))}</p>
          <p>Shipping charges: ₹80</p>
          <p>
            Total price: ₹{booksCost + Math.floor(booksCost * (12 / 100)) + 80}
          </p>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      ) : (
        <p>
          Cart is empty <Link to={"/"}>Go to home</Link>{" "}
        </p>
      )}
    </>
  );
};

export default Cart;
