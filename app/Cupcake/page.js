"use client";
import React, { useState } from "react";
import Cake from "@/components/cake";
import ProductModal from "@/components/ProductModal";
import "@/Styles/menu.css";
import Data from "@/Data/data2.json";
import Link from "next/link";
import { motion } from "framer-motion";

const CupcakePage = () => {
  const [selectedCupcake, setSelectedCupcake] = useState(null);

  return (
    <div className="menu-page-wrapper">
      {/* Header Banner */}
      <div className="menu-header-banner">
        <span className="menu-pre-title">
          <span>🧁</span>
          <span>Bite-Sized Indulgence • 100% Eggless</span>
        </span>
        <h1 className="menu-main-title">Gourmet Cupcakes</h1>
        <p className="menu-sub-desc">
          Single-portion sweetness crafted with whipped buttercream and molten ganache swirls.
          Complimentary gift box packaging on 6+ cupcakes!
        </p>
      </div>

      {/* Switcher: Cakes vs Cupcakes */}
      <div className="category-switch-bar">
        <div className="switch-pill-container">
          <Link href="/Menu" className="switch-pill">
            <span>🎂</span>
            <span>Signature Cakes</span>
          </Link>
          <Link href="/Cupcake" className="switch-pill active">
            <span>🧁</span>
            <span>Gourmet Cupcakes</span>
          </Link>
        </div>
      </div>

      {/* Cupcake Grid */}
      <motion.div
        layout
        className="cake-grid-layout"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {Data.map((cupcake) => {
          return (
            <Cake
              data={cupcake}
              key={cupcake.key}
              pc="/pc"
              onSelect={setSelectedCupcake}
            />
          );
        })}
      </motion.div>

      {/* Animated Card Expansion Modal */}
      <ProductModal
        cake={selectedCupcake}
        isOpen={!!selectedCupcake}
        onClose={() => setSelectedCupcake(null)}
      />
    </div>
  );
};

export default CupcakePage;
