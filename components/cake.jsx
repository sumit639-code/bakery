"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { CartState } from "@/app/state/atoms/CartState";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cake = ({ data, pc, onSelect }) => {
  const [cart, setCart] = useRecoilState(CartState);
  const [activeSlide, setActiveSlide] = useState(0);

  const imagesList =
    Array.isArray(data.images) && data.images.length > 0
      ? data.images
      : [data.img];

  const hasMultipleImages = imagesList.length > 1;

  // Find if this item is currently in cart
  const cartItem = cart.find((item) => item.key === data.key);
  const inCartQuantity = cartItem ? cartItem.quantity : 0;

  const handleCardClick = (e) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(data);
    }
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!cartItem) {
      setCart((prev) => [...prev, { ...data, quantity: 1 }]);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.key === data.key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }

    toast.success(
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>🧁</span>
        <span>
          <strong>{data.title}</strong> added to bag!
        </span>
      </div>,
      {
        position: "bottom-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "dark",
      }
    );
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    setCart((prev) =>
      prev.map((item) =>
        item.key === data.key && item.quantity < 20
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (inCartQuantity <= 1) {
      setCart((prev) => prev.filter((item) => item.key !== data.key));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.key === data.key
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const anchorPrice = Math.round(data.price * 1.2);

  return (
    <div
      className="cake-card-container"
      onClick={handleCardClick}
      style={{ cursor: onSelect ? "pointer" : "default" }}
    >
      {/* Media Wrap with Slideshow */}
      <div className="card-media-wrapper">
        <Image
          src={imagesList[activeSlide]}
          alt={`${data.title} - photo ${activeSlide + 1}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="card-img-element"
          loading="lazy"
        />

        {/* Slideshow Arrows (if multiple photos) */}
        {hasMultipleImages && (
          <div className="card-slide-controls">
            <button
              className="card-slide-arrow arrow-left"
              onClick={handlePrevSlide}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              className="card-slide-arrow arrow-right"
              onClick={handleNextSlide}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        )}

        {/* Slideshow Indicator Badge / Dots */}
        {hasMultipleImages && (
          <div className="card-slide-dots">
            {imagesList.map((_, idx) => (
              <span
                key={idx}
                className={`card-slide-dot ${idx === activeSlide ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide(idx);
                }}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        {data.badge && (
          <div className="card-floating-badge">
            <span>{data.badge}</span>
          </div>
        )}

        <div className="card-rating-badge">
          <span className="star-gold">★</span>
          <span>{data.rating || "4.9"}</span>
        </div>
      </div>

      {/* Content Details */}
      <div className="card-content-wrap">
        <div className="card-tag-row">
          <span className="veg-badge">
            <span className="veg-icon-box">
              <span className="veg-icon-dot"></span>
            </span>
            100% Eggless
          </span>

          {data.tag && <span className="flavor-pill-tag">{data.tag}</span>}
        </div>

        <h3 className="card-product-title">
          <span>{data.title}</span>
        </h3>

        <p className="card-sensory-desc">{data.desc}</p>

        {/* Footer Price & Stepper Row */}
        <div className="card-action-footer">
          <div className="card-price-block">
            <div className="card-current-price">
              ₹{data.price}
              {pc && (
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "normal",
                    color: "var(--text-muted)",
                  }}
                >
                  {pc}
                </span>
              )}
            </div>
            <span className="card-old-price">₹{anchorPrice}</span>
          </div>

          {inCartQuantity > 0 ? (
            <div className="card-qty-stepper">
              <button
                className="stepper-btn"
                onClick={handleDecrement}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="stepper-qty-num">{inCartQuantity}</span>
              <button
                className="stepper-btn"
                onClick={handleIncrement}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button className="card-add-btn" onClick={handleAddToCart}>
              <span>+</span>
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cake;
