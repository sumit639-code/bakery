import Image from "next/image";
import React from "react";

const cart = () => {
  return (
    <>
      <div className="cartitem">
        <Image
          src="/icons/cart.svg"
          width={20}
          height={20}
          className="cartimg"
        />
        <span className="cartinfo">
          <span className="carttitle">title cake</span>
          <span className="cartdesc">about the cake and the topping</span>
        </span>
        <div className="quantity">
          Quantity
          <span className="qntybtn">
            <button>-</button>1<button>+</button>
          </span>
        </div>
        <div className="price">
          <span className="pri">300</span>
          <button>remove</button>
        </div>
      </div>
    </>
  );
};

export default cart;
