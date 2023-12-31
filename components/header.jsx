"use client";
import Link from "next/link";
import React, { useState } from "react";
import "@/Styles/header.css";
import Image from "next/image";
import { Fragment } from "react"
import { useRecoilValue } from "recoil";
import { CartState } from "@/app/state/atoms/CartState";
// import logo-pc from '/images/menu.png';
const header = () => {
  const cartCount = useRecoilValue(CartState)
  // const [items, setItems] = useState(cartCount.length)
  const [nav, setNav] = useState(false);

  function out() {
    setTimeout(() => {
      setNav(false);
    }, 150);
  }
  return (
    <>
      <div className="header">
        <h1 className="title">
          <Link href="/" className="link_dec link" onClick={out}>
            {" "}
            LB
          </Link>
        </h1>
        <div className="nav">
          <Link href="/" className="link nav-tile">
            Home
          </Link>
          <Link href="/Menu" className="link nav-tile">
            Menu
          </Link>
          <Link href="/About" className="link nav-tile">
            About
          </Link>
        </div>
        <div
          className="menu-icon"
          onClick={() => {
            setNav(!nav);
          }}
        >
          <Image src="/icons/menu.png" height={40} width={40} alt="menu icon" />
        </div>
        <div className="cartimg">
          <Link href="/Addtocart" className="cartlink">
            <span className="cartitemnum">{cartCount.length}</span>
            <Image
              src="/icons/cart.svg"
              height={40}
              width={40}
              alt="cart icon"
            />
          </Link>
        </div>
      </div>
      {nav ? (
        <div className="menu-mob">
          <Link href="/" className="link menu-tile" onClick={out}>
            Home
          </Link>
          <Link href="/Menu" className="link menu-tile" onClick={out}>
            Menu
          </Link>
          <Link href="/About" className="link menu-tile" onClick={out}>
            About
          </Link>
        </div>
      ) : (
        <div
          className="menu-mob"
          style={{
            transform: "translateX(110%)",
            opacity: "0",
            display: "none",
          }}
        >
          <Link href="/" className="link menu-tile" onClick={out}>
            Home
          </Link>
          <Link href="/Menu" className="link menu-tile" onClick={out}>
            Menu
          </Link>
          <Link href="/About" className="link menu-tile" onClick={out}>
            About
          </Link>
        </div>
      )}
    </>
  );
};
export default header;
