"use client";
import { CartState } from "@/app/state/atoms/CartState";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";

const cart = (props) => {
  const [carval, setCarval] = useRecoilState(CartState);
  function addcount() {
    setCarval((prevData) => {
      return prevData.map((Item) => {
        
        return Item.key === props.dta.key && Item.quantity<20
          ? {...Item, quantity: Item.quantity + 1 }
          : Item;
      });
    });
    console.log(carval)
  }
  function subcount() {
    setCarval((prevData) => {
      return prevData.map((Item) => {
        return Item.key === props.dta.key && Item.quantity>1
          ? { ...Item, quantity: Item.quantity - 1 }
          : Item;
      });
    });
  }
  function remove(id) {
    let result = carval.filter((pov) => pov.key !== id);

    setCarval(result);
  }
  return (
    <>
      <div className="cartitem" id={props.dta.key}>
        <Image
          src={props.dta.img}
          width={500}
          height={500}
          className="cartimg-2"
          alt="Image of the product"
        />
        <span className="cartinfo">
          <span className="carttitle">{props.dta.title}</span>
          <span className="cartdesc">{props.dta.desc}</span>
        </span>
        <div className="quantity">
          Quantity
          <span className="qntybtn">
            <button onClick={subcount}>-</button>
            {props.dta.quantity}
            <button onClick={addcount}>+</button>
          </span>
        </div>
        <div className="price">
          <span className="pri">₹ {props.dta.price}</span>
          <button onClick={() => remove(props.dta.key)}>
            <Image
              src="/icons/recyclebin.png"
              width={20}
              height={20}
              className="pri-img"
              alt="image of the remove icon"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default cart;
