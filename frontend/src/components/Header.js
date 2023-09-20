import React, { useState } from "react";
import "./header.css";
import { FiSearch } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      navigate(`/products/${text}`);
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="banner"
        />
      </Link>

      <form onSubmit={handleSubmit} className="header_search">
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="header_searchInput"
          value={text}
        />
        <FiSearch className="header_searchIcon" />
      </form>

      <div className="header_nav">
        <Link to={"name" && "/login"} className="header_link">
          <div className="header_option">
            <span>Hello</span>
            <span>{"name" ? "Log Out" : "Sign In"}</span>
          </div>
        </Link>

        <Link to="/" className="header_link">
          <div className="header_option">
            <span>Returns</span>
            <span>&Orders</span>
          </div>
        </Link>

        <Link to="/" className="header_link">
          <div className="header_option">
            <span>Your</span>
            <span>Prime</span>
          </div>
        </Link>

        <Link to="/checkout" className="header_link">
          <div className="last_option">
            <BsCart2 className="cart" />
            <span className="cart_item">{[].length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
