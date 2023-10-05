"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const landing = () => {
  // const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);
  // addEventListener("resize", () => {
  //   setWidth(window.innerWidth);
  //   setHeight(window.innerHeight);
  // });
  // const [first, setfirst] = useState(second)
  return (
    <>
      <div className="img">
        <div className="text-title">
          Hello Everyone!
          <Link href="/Menu" className="btn-link">
            <button className="btn">Menu</button>
          </Link>
        </div>
        <Image
          src="/images/land.jpg"
          width={1000}
          height={1000}
          alt="Image of cake"
          className="img-styl"
          // fill
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="img-2">
        <div className="img2-text">
          <div className="text-made">
            <h1>HomeMade</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              numquam quae alias aliquid voluptatum possimus, eveniet in.
            </p>
          </div>
          <div className="text-made">
            <h1>Veg</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </div>
          <div className="text-made">
            <h1>Tasty</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              numquam quae alias aliquid voluptatum possimus, eveniet in.
            </p>
          </div>
        </div>

        <Image
          src="/images/land2.jpg"
          width={1000}
          height={1000}
          alt="Image of cupx  cake"
          className="img-styl"
        />
      </div>
    </>
  );
};

export default landing;
