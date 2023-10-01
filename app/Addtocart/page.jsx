import React from "react";
import "@/Styles/cart.css";
import Cart from "@/components/cart";

const page = () => {
  return (
    <>
      <div className="maincart">
        <Cart />
        <Cart />
        
        <hr />
        <div className="total">Total:</div>
        <button>Buy now</button>
      </div>
    </>
  );
};

export default page;
