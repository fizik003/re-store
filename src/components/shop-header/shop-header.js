import React from "react";
import { Link } from "react-router-dom";
import "./shop-header.css";

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className="shop-header">
      <Link to="/">
        <span className="logo text-dark">Restore</span>
      </Link>
      <Link to="/cart">
        <span className="shopping-cart">
          <i className="cart-icon fa fa-shopping-cart" />
          {numItems} item (${total})
        </span>
      </Link>
    </header>
  );
};

export default ShopHeader;
