"use client";
import { CartState } from "@/app/state/atoms/CartState";
import { motion } from "framer-motion";
// "use server"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
// const getlocalstorage = JSON.parse(localStorage.getItem('Cake'));

const cake = (props) => {
  const [cart, setCart] = useRecoilState(CartState);
  const id = props.data.key;
  // useEffect(()=>{
  //   let data = window.localStorage.getItem('cake');
  //   if (data != null ) setCart(JSON.parse(data))

  // },[])
  // useEffect(()=>{
  //   window.localStorage.setItem('Cake',JSON.stringify(cart))

  // },[cart])

  function notify() {
    toast.success(`${props.data.title} Added to the Cart`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    addtoCart();
  }

  function addtoCart() {
    if (cart.findIndex((pro) => pro.key === props.data.key) === -1) {
      setCart((prevData) => [...prevData, props.data]);
      // console.log(cart.findIndex(key=>console.log(key)))
    } else {
      console.log(cart.findIndex((key) => console.log(key.key)));
      setCart((prevData) => {
        return prevData.map((Item) => {
          return Item.key === props.data.key
            ? { ...Item, quantity: Item.quantity + 1 }
            : Item;
        });
      });
    }
  }

  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
          delay:Math.random()*0.5,
          scale: {
            type: "spring",
            damping: 6,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
        
        viewport={{ once: true,amount: 0.2 }}
      >
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
          <h1 className="card-price">
            ₹ {props.data.price}
            {props.pc}
          </h1>
          <button className="card-btn" onClick={notify}>
            Add to Cart
          </button>
        </div>
      </motion.div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        // pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default cake;
