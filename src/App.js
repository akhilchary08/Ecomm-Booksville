import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import MyOrders from "./Components/MyOrders/MyOrders";
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Components/Cart/Cart";
import Book from "./Components/Book/Book";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/myorders" element={<MyOrders />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/book/:title/:id" element={<Book />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
