"use client";
import React, { useState } from "react";
import Data from "@/Data/data.json";
import "@/Styles/dyn-route.css";
import Image from "next/image";

const page = ({ params }) => {
  const [count, setcount] = useState(1);
  const id = params.id;
  const dyndata = Data[id];
  return (
    <>
      <div className="main-dyn">
        <Image
          src={dyndata.img}
          width={500}
          height={500}
          loading="lazy"
          alt="Image of cake"
          decoding="async"
          fetchPriority="high"
          className="img-dyn"
        />
        <div className="text-dyn">
          <h1 className="title-dyn">{dyndata.title}</h1>
          <span className="desc-dyn">{dyndata.desc}</span>
          <span className="price-dyn">₹ {dyndata.price}</span>
          <div className="cnt">
            <button
              onClick={() => {
                if (count <= 0) {
                  setcount(0);
                } else {
                  setcount(count - 1);
                }
              }}
            >
              -
            </button>
            <span className="cnt-text">{count}</span>
            <button
              onClick={() => {
                if (count >= 9) {
                  setcount(count);
                } else {
                  setcount(count + 1);
                }
              }}
            >
              +
            </button>
          </div>
          <button className="buy-dyn">Buy now</button>
        </div>
      </div>
    </>
  );
};

export default page;
