"use client";
import React from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { CartState } from "@/app/state/atoms/CartState";

const Cart = ({ dta }) => {
  const [cart, setCart] = useRecoilState(CartState);

  const addCount = () => {
    setCart((prev) =>
      prev.map((item) =>
        item.key === dta.key && item.quantity < 20
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const subCount = () => {
    if (dta.quantity <= 1) {
      remove(dta.key);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.key === dta.key
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const remove = (id) => {
    setCart((prev) => prev.filter((item) => item.key !== id));
  };

  const itemTotal = dta.price * dta.quantity;

  return (
    <div className="cart-item-card" id={`cart-item-${dta.key}`}>
      <div className="cart-item-img-wrap">
        <Image
          src={dta.img}
          alt={dta.title}
          fill
          sizes="80px"
          className="cart-item-img"
        />
      </div>

      <div className="cart-item-info">
        <h4 className="cart-item-title">{dta.title}</h4>
        <span className="cart-item-subtitle">
          {dta.selectedWeight ? `${dta.selectedWeight} • ` : ""}100% Eggless
        </span>
        {dta.cakeMessage && (
          <span style={{ fontSize: "11px", color: "var(--brand-primary)", fontStyle: "italic" }}>
            "{dta.cakeMessage}"
          </span>
        )}
        <span className="cart-item-unit-price">₹{dta.price} each</span>
      </div>

      <div className="cart-item-actions">
        <div className="cart-item-total-price">₹{itemTotal}</div>

        <div className="cart-item-stepper">
          <button
            className="cart-stepper-btn"
            onClick={subCount}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span style={{ fontSize: "13px", fontWeight: "800", minWidth: "16px", textAlign: "center" }}>
            {dta.quantity}
          </span>
          <button
            className="cart-stepper-btn"
            onClick={addCount}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          className="cart-remove-btn"
          onClick={() => remove(dta.key)}
          aria-label="Remove item"
        >
          <span>🗑️</span>
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
