"use client";
import Cake from "@/components/cake";
import React from "react";
import "@/Styles/menu.css";
import Data from "@/Data/data.json";
import Link from "next/link";
import { Fragment } from "react";
import { motion, useScroll,useSpring } from "framer-motion";
const Menu = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Data.map((t,i)=>{
  //   console.log(t.title);
  // })
  return (
    <>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scaleX }}
      />
      
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
      >
        <div className="links-menu">
          <span className="links-pages">
            <Link
              href="/Menu"
              className="cake-link st1"
              style={{ color: "#FF5C5C" }}
            >
              Cake
            </Link>
            <Link href="/Cupcake" className="cake-link st2">
              CupCake
            </Link>
          </span>
        </div>
        <div className="menu-main">
          {Data.map((t, i) => {
            return <Cake data={t} key={t.key} />;
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Menu;
