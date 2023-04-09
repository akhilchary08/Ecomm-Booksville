import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import './Book.css';

const Book = () => {
  const [bookData, setBookData] = useState([]);
  const dispatch=useDispatch();
  const { pathname } = useLocation();
  let id = pathname.split("/")[3];
  useEffect(() => {
     const fetchBookData=async()=>{
        let book=await axios.get('http://localhost:3000/Books/'+id);
        // book=book.data;
        setBookData(book.data)
    }
    fetchBookData()
  },[id]);
  return (
    <>
      <div className="book-all-details">
        <img src={bookData.image} alt="" />
        <p>title: {bookData.BookTitle}</p>
        <p>author: {bookData.author}</p>
        <p>price: ₹{bookData.price}</p>
        <p>Page count: {bookData.PageCount} </p>
        <p>Description: {bookData.Description}</p>
        <p>ISDN: {bookData.ISBN}</p>
        <button onClick={()=>dispatch(addToCart(bookData))}>Add to Cart</button>
        <button>Buy Now</button>
      </div>
    </>
  );
};

export default Book;
