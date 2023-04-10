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
      <div className="logo">BooksVille {pageDesc}</div>
      <input type="checkbox" id="checkbox_toggle" />
      <label for="checkbox_toggle" class="hamburger">
        &#9776;
      </label>
      <div className="menu">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/myorders"}>Myorders</Link>
        </li>
        <li>
          <Link to={"/cart"}>Cart</Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
