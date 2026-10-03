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

      <style jsx>{`
        .landing-root {
          width: 100%;
          position: relative;
        }

        /* Clean Hero */
        .hero-clean-section {
          background: linear-gradient(180deg, #FFF9F3 0%, #FAF8F5 100%);
          padding: 24px 16px 20px 16px;
          border-bottom: 1px solid var(--border-light);
        }

        .hero-container-box {
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFF0E2;
          color: var(--brand-caramel);
          border: 1px solid rgba(217, 119, 6, 0.25);
          padding: 3px 12px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
        }

        .live-pulse-dot {
          width: 6px;
          height: 6px;
          background: var(--brand-green);
          border-radius: 50%;
        }

        .hero-headline-text {
          font-family: var(--font-serif);
          font-size: clamp(22px, 3.8vw, 34px);
          font-weight: 800;
          color: var(--brand-chocolate);
          line-height: 1.2;
          max-width: 600px;
        }

        .hero-description-text {
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.45;
          max-width: 480px;
        }

        /* Search Bar */
        .hero-search-wrapper {
          position: relative;
          width: 100%;
          max-width: 460px;
          margin-top: 4px;
        }

        .search-icon-svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: var(--text-subtle);
          pointer-events: none;
        }

        .hero-search-input {
          width: 100%;
          padding: 10px 36px 10px 38px;
          background: #FFFFFF;
          border: 1.5px solid rgba(38, 21, 13, 0.12);
          border-radius: var(--radius-full);
          color: var(--text-main);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          font-size: 13.5px;
          transition: all 0.2s ease;
        }

        .hero-search-input:focus {
          outline: none;
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.12);
        }

        .search-reset-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: var(--text-subtle);
          padding: 4px;
          cursor: pointer;
          border: none;
          background: none;
        }

        /* Clean Trust Row */
        .trust-highlights-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 2px;
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .trust-item-clean {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .trust-bullet {
          color: var(--border-medium);
          font-size: 10px;
        }

        /* Catalog Section */
        .catalog-master-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 10px 16px 60px 16px;
          position: relative;
        }

        .catalog-inner-container {
          width: 100%;
        }

        /* Sticky Filter Bar */
        .sticky-filter-wrapper {
          position: sticky;
          top: 56px;
          z-index: 100;
          background: rgba(250, 249, 246, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 10px 0;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(38, 21, 13, 0.06);
        }

        .filter-chips-track {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding: 2px 2px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .filter-chips-track::-webkit-scrollbar {
          display: none;
        }

        .filter-tab-pill {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 700;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          background: #FFFFFF;
          color: var(--text-muted);
          border: 1px solid rgba(38, 21, 13, 0.1);
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .filter-tab-pill:hover {
          color: var(--text-main);
          border-color: var(--brand-chocolate);
          background: #FAF9F6;
        }

        .filter-tab-pill.active {
          background: var(--brand-chocolate);
          color: #FFFFFF;
          border-color: var(--brand-chocolate);
          box-shadow: 0 2px 8px rgba(38, 21, 13, 0.2);
        }

        .catalog-subhead-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          padding: 0 2px;
        }

        .catalog-title-main {
          font-family: var(--font-serif);
          font-size: clamp(19px, 3vw, 24px);
          font-weight: 800;
          color: var(--brand-chocolate);
          line-height: 1.2;
        }

        .items-tally-pill {
          font-size: 11px;
          font-weight: 700;
          color: var(--brand-chocolate);
          background: rgba(38, 21, 13, 0.05);
          padding: 3px 9px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(38, 21, 13, 0.08);
          white-space: nowrap;
        }

        .empty-catalog-state {
          text-align: center;
          padding: 48px 20px;
          background: var(--bg-surface);
          border-radius: var(--radius-md);
          border: 1px dashed var(--border-medium);
        }

        .reset-catalog-btn {
          background: var(--brand-primary);
          color: white;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          cursor: pointer;
        }

        /* Promise Band */
        .promise-band {
          background: #F3ECE2;
          padding: 40px 16px;
          position: relative;
          clear: both;
          width: 100%;
        }

        .promise-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .promise-title-wrap {
          text-align: center;
          margin-bottom: 24px;
        }

        .promise-tag {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--brand-caramel);
          display: block;
          margin-bottom: 4px;
        }

        .promise-main-heading {
          font-family: var(--font-serif);
          font-size: clamp(22px, 3vw, 30px);
          color: var(--brand-chocolate);
        }

        .promise-cards-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .promise-box {
          background: var(--bg-surface);
          border-radius: var(--radius-md);
          padding: 18px 14px;
          text-align: center;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-xs);
        }

        .promise-emoji-icon {
          font-size: 26px;
          margin-bottom: 8px;
        }

        .promise-card-heading {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: var(--brand-chocolate);
          margin-bottom: 6px;
        }

        .promise-card-text {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Reviews Band */
        .reviews-band {
          padding: 40px 16px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          clear: both;
          width: 100%;
        }

        .reviews-container {
          width: 100%;
        }

        .reviews-header-block {
          text-align: center;
          margin-bottom: 24px;
        }

        .reviews-cards-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .review-card-item {
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 18px;
          box-shadow: var(--shadow-xs);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .review-stars-line {
          color: #F59E0B;
          font-size: 14px;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .review-comment {
          font-size: 13px;
          color: var(--text-main);
          line-height: 1.55;
          margin-bottom: 14px;
          font-style: italic;
        }

        .review-user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .review-user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--brand-chocolate);
          color: white;
          font-weight: 800;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .review-user-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--brand-chocolate);
        }

        .review-user-label {
          font-size: 10px;
          color: var(--text-subtle);
        }

        /* Urgent CTA */
        .urgent-cta-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px 50px 16px;
          position: relative;
          clear: both;
          width: 100%;
        }

        .urgent-cta-box {
          background: linear-gradient(135deg, var(--brand-chocolate) 0%, #180D06 100%);
          color: white;
          border-radius: var(--radius-lg);
          padding: 30px 20px;
          text-align: center;
          box-shadow: var(--shadow-md);
        }

        .urgent-cta-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.12);
          color: var(--brand-gold);
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          margin-bottom: 10px;
        }

        .urgent-cta-title {
          font-family: var(--font-serif);
          font-size: clamp(22px, 3.5vw, 32px);
          color: #FFF;
          margin-bottom: 8px;
        }

        .urgent-cta-desc {
          font-size: 13px;
          color: #D6C8BE;
          max-width: 480px;
          margin: 0 auto 18px auto;
          line-height: 1.5;
        }

        .urgent-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--brand-whatsapp);
          color: white;
          font-size: 14px;
          font-weight: 700;
          padding: 12px 24px;
          border-radius: var(--radius-full);
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);
          transition: transform 0.2s ease;
        }

        .urgent-cta-btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 860px) {
          .promise-cards-row {
            grid-template-columns: repeat(2, 1fr);
          }
          .reviews-cards-3 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .promise-cards-row {
            grid-template-columns: 1fr;
          }
          .hero-clean-section {
            padding: 18px 12px 22px 12px;
          }
        }
      `}</style>

      {/* Animated Card Expansion Modal */}
      <ProductModal
        cake={selectedCake}
        isOpen={!!selectedCake}
        onClose={() => setSelectedCake(null)}
      />
    </div>
  );
}
