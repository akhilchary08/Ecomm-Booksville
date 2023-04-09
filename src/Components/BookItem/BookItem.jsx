import React from "react";
import "./BookItem.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

const trimBookTitle = (title) => {
  return title.length > 24 ? title.substring(0, 24) + "..." : title;
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
        <p>{trimBookTitle(BookData.BookTitle)}</p>
        <p>₹{BookData.price}</p>
        <button
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
