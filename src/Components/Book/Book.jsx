import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeBook } from "../../features/cartSlice";
import "./Book.css";

const Book = () => {
  const cartData = useSelector((state) => state);
  const [bookData, setBookData] = useState([]);
  const [displayAddToCart, setDisplayAddToCart] = useState({
    display: "block",
  });
  const [displayRemoveFromCart, setDisplayRemoveFromCart] = useState({
    display: "none",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let id = pathname.split("/")[3];
  useEffect(() => {
    const fetchBookData = async () => {
      let book = await axios.get("http://localhost:3000/Books/" + id);
      setBookData(book.data);
    };
    fetchBookData();
  }, [id]);

  const changeBtnDisplay = useCallback(() => {
    let flag = 0;
    for (let idx = 0; idx < cartData.cart.length; idx++) {
      if (bookData.id === cartData.cart[idx].id) {
        setDisplayAddToCart({ display: "none" });
        setDisplayRemoveFromCart({ display: "block" });
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      setDisplayAddToCart({ display: "block" });
      setDisplayRemoveFromCart({ display: "none" });
    }
  }, [bookData, cartData]);

  useEffect(() => {
    changeBtnDisplay();
  }, [changeBtnDisplay]);

  return (
    <>
      {bookData.length === 0 ? (
        <img src="/Spinner-1s-200px.gif" className="spinner-loader" alt="" />
      ) : (
        <div className="book-all-details">
          <img src={bookData.image} alt="" className="book-image" />
          <div className="book-details">
            <p className="title"> {bookData.BookTitle}</p>
            <p className="author book-text">
              Author - <span>{bookData.author}</span>{" "}
            </p>
            <p className="price book-text">
              price - <span>₹{bookData.price}</span>{" "}
            </p>
            <p className="page-count book-text">
              Page count - <span>{bookData.PageCount}</span>{" "}
            </p>
            <div className="addToCart-BuyNow">
              <button
                style={displayAddToCart}
                onClick={() => {
                  dispatch(addToCart(bookData));
                  changeBtnDisplay();
                }}
                className="add-to-cart"
              >
                Add to Cart
              </button>
              <button
                style={displayRemoveFromCart}
                className="add-to-cart remove-from-cart"
                onClick={() => {
                  dispatch(removeBook(bookData.id));
                  changeBtnDisplay();
                }}
              >
                remove from cart
              </button>
              <button
                className="buy-now"
                onClick={() => {
                  dispatch(addToCart(bookData));
                  navigate("/cart");
                }}
              >
                Buy Now
              </button>
            </div>

            <p className="desc book-text">
              Description: <span>{bookData.Description}</span>{" "}
            </p>
            {/* <p className="isdn">ISDN: {bookData.ISBN}</p> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Book;
