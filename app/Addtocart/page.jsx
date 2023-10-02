"use client";
import React from "react";
import "@/Styles/cart.css";
import Cart from "@/components/Cart";
import { useRecoilValue } from "recoil";
import { CartState } from "../state/atoms/CartState";

const page = () => {
  const cartval = useRecoilValue(CartState);
  function show() {
    console.log(cartval);
  }
  return (
    <>
      <div className="maincart">
        {cartval.map((val)=>{
          
          return <Cart dta={val} key={val.key} />

        })}
        {/* <Cart dta={cartval[0]} key={cartval[0].id} /> */}

        <hr />
        <div className="total">Total:</div>
        <button onClick={show} className="cartbuy">Buy now</button>
      </div>
    </>
  );
};

export default page;
