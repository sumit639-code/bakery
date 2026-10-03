"use client";
import React, { useState, useMemo } from "react";
import Cake from "@/components/cake";
import ProductModal from "@/components/ProductModal";
import "@/Styles/menu.css";
import Data from "@/Data/data.json";
import Link from "next/link";
import { motion } from "framer-motion";

const Menu = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCake, setSelectedCake] = useState(null);

  const filterOptions = [
    { id: "All", label: "✨ All Cakes" },
    { id: "Bestseller", label: "🔥 Bestsellers" },
    { id: "Chocolate", label: "🍫 Chocolate" },
    { id: "Fruit", label: "🍓 Fresh Fruit" },
    { id: "Classic", label: "🍰 Classics" },
    { id: "Celebration", label: "🎉 Celebration" },
    { id: "Exotic", label: "👑 Royal Fusion" },
  ];

  const filteredData = useMemo(() => {
    return Data.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedFilter === "All") return true;
      if (selectedFilter === "Bestseller") {
        return (
          (item.badge && item.badge.toLowerCase().includes("bestseller")) ||
          item.rating >= 5.0
        );
      }
      return item.category === selectedFilter;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="menu-page-wrapper">
      {/* Header Banner */}
      <div className="menu-header-banner">
        <span className="menu-pre-title">
          <span>🌿</span>
          <span>100% Pure Eggless & Baked Fresh Daily</span>
        </span>
        <h1 className="menu-main-title">Signature Cakes Menu</h1>
        <p className="menu-sub-desc">
          Pure Belgian chocolate, fresh berries, and Madagascar vanilla.
          Order online for 2-hour doorstep delivery.
        </p>
      </div>

      {/* Switcher: Cakes vs Cupcakes */}
      <div className="category-switch-bar">
        <div className="switch-pill-container">
          <Link href="/Menu" className="switch-pill active">
            <span>🎂</span>
            <span>Signature Cakes</span>
          </Link>
          <Link href="/Cupcake" className="switch-pill">
            <span>🧁</span>
            <span>Gourmet Cupcakes</span>
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="filter-search-container">
        <div className="search-input-wrapper">
          <span className="search-input-icon">🔍</span>
          <input
            type="text"
            placeholder="Search cakes by flavor or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-field"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "13px",
                color: "var(--text-subtle)",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="filter-chips-wrapper">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              className={`filter-chip ${
                selectedFilter === opt.id ? "active" : ""
              }`}
              onClick={() => setSelectedFilter(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cake Grid */}
      <motion.div layout className="cake-grid-layout">
        {filteredData.map((item) => (
          <Cake
            data={item}
            key={item.key}
            onSelect={setSelectedCake}
          />
        ))}
      </motion.div>

      {/* Animated Card Expansion Modal */}
      <ProductModal
        cake={selectedCake}
        isOpen={!!selectedCake}
        onClose={() => setSelectedCake(null)}
      />
    </div>
  );
};

export default Menu;
