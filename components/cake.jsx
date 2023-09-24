import Image from "next/image";
import React from "react";

const cake = (props) => {
    
  return (
    <>
      <div className="card-main">
        <Image
          src={props.data.img}
          height={500}
          width={500}
          loading="lazy"
          alt="Image of cupx  cake"
          decoding="async"
          fetchPriority="high"
          className="card-img"
        />
        <h1 className="card-title">{props.data.title}</h1>
        <p className="card-desc">{props.data.desc}</p>
        <h1 className="card-price">₹ {props.data.price}</h1>
        <button className="card-btn">Add to Cart</button>
      </div>
    </>
  );
};

export default cake;
