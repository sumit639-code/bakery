"use client";
import React, { useEffect, useState } from "react";
import "@/Styles/cart.css";
import Cart from "@/components/Cart";
import { useRecoilValue } from "recoil";
import { CartState } from "../state/atoms/CartState";

const page = () => {
  const cartval = useRecoilValue(CartState);
  const [total, settotal] = useState(0);
  useEffect(() => {
    totalpricce()
  })
  
  function totalpricce(){
    let tl=0
    cartval.map(pov=>{
      tl = tl+ pov.price*pov.quantity;
    })
    settotal(tl)
  }
  function show() {
    console.log(cartval);
    totalpricce()
  }
  const Main = () => {
    return (
      <>
        {cartval.map((val) => {
          return <Cart dta={val} key={val.key} />;
        })}
        {/* <Cart dta={cartval[0]} key={cartval[0].id} /> */}

        <hr />
        <div className="total">Total: ₹{total}</div>
        <button onClick={show} className="cartbuy">
          Buy now
        </button>
      </>
    );
  };
  return (
    <>
      <div className="maincart">
        {cartval.length == 0 ? (
          <><p className="addanim">add something to the cart</p>
          <div className="noth">
            nothing is available here
          </div></>
        ) : (
          <Main />
        )}
      </div>
    </>
  );
};

export default page;
