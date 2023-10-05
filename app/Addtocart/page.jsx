"use client";
import React, { useEffect, useState } from "react";
import "@/Styles/cart.css";
import Cart from "@/components/Cart";
import { useRecoilValue } from "recoil";
import { CartState } from "../state/atoms/CartState";
import Link from "next/link";

const page = () => {
  const cartval = useRecoilValue(CartState);
  const [total, settotal] = useState(0);
  useEffect(() => {
    totalpricce();
  });

  function totalpricce() {
    let tl = 0;
    cartval.map((pov) => {
      tl = tl + pov.price * pov.quantity;
    });
    settotal(tl);
  }


  function textWp(item){
    return [item.title,' x ',item.quantity].join("")
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
        <Link
          href={`https://api.whatsapp.com/send?phone=91123456789&text=Hello%20i%20want%20to%20buy%20${cartval.map(textWp)}%20,All%20total%20price%20is%20₹${total}`}
          target="blank"
        >
          <button className="cartbuy">
            Buy now
          </button>
        </Link>
      </>
    );
  };
  return (
    <>
      <div className="maincart">
        {cartval.length == 0 ? (
          <>
            <p className="addanim">add something to the cart</p>
            <div className="noth">nothing is available here</div>
          </>
        ) : (
          <Main />
        )}
      </div>
    </>
  );
};

export default page;
