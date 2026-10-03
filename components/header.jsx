"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartState } from "@/app/state/atoms/CartState";
import { CategoryState } from "@/app/state/atoms/CategoryState";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import "@/Styles/header.css";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const cart = useRecoilValue(CartState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(CategoryState);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleCategoryNav = (cat) => {
    setSelectedCategory(cat);
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push("/");
    } else {
      const el = document.getElementById("cakes-catalog-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />

      <header className="header-wrapper">
        <div className="header-container">
          {/* Brand Logo */}
          <Link href="/" className="brand-link" onClick={() => handleCategoryNav("All")}>
            <div className="brand-icon-box">
              <span>🧁</span>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name">Lilly's Bakery</span>
              <span className="brand-tagline">+91 7008198415</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <button
              onClick={() => handleCategoryNav("All")}
              className={`nav-item ${pathname === "/" && selectedCategory === "All" ? "active" : ""
                }`}
            >
              Home
            </button>
            <button
              onClick={() => handleCategoryNav("All")}
              className={`nav-item ${pathname === "/" && selectedCategory !== "Cupcakes" && selectedCategory !== "All" ? "active" : ""
                }`}
            >
              🎂 Cakes
            </button>
            <button
              onClick={() => handleCategoryNav("Cupcakes")}
              className={`nav-item ${selectedCategory === "Cupcakes" ? "active" : ""
                }`}
            >
              🧁 Gourmet Cupcakes
            </button>
            <Link
              href="/About"
              className={`nav-item ${pathname === "/About" ? "active" : ""}`}
            >
              Our Story
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <a
              href="https://api.whatsapp.com/send?phone=917008198415&text=Hello%20Lilly's%20Bakery!%20I%20would%20like%20to%20order%20a%20fresh%20cake."
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-header-btn"
            >
              <span>💬</span>
              <span>WhatsApp Order</span>
            </a>

            <Link href="/Addtocart" className="cart-pill-btn">
              <span>🛍️</span>
              <span className="cart-pill-text">Bag</span>
              <span className="cart-count-badge">{cartCount}</span>
            </Link>

            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="mobile-drawer-header">
                <div className="brand-link">
                  <div className="brand-icon-box">🧁</div>
                  <div className="brand-text-wrap">
                    <span className="brand-name">Lilly's Bakery</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "20px",
                    color: "var(--text-muted)",
                    padding: "6px",
                  }}
                >
                  ✕
                </button>
              </div>

              <div className="mobile-nav-list">
                <button
                  className="mobile-nav-item"
                  onClick={() => handleCategoryNav("All")}
                >
                  <span>🏠 Home & All Bakes</span>
                  <span>→</span>
                </button>
                <button
                  className="mobile-nav-item"
                  onClick={() => handleCategoryNav("Chocolate")}
                >
                  <span>🍫 Chocolate Cakes</span>
                  <span>→</span>
                </button>
                <button
                  className="mobile-nav-item"
                  onClick={() => handleCategoryNav("Cupcakes")}
                >
                  <span>🧁 Gourmet Cupcakes</span>
                  <span>→</span>
                </button>
                <Link
                  href="/About"
                  className="mobile-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>✨ Our Story & Hygiene</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="mobile-drawer-footer">
                <a
                  href="https://api.whatsapp.com/send?phone=917008198415&text=Hello%20Lilly's%20Bakery!%20I%20want%20to%20order%20a%20cake."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-checkout-btn"
                >
                  <span>💬 Chat & Order on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
