import React from "react";
import { useDispatch } from "react-redux";
import { removeBook } from "../../features/cartSlice";
const CartItem = ({ cartData }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="cart-item">
        <p>{cartData.BookTitle}</p>
        <p>₹{cartData.price}</p>
        <button onClick={() => dispatch(removeBook(cartData.id))}>
          remove from cart
        </button>
      </div>
    </>
  );
};

export default CartItem;
