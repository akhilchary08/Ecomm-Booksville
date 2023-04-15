import React from "react";
import { useDispatch } from "react-redux";
import { removeBook } from "../../features/cartSlice";
const CartItem = ({ cartData }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="cart-item">
        <p className="cart-item__title">{cartData.BookTitle}</p>
        <p> Price - ₹{cartData.price}</p>
        <button onClick={() => dispatch(removeBook(cartData.id))}>
          Remove From Cart
        </button>
      </div>
    </>
  );
};

export default CartItem;
