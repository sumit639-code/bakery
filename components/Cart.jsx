import Image from "next/image";
import React, { useState } from "react";

const cart = (props) => {
  const [count, setcount] = useState(1);
  function addcount() {
    if (count >= 9) {
      setcount(10);
    } else {
      setcount(count + 1);
    }
  }
  function subcount() {
    if (count <= 1) {
      setcount(1);
    } else {
      setcount(count - 1);
    }
  }
  // console.log(props)
  return (
    <>
      <div className="cartitem" id={props.key}>
        <Image src={props.dta.img} width={20} height={20} className="cartimg" />
        <span className="cartinfo">
          <span className="carttitle">{props.dta.title}</span>
          <span className="cartdesc">{props.dta.desc}</span>
        </span>
        <div className="quantity">
          Quantity
          <span className="qntybtn">
            <button onClick={subcount}>-</button>
            {count}
            <button onClick={addcount}>+</button>
          </span>
        </div>
        <div className="price">
          <span className="pri">{props.dta.price}</span>
          <button>remove</button>
        </div>
      </div>
    </>
  );
};

export default cart;
