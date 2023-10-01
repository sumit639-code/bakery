"use client";
import { CartState } from "@/app/state/atoms/CartState";
// "use server"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";

const cake = (props) => {
  const [cart,setCart]= useRecoilState(CartState);
  const id = props.data.key;
  function notify() {
    toast.success(`Chotu ek ${props.data.title} pack kr`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    addtoCart();
  }

  function addtoCart(){
    setCart(prev=>[...prev,props.data])
    console.log(cart);
  }

  
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
        <h1 className="card-title">
          <Link href={`/${props.data.key}`} className="link">
            {props.data.title}
          </Link>
        </h1>
        <p className="card-desc">{props.data.desc}</p>
        <h1 className="card-price">₹ {props.data.price}</h1>
        <button className="card-btn" onClick={notify}>
          Add to Cart
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default cake;
