import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import "./BookItem.css";

const trimBookTitle = (title) => {
  return title.length > 20 ? title.substring(0, 20) + "..." : title;
};
const Pathtitle = (title) => {
  title = title.replace(/[^a-zA-Z]+/gi, "-");
  return title;
};
const BookItem = ({ BookData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let pathTitle = Pathtitle(BookData.BookTitle);
  const id = BookData.id;
  return (
    <>
      <div className="book-item">
        <Link to={`/book/${pathTitle}/${id}`}>
          <img
            src={BookData.image}
            alt={BookData.title}
            className="thumbnail"
          />
        </Link>
        <p className="book-title">{trimBookTitle(BookData.BookTitle)}</p>
        <p className="book-price">₹{BookData.price}</p>
        <button className="buynow-btn"
          onClick={() => {
            dispatch(addToCart(BookData));
            navigate("/cart");
          }}
        >
          Buy now
        </button>
      </div>
    </>
  );
};

export default BookItem;
