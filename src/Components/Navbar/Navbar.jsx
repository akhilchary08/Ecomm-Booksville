import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";
const Navbar = () => {
  const location = useLocation();
  let pageDesc = "";
  if (location.pathname.includes("order")) {
    pageDesc = "| My Orders";
  } else if (location.pathname.includes("cart")) {
    pageDesc = "| Cart";
  } else if (location.pathname.includes("book")) {
    let title = location.pathname.split("/")[2].split("-").join(" ");
    pageDesc = `| ${title}`;
  }

  return (
    <nav className="nav-bar">
      <p>BooksVille {pageDesc}</p>
      <p>
        <Link to={"/"}>Home</Link>
      </p>
      <p>
        <Link to={"/myorders"}>Myorders</Link>
      </p>
      <p>
        <Link to={"/cart"}>Cart</Link>
      </p>
    </nav>
  );
};

export default Navbar;
