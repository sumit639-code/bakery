"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import CakeData from "@/Data/data.json";
import CupcakeData from "@/Data/data2.json";
import Cake from "@/components/cake";
import ProductModal from "@/components/ProductModal";
import { useRecoilState } from "recoil";
import { CategoryState } from "@/app/state/atoms/CategoryState";
import "@/Styles/menu.css";
import "@/Styles/landing.css";

export default function Landing() {
  const [selectedFilter, setSelectedFilter] = useRecoilState(CategoryState);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCake, setSelectedCake] = useState(null);

  const allItems = useMemo(() => {
    return [...CakeData, ...CupcakeData];
  }, []);

  const filterOptions = useMemo(() => {
    return [
      { id: "All", label: "All Cakes", count: allItems.length },
      {
        id: "Bestseller",
        label: "🔥 Bestsellers",
        count: allItems.filter(
          (i) =>
            (i.badge && i.badge.toLowerCase().includes("bestseller")) ||
            (i.badge && i.badge.toLowerCase().includes("favorite")) ||
            i.rating >= 5.0
        ).length,
      },
      {
        id: "Chocolate",
        label: "🍫 Chocolate",
        count: allItems.filter((i) => i.category === "Chocolate").length,
      },
      {
        id: "Fruit",
        label: "🍓 Strawberry & Fruit",
        count: allItems.filter((i) => i.category === "Fruit").length,
      },
      {
        id: "Celebration",
        label: "🎉 Kids & Themes",
        count: allItems.filter((i) => i.category === "Celebration").length,
      },
      {
        id: "Exotic",
        label: "👑 Rasmalai & Fusion",
        count: allItems.filter((i) => i.category === "Exotic").length,
      },
      {
        id: "Pastry",
        label: "🍰 Pastries",
        count: allItems.filter((i) => i.category === "Pastry").length,
      },
    ];
  }, [allItems]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedFilter === "All") return true;
      if (selectedFilter === "Cupcakes") return item.category === "Cupcake";
      if (selectedFilter === "Fruit") return item.category === "Fruit";
      if (selectedFilter === "Bestseller") {
        return (
          (item.badge && item.badge.toLowerCase().includes("bestseller")) ||
          (item.badge && item.badge.toLowerCase().includes("popular")) ||
          item.rating >= 4.9
        );
      }
      return item.category === selectedFilter;
    });
  }, [allItems, searchQuery, selectedFilter]);

  return (
    <div className="landing-root">
      {/* Ultra-Clean Modern Hero */}
      <section className="hero-clean-section">
        <div className="hero-container-box">
          <div className="hero-pill-badge">
            <span className="live-pulse-dot"></span>
            <span>100% Pure Veg (Eggless) • Baked Fresh Daily</span>
          </div>

          <h1 className="hero-headline-text">
            Fresh Handcrafted Cakes 🎂
          </h1>

          <p className="hero-description-text">
            Delicious birthday & celebration cakes with free candle, knife & name plaque.
          </p>

          {/* Instant Search Bar */}
          <div className="hero-search-wrapper">
            <span className="search-icon-svg">🔍</span>
            <input
              type="text"
              placeholder="Search chocolate, vanilla, strawberry, rasmalai..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
            />
            {searchQuery && (
              <button
                className="search-reset-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear Search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Clean Trust Line */}
          <div className="trust-highlights-row">
            <span className="trust-item-clean">🌿 100% Pure Veg</span>
            <span className="trust-bullet">•</span>
            <span className="trust-item-clean">⚡ 2-Hr Express Delivery</span>
            <span className="trust-bullet">•</span>
            <span className="trust-item-clean">🕯️ Free Candle & Knife</span>
          </div>
        </div>
      </section>

      {/* Main Catalog - All Cakes on Scroll */}
      <section className="catalog-master-section" id="cakes-catalog-section">
        <div className="catalog-inner-container">
          {/* Sticky Category Tabs */}
          <div className="sticky-filter-wrapper">
            <div className="filter-chips-track">
              {filterOptions.map((opt) => (
                <button
                  key={opt.id}
                  className={`filter-tab-pill ${selectedFilter === opt.id ? "active" : ""}`}
                  onClick={() => setSelectedFilter(opt.id)}
                >
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section Sub-Header */}
          <div className="catalog-subhead-row">
            <h2 className="catalog-title-main">
              {selectedFilter === "All"
                ? "Our Fresh Cakes"
                : selectedFilter === "Cupcakes"
                ? "Fresh Cupcakes Menu"
                : `${selectedFilter} Cakes`}
            </h2>
            <span className="items-tally-pill">
              {filteredItems.length} {filteredItems.length === 1 ? "Cake" : "Cakes"}
            </span>
          </div>

          {/* Responsive Cake Grid */}
          {filteredItems.length > 0 ? (
            <div className="cake-grid-layout">
              {filteredItems.map((item) => (
                <Cake
                  data={item}
                  key={item.key}
                  onSelect={setSelectedCake}
                />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-state">
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🍰</div>
              <h3 style={{ fontSize: "18px", color: "var(--brand-chocolate)" }}>
                No cakes found matching "{searchQuery}"
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "8px 0 16px 0" }}>
                Try searching for Black Forest, Pineapple, Truffle or view all cakes.
              </p>
              <button
                className="reset-catalog-btn"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("All");
                }}
              >
                View All Cakes
              </button>
            </div>
          )}
        </div>
      </section>

      {/* The Lilly's Quality Promise */}
      <section className="promise-band">
        <div className="promise-container">
          <div className="promise-title-wrap">
            <span className="promise-tag">Freshness & Purity Promise</span>
            <h2 className="promise-main-heading">Why Choose Lilly's Bakery?</h2>
          </div>

          <div className="promise-cards-row">
            <div className="promise-box">
              <div className="promise-emoji-icon">🌿</div>
              <h3 className="promise-card-heading">100% Pure Veg (Eggless)</h3>
              <p className="promise-card-text">
                Completely vegetarian kitchen. Soft and fluffy cakes made with fresh milk and pure ingredients.
              </p>
            </div>

            <div className="promise-box">
              <div className="promise-emoji-icon">⏰</div>
              <h3 className="promise-card-heading">Freshly Baked on Order</h3>
              <p className="promise-card-text">
                We never sell stale or frozen cakes. Every cake is freshly baked and iced just before dispatch.
              </p>
            </div>

            <div className="promise-box">
              <div className="promise-emoji-icon">⚡</div>
              <h3 className="promise-card-heading">2-Hour Express Delivery</h3>
              <p className="promise-card-text">
                Fast doorstep delivery for birthday surprises and party celebrations in safe cake boxes.
              </p>
            </div>

            <div className="promise-box">
              <div className="promise-emoji-icon">🎁</div>
              <h3 className="promise-card-heading">Free Birthday Kit</h3>
              <p className="promise-card-text">
                Complimentary cake cutting knife, colorful birthday candles, and customized name plaque included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Customer Reviews */}
      <section className="reviews-band">
        <div className="reviews-container">
          <div className="reviews-header-block">
            <span className="promise-tag">Customer Reviews</span>
            <h2 className="promise-main-heading">10,000+ Happy Celebrations</h2>
          </div>

          <div className="reviews-cards-3">
            <div className="review-card-item">
              <div className="review-stars-line">★★★★★</div>
              <p className="review-comment">
                "Ordered the Chocolate Truffle cake for my son's birthday. It was super soft, chocolaty, and delivered on time in 90 minutes. Everyone loved it!"
              </p>
              <div className="review-user-info">
                <div className="review-user-avatar">PS</div>
                <div>
                  <div className="review-user-name">Priya Sharma</div>
                  <div className="review-user-label">Birthday Celebration</div>
                </div>
              </div>
            </div>

            <div className="review-card-item">
              <div className="review-stars-line">★★★★★</div>
              <p className="review-comment">
                "The Special Rasmalai cake was mind-blowing! Real rasmalai on top and the sponge was so soft. Ordered directly on WhatsApp, very easy process."
              </p>
              <div className="review-user-info">
                <div className="review-user-avatar">RK</div>
                <div>
                  <div className="review-user-name">Rahul Verma</div>
                  <div className="review-user-label">Anniversary Celebration</div>
                </div>
              </div>
            </div>

            <div className="review-card-item">
              <div className="review-stars-line">★★★★★</div>
              <p className="review-comment">
                "Best eggless bakery! The Pineapple and Black Forest cakes are always fresh. Free candles and knife were included in the box."
              </p>
              <div className="review-user-info">
                <div className="review-user-avatar">AM</div>
                <div>
                  <div className="review-user-name">Ananya Gupta</div>
                  <div className="review-user-label">Family Function</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent WhatsApp Banner */}
      <section className="urgent-cta-section">
        <div className="urgent-cta-box">
          <span className="urgent-cta-badge">⚡ Instant Order</span>
          <h2 className="urgent-cta-title">Need a Fresh Birthday Cake Today?</h2>
          <p className="urgent-cta-desc">
            Chat with us on WhatsApp for fast cake availability, custom design requests, and 2-hour doorstep delivery.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=917008198415&text=Hello%20Lilly's%20Bakery!%20I%20want%20to%20order%20a%20fresh%20cake%20for%20today."
            target="_blank"
            rel="noopener noreferrer"
            className="urgent-cta-btn"
          >
            <span>💬</span>
            <span>Order on WhatsApp (+91 70081 98415)</span>
          </a>
        </div>
      </section>


      {/* Animated Card Expansion Modal */}
      <ProductModal
        cake={selectedCake}
        isOpen={!!selectedCake}
        onClose={() => setSelectedCake(null)}
      />
    </div>
  );
}
