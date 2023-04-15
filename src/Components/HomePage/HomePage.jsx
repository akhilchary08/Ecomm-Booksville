import React, { useEffect, useState } from "react";
import axios from "axios";
import BookItem from "../BookItem/BookItem";
import "./HomePage.css";

const HomePage = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    console.log("first");
    axios
      .get("http://localhost:3000/Books")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {data.length === 0 ? (
        <img
          src="/Spinner-1s-200px.gif"
          className="spinner-loader"
          alt=""
        />
      ) : (
        <div className="book-main">
          {data.map((item) => (
            <BookItem key={item.id} BookData={item} />
          ))}
        </div>
      )}


    </>
  );
};

export default HomePage;
