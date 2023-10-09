"use client";
import Link from "next/link";
import React from "react";
import "@/Styles/about.css";
import { motion, useScroll, useSpring } from "framer-motion";

const page = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX: scaleX }} />

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
          duration: 0.6,
          ease: [0, 0.71, 0.2, 1.01],
          delay:0.4,
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
        viewport={{ once: true }}
      >
        <div className="mainabt">
          
          <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
          duration: 0.6,
          ease: [0, 0.71, 0.2, 1.01],
          delay:0.05,
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
        viewport={{ once: true }}
      ><div className="titlemain">
            <div className="tit">About Lilly's Bakery</div>

            <div className="descabt">
              Welcome to Lilly's Bakery, where our passion for baking meets your
              love for delightful treats. Established in 2020, we have been
              serving our community with the finest, handcrafted baked goods for
              3 years
            </div>
          </div></motion.div>
          <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
          duration:1,
          ease: [0, 0.71, 0.2, 1.01],
          delay:0.4,
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
        viewport={{ once: true }}
      ><div className="titlemain">
            <div className="tit">Our Story</div>

            <div className="descabt">
              It all began with a dream and a pinch of flour. [Your Name], the
              founder of [Your Bakery's Name], started this journey with a
              simple desire to share the joy of freshly baked goods with the
              world. With a lifelong passion for baking and a dedication to
              quality, [Your Name] set out to create a bakery that would become
              a cornerstone of our community. Over the years, we've grown from a
              small, cozy kitchen to a beloved neighborhood bakery, but our
              commitment to excellence and the art of baking has never wavered.
              Every day, our skilled bakers pour their hearts into crafting each
              pastry, bread, and dessert, ensuring that every bite is a taste of
              perfection.
            </div>
          </div></motion.div>
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
          delay:0.4,
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
        viewport={{ once: true }}
      ><div className="titlemain">
            <div className="tit">Our Philosophy</div>

            <div className="descabt">
              At [Your Bakery's Name], we believe that baking is not just a
              craft; it's an art form. We meticulously source the finest
              ingredients, from the creamiest butter to the richest chocolate,
              to create our mouthwatering creations. We pride ourselves on our
              dedication to using locally sourced, organic ingredients whenever
              possible, supporting both our local farmers and our commitment to
              sustainability. Our team of bakers is as diverse as our selection
              of pastries. With years of experience and a shared love for
              baking, they bring their unique talents and creativity to the
              kitchen, resulting in a menu that boasts both traditional
              favorites and innovative new flavors.
            </div>
          </div></motion.div>
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
          delay:0.4,
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
        viewport={{ once: true }}
      ><div className="titlemain">
            <div className="tit">Visit Us</div>

            <div className="descabt">
              We invite you to visit our bakery and experience the warmth and
              aroma that fill the air. Whether you're looking for a sweet
              indulgence, a fresh loaf of bread, or a special cake for a
              celebration, we have something to satisfy your every craving.
              Thank you for being a part of our journey. We look forward to
              serving you and creating sweet memories for many years to come.
              [Contact Information and Location] [Social Media Links]
            </div>
          </div></motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default page;
