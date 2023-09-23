import Link from "next/link";
import React from "react";
import "@/Styles/header.css";

const header = () => {
  return (
    <>
      <div className="header">
        <h1 className="title">
          <Link href="/" className="link_dec link">
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
      </div>
    </>
  );
};
export default header;
