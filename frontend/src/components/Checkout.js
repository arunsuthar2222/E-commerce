import React from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

function Checkout() {
  return (
    <div className="checkout">
      <div className="flex flex-col md:flex-row justify-between bg-white p-4">
        <div className="p-3">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            className="checkout_ad"
            alt=""
          />

          <h2 className="border-b-[2px]  pb-2 boder-b-gray-400 text-2xl font-sans font-bold">
            {"name" ? "Hello " + "name".toUpperCase() : "Hello guest"}
            <br />
            <span className="capitalize pt-3">Your Shoping Basket</span>
          </h2>
        </div>
        <div className="p-3 w-[500px] bg-slate-100 border rounded font-sans">
          <div>
            <p>
              Subtotal ({[].length > 0 ? [].length : 0} items):{" "}
              <strong className="text-lg">&#x20b9; 500</strong>
            </p>
            <div className="py-2 mb-2">
              <input type="checkbox" id="checkbox" />
              <label className="pl-1" htmlFor="checkbox">
                This order contains a gift
              </label>
            </div>
            <Link
              to="/payment"
              className="bg-yellow-600 p-2 rounded text-white font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
      {[].length > 0 ? (
        [].map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="font-sans font-semibold text-3xl p-6">Card is empty</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
