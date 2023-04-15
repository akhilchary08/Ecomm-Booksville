import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import CartItem from "./CartItem";
import { clearCart } from "../../features/cartSlice";
import "./Cart.css";
import { saveAddress } from "../../features/addressSlice";

const Cart = () => {
  const cartData = useSelector((state) => state).cart;
  const addressData = useSelector((state) => state).address;
  const dispatch = useDispatch();
  const [booksCost, setBooksCost] = useState(0);
  const addressBtnRef = useRef(null);

  useEffect(() => {
    let price = 0;
    price = cartData.reduce((acc, cur) => {
      acc += cur.price;
      return acc;
    }, 0);
    setBooksCost(price);
  }, [cartData]);

  const handleCheckout = () => {
    addressBtnRef.current.click();
    if (street === "" || state === "" || city === "" || pincode === "") {
      return;
    }
    let postUrl = " http://localhost:3000/orders";
    let x;

    let arr = [];
    for (let idx = 0; idx < cartData.length; idx++) {
      let id = v4().substring(0, 8);
      x = axios
        .post(postUrl, {
          id,
          BookId: cartData[idx].id,
          status: "Delivered",
          OrderPlaced: new Date().getTime().toString(),
        })
        .then((res) => {
          return "success";
        })
        .catch((err) => {
          throw err;
        });
      arr.push(x);
    }
    Promise.all(arr)
      .then((res) => {
        dispatch(clearCart());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    setStreet(addressData.street);
    setState(addressData.state);
    setCity(addressData.city);
    setPincode(addressData.pincode);
  }, [addressData]);

  const handleSubmit = (e) => {
    // console.log(e,"event")
    e.preventDefault();
    dispatch(saveAddress({ street, city, state, pincode }));
  };

  return (
    <>
      <div className="address-cart">
        <div className="shipping-address">
          <form onSubmit={handleSubmit} className="address-form">
            <h3>Shipping Address</h3>
            <label>
              Street:
              <input
                type="text"
                required={true}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                required={true}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label>
              State:
              <input
                type="text"
                required={true}
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
            <label>
              Pincode:
              <input
                type="number"
                required={true}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </label>
            <button
              ref={addressBtnRef}
              className="save-address-btn"
              type="submit"
            >
              Save Address
            </button>
          </form>
        </div>

        {cartData.length > 0 && (
          <div className="shopping-cart">
            <div className="cart-details">
              <h3>Shopping Cart</h3>
              {cartData.map((item) => {
                return <CartItem key={item.id} cartData={item} />;
              })}
            </div>
          </div>
        )}

        {booksCost > 0 ? (
          <div className="payment-details">
            <div className="payment-div">
              <h3>Payment Details</h3>
              <p className="payment-text">
                Total cost: <span> ₹{booksCost}</span>
              </p>
              <p className="payment-text">
                Tax: <span>₹{Math.floor(booksCost * (12 / 100))}</span>{" "}
              </p>
              <p className="payment-text">
                Shipping charges: <span> ₹80</span>
              </p>
              <p className="payment-text">
                Total price:
                <span>
                  ₹{booksCost + Math.floor(booksCost * (12 / 100)) + 80}
                </span>
              </p>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="cart-empty">
            Cart is empty <Link to={"/"}>Go to home</Link>{" "}
          </p>
        )}
      </div>
    </>
  );
};

export default Cart;
