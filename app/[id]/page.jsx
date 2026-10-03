"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Data from "@/Data/data.json";
import Data2 from "@/Data/data2.json";
import "@/Styles/dyn-route.css";
import { useRecoilState } from "recoil";
import { CartState } from "@/app/state/atoms/CartState";
import { toast } from "react-toastify";

const ProductDetailPage = ({ params }) => {
  const [cart, setCart] = useRecoilState(CartState);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("0.5 kg (1 Pound)");
  const [customMessage, setCustomMessage] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const id = parseInt(params.id, 10);
  const allProducts = [...Data, ...Data2];
  const cakeData = allProducts.find((item) => item.key === id) || allProducts[0];

  const isGemCake =
    cakeData?.key === 5 ||
    cakeData?.title?.toLowerCase().includes("gem");

  const isDollCake =
    cakeData?.key === 6 ||
    cakeData?.title?.toLowerCase().includes("doll");

  const isFixedPoundCake = isGemCake || isDollCake;

  const imagesList =
    Array.isArray(cakeData.images) && cakeData.images.length > 0
      ? cakeData.images
      : [cakeData.img];

  const hasMultipleImages = imagesList.length > 1;

  // Indian standard weights (in kg and Pounds) with 2x for 2-tier / 2lb
  const isCupcake = cakeData.category === "Cupcake";
  const isPastry = cakeData.category === "Pastry";

  const cakeWeightOptions = [
    { label: "0.5 kg (1 Pound)", serves: "3-4 Servings", multiplier: 1.0 },
    { label: "1.0 kg (2 Pounds / 2-Tier)", serves: "6-8 Servings", multiplier: 2.0 },
    { label: "1.5 kg (3 Pounds)", serves: "10-12 Servings", multiplier: 3.0 },
    { label: "2.0 kg (4 Pounds)", serves: "15-18 Servings", multiplier: 4.0 },
  ];

  const cupcakeOptions = [
    { label: "1 Pc (Single)", serves: "1 Serving", multiplier: 1.0 },
    { label: "Box of 4", serves: "4 Servings", multiplier: 3.8 },
    { label: "Box of 6", serves: "6 Servings", multiplier: 5.5 },
    { label: "Box of 12", serves: "Party Box", multiplier: 10.5 },
  ];

  const pastryOptions = [
    { label: "1 Slice", serves: "1 Serving", multiplier: 1.0 },
    { label: "Box of 2", serves: "2 Servings", multiplier: 2.0 },
    { label: "Box of 4", serves: "4 Servings", multiplier: 3.8 },
  ];

  let weightOptions = cakeWeightOptions;
  if (isCupcake) weightOptions = cupcakeOptions;
  else if (isPastry) weightOptions = pastryOptions;

  let unitPrice = cakeData.price;
  let servesHint = "3-4 Servings";

  if (isGemCake) {
    unitPrice = cakeData.price; // Fixed ₹1200 for 2 pounds
    servesHint = "2 Pounds (6-8 Servings)";
  } else if (isDollCake) {
    unitPrice = cakeData.price;
    servesHint = "Party Size";
  } else {
    const currentWeightObj =
      weightOptions.find((w) => w.label === selectedWeight) || weightOptions[0];
    unitPrice = Math.round(cakeData.price * (currentWeightObj?.multiplier || 1.0));
    servesHint = currentWeightObj?.serves;
  }

  const totalPrice = unitPrice * quantity;

  const handleCloseLightbox = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsLightboxOpen(false);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setIsLightboxOpen(false);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveSlide((prev) => (prev + 1) % imagesList.length);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveSlide((prev) => (prev - 1 + imagesList.length) % imagesList.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, imagesList.length]);

  const handleAddToCart = () => {
    const chosenWeight = isGemCake
      ? "2 Pounds (Fixed Size)"
      : isDollCake
        ? "Doll Special"
        : selectedWeight;

    const itemToAdd = {
      ...cakeData,
      key: `${cakeData.key}-${chosenWeight}-${Date.now()}`,
      originalKey: cakeData.key,
      price: unitPrice,
      selectedWeight: chosenWeight,
      cakeMessage: customMessage.trim() || null,
      quantity: quantity,
    };

    setCart((prev) => [...prev, itemToAdd]);

    toast.success(
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>🎂</span>
        <span>
          <strong>{cakeData.title}</strong> ({chosenWeight}) added to bag!
        </span>
      </div>,
      {
        position: "bottom-center",
        autoClose: 1800,
        hideProgressBar: true,
        theme: "dark",
      }
    );
  };

  // Format WhatsApp Link
  const chosenWeightText = isGemCake
    ? "2 Pounds (Fixed Size)"
    : isDollCake
      ? "Doll Theme Special"
      : selectedWeight;

  const whatsappText = encodeURIComponent(
    `Namaste Lilly's Bakery! 🍰 I would like to order a fresh cake:\n\n` +
    `• Cake: ${cakeData.title}\n` +
    `• Weight / Size: ${chosenWeightText}\n` +
    `• Quantity: ${quantity}\n` +
    (customMessage.trim()
      ? `• Name / Message on Cake: "${customMessage.trim()}"\n`
      : "") +
    `• Total Amount: ₹${totalPrice}\n\n` +
    `Please confirm delivery time slot and send UPI payment details (GPay / PhonePe / Paytm / QR). Thank you! 🙏`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=917008198415&text=${whatsappText}`;

  return (
    <div className="dyn-page-wrapper">
      {/* Top Header Navigation */}
      <div className="dyn-top-bar">
        <Link href="/" className="dyn-back-link">
          <span>←</span>
          <span>Back to Menu</span>
        </Link>
        <span className="dyn-viewing-tag">High-Resolution Photo Gallery</span>
      </div>

      <div className="dyn-grid">
        {/* Left: Image Card with HD Slideshow */}
        <div className="dyn-image-card">
          <div
            className="dyn-img-container"
            onClick={() => setIsLightboxOpen(true)}
            title="Tap to see Fullscreen HD Photo"
          >
            <Image
              src={imagesList[activeSlide]}
              alt={`${cakeData.title} - photo ${activeSlide + 1}`}
              fill
              sizes="(max-width: 820px) 100vw, 550px"
              priority
              className="dyn-img-elem"
            />

            {/* Tap to Zoom Prompt Badge */}
            <div className="dyn-zoom-hint-badge">
              <span>🔍 Tap for Full HD Zoom</span>
            </div>

            {/* Photo Counter Pill */}
            {hasMultipleImages && (
              <div className="dyn-photo-counter-pill">
                <span>📷 {activeSlide + 1} / {imagesList.length}</span>
              </div>
            )}

            {/* Slideshow Arrows */}
            {hasMultipleImages && (
              <div className="card-slide-controls" style={{ opacity: 1 }}>
                <button
                  type="button"
                  className="card-slide-arrow arrow-left"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide(
                      (prev) =>
                        (prev - 1 + imagesList.length) % imagesList.length
                    );
                  }}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="card-slide-arrow arrow-right"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide((prev) => (prev + 1) % imagesList.length);
                  }}
                  aria-label="Next photo"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          {/* Thumbnails row */}
          {hasMultipleImages && (
            <div className="dyn-thumbnails-wrapper">
              <div className="dyn-thumbnails-header">
                <span>Real Cake Photos ({imagesList.length})</span>
                <span className="dyn-tap-hint">Tap any photo to view</span>
              </div>
              <div className="dyn-thumbnails-track">
                {imagesList.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`dyn-thumb-btn ${idx === activeSlide ? "active" : ""
                      }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <Image
                      src={imgSrc}
                      alt="thumbnail"
                      fill
                      sizes="68px"
                      className="dyn-thumb-img"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {cakeData.badge && (
            <div className="dyn-floating-badge">
              <span>{cakeData.badge}</span>
            </div>
          )}
        </div>

        {/* Right: Info & Options */}
        <div className="dyn-info-panel">
          <div className="dyn-meta-row">
            <span className="veg-badge">
              <span className="veg-icon-box">
                <span className="veg-icon-dot"></span>
              </span>
              100% Pure Veg (Eggless)
            </span>

            <div className="dyn-rating-chip">
              <span style={{ color: "#F59E0B" }}>★</span>
              <span>{cakeData.rating || "4.9"}</span>
              <span style={{ color: "var(--text-subtle)", fontWeight: "normal" }}>
                ({cakeData.reviews || 120}+ reviews)
              </span>
            </div>
          </div>

          <h1 className="dyn-title">{cakeData.title}</h1>
          <p className="dyn-sensory-desc">{cakeData.desc}</p>

          {/* Weight Selection Section (Hidden for Gem Cake & Doll Cake) */}
          {!isFixedPoundCake && (
            <div className="weight-selector-section">
              <label className="section-label">
                {isCupcake ? "Select Pack Size" : "Select Cake Weight / Size (2-Tier = 2x)"}
              </label>
              <div className="weight-pills-row">
                {weightOptions.map((opt) => (
                  <div
                    key={opt.label}
                    className={`weight-pill ${selectedWeight === opt.label ? "selected" : ""
                      }`}
                    onClick={() => setSelectedWeight(opt.label)}
                  >
                    <span className="weight-pill-title">{opt.label}</span>
                    <span className="weight-pill-serves">{opt.serves}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fixed Size Indicators for Gem Cake & Doll Cake */}
          {isGemCake && (
            <div className="modal-fixed-size-banner" style={{ margin: "4px 0" }}>
              <span className="fixed-size-icon">🎂</span>
              <span className="fixed-size-text">
                <strong>Fixed Size:</strong> 2 Pounds (1.0 kg) Celebration Special
              </span>
            </div>
          )}

          {isDollCake && (
            <div className="modal-fixed-size-banner" style={{ margin: "4px 0" }}>
              <span className="fixed-size-icon">🎀</span>
              <span className="fixed-size-text">
                <strong>Fixed Size:</strong> Handcrafted 3D Princess Doll Cake
              </span>
            </div>
          )}

          {/* Custom Message Section */}
          {!isCupcake && (
            <div className="custom-msg-section">
              <label className="section-label">
                Name / Message on Cake (Free Chocolate Plaque)
              </label>
              <input
                type="text"
                placeholder="e.g. Happy Birthday Rohan! 🎂 / Happy Anniversary Mom & Dad ❤️"
                value={customMessage}
                maxLength={45}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="custom-msg-input"
              />
            </div>
          )}

          {/* Pricing & Order Card (Desktop & in-flow) */}
          <div className="dyn-pricing-card">
            <div className="dyn-price-row">
              <div>
                <span className="dyn-price-sublabel">
                  Total Price ({selectedWeight})
                </span>
                <div className="dyn-price-value">₹{totalPrice}</div>
              </div>

              <div className="dyn-qty-row">
                <span className="dyn-qty-label">Qty:</span>
                <div className="card-qty-stepper">
                  <button
                    className="stepper-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="stepper-qty-num">{quantity}</span>
                  <button
                    className="stepper-btn"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="dyn-actions-grid">
              <button className="dyn-add-cart-btn" onClick={handleAddToCart}>
                <span>🛍️</span>
                <span>Add to Bag</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dyn-whatsapp-btn"
              >
                <span>💬</span>
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Complimentary Perks & Trust */}
          <div className="trust-badges-row">
            <div className="trust-badge-item">
              <span className="trust-badge-icon">🌿</span>
              <span>100% Pure Veg</span>
            </div>
            <div className="trust-badge-item">
              <span className="trust-badge-icon">⚡</span>
              <span>2-Hour Delivery</span>
            </div>
            <div className="trust-badge-item">
              <span className="trust-badge-icon">🕯️</span>
              <span>Free Candle & Knife</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen HD Lightbox Modal for clear photo viewing */}
      {isLightboxOpen && (
        <div
          className="dyn-lightbox-overlay"
          onClick={handleCloseLightbox}
        >
          <div
            className="dyn-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="dyn-lightbox-close-btn"
              onClick={handleCloseLightbox}
              aria-label="Close HD viewer"
            >
              ✕
            </button>

            <div className="dyn-lightbox-img-wrap">
              <Image
                src={imagesList[activeSlide]}
                alt={`${cakeData.title} HD Fullscreen`}
                fill
                sizes="100vw"
                quality={95}
                className="dyn-lightbox-img"
              />
            </div>

            <div className="dyn-lightbox-footer">
              <div className="dyn-lightbox-title-wrap">
                <span className="dyn-lightbox-title">{cakeData.title}</span>
                <span className="dyn-lightbox-counter">
                  Photo {activeSlide + 1} of {imagesList.length}
                </span>
              </div>

              {hasMultipleImages && (
                <div className="dyn-lightbox-nav-buttons">
                  <button
                    className="dyn-lightbox-arrow"
                    onClick={() =>
                      setActiveSlide(
                        (prev) =>
                          (prev - 1 + imagesList.length) % imagesList.length
                      )
                    }
                  >
                    ‹ Previous
                  </button>
                  <button
                    className="dyn-lightbox-arrow"
                    onClick={() =>
                      setActiveSlide((prev) => (prev + 1) % imagesList.length)
                    }
                  >
                    Next ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Buy Dock */}
      <div className="mobile-sticky-buy-bar">
        <div className="sticky-buy-price-wrap">
          <span className="sticky-buy-label">{selectedWeight}</span>
          <span className="sticky-buy-amount">₹{totalPrice}</span>
        </div>

        <div className="sticky-buy-buttons">
          <button className="sticky-add-btn" onClick={handleAddToCart}>
            <span>🛍️ Add to Bag</span>
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sticky-whatsapp-btn"
          >
            <span>💬 Buy</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

