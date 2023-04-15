import React, { useState } from "react";
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
  const [active, setActive] = useState(true);

  const setState = () => {
    setActive(!active);
  };
  return (
    <nav className="nav-bar">
      <div className="logo">
        <p>BooksVille <span className="page-info">{pageDesc}</span> </p>
        <div className="hamburger-cross">
          <span
            className="cross"
            onClick={setState}
            style={{ display: active ? "none" : "block" }}
          >
            &#x58;
          </span>
          <span
            className="hamburger"
            onClick={setState}
            style={{ display: !active ? "none" : "block" }}
          >
            &#9776;
          </span>
        </div>
      </div>
      <ul className="menu" style={{ display: !active ? "block" : "none" }}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/myorders"}>Myorders</Link>
        </li>
        <li>
          <Link to={"/cart"}>Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
