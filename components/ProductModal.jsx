"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { CartState } from "@/app/state/atoms/CartState";
import { toast } from "react-toastify";
import "@/Styles/modal.css";

export default function ProductModal({ cake, isOpen, onClose }) {
  const [cart, setCart] = useRecoilState(CartState);
  const [quantity, setQuantity] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const isCupcake = cake?.category === "Cupcake";
  const isPastry = cake?.category === "Pastry";

  // Specific Cake Customizations
  const isGemCake =
    cake?.key === 5 ||
    cake?.title?.toLowerCase().includes("gem");

  const isDollCake =
    cake?.key === 6 ||
    cake?.title?.toLowerCase().includes("doll");

  const isFixedPoundCake = isGemCake || isDollCake || isPastry;

  const imagesList =
    cake && Array.isArray(cake.images) && cake.images.length > 0
      ? cake.images
      : cake
        ? [cake.img]
        : [];

  const hasMultipleImages = imagesList.length > 1;

  // Standard cake weights with doubled price for 2 lb / 2 tier
  const cakeWeightOptions = [
    { label: "0.5 kg (1 lb)", serves: "3-4 Servings", multiplier: 1.0 },
    { label: "1.0 kg (2 lb / 2-Tier)", serves: "6-8 Servings", multiplier: 2.0 },
    { label: "1.5 kg (3 lb)", serves: "10-12 Servings", multiplier: 3.0 },
    { label: "2.0 kg (4 lb)", serves: "15-18 Servings", multiplier: 4.0 },
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

  let options = cakeWeightOptions;
  if (isCupcake) options = cupcakeOptions;
  else if (isPastry) options = pastryOptions;

  const [selectedOption, setSelectedOption] = useState(options[0]?.label);
  const [customMessage, setCustomMessage] = useState("");

  // Reset state when cake changes
  useEffect(() => {
    if (cake) {
      if (isGemCake) {
        setSelectedOption("2 Pounds (Fixed)");
      } else if (isDollCake) {
        setSelectedOption("Standard Doll Size");
      } else if (isCupcake) {
        setSelectedOption(cupcakeOptions[0].label);
      } else if (isPastry) {
        setSelectedOption(pastryOptions[0].label);
      } else {
        setSelectedOption(cakeWeightOptions[0].label);
      }
      setQuantity(1);
      setCustomMessage("");
      setActiveSlide(0);
      setIsLightboxOpen(false);
    }
  }, [cake, isCupcake, isGemCake, isDollCake, isPastry]);

  // Handle ESC key and keyboard arrows cleanly without router pop reload
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else if (isOpen) {
          onClose();
        }
      }
      if (isLightboxOpen) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setActiveSlide((prev) => (prev + 1) % imagesList.length);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setActiveSlide((prev) => (prev - 1 + imagesList.length) % imagesList.length);
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isLightboxOpen, onClose, imagesList.length]);

  const handleCloseModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  const handleCloseLightbox = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsLightboxOpen(false);
  };

  // Touch Swipe Gesture for Lightbox
  const minSwipeDistance = 45;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && imagesList.length > 1) {
      setActiveSlide((prev) => (prev + 1) % imagesList.length);
    }
    if (isRightSwipe && imagesList.length > 1) {
      setActiveSlide((prev) => (prev - 1 + imagesList.length) % imagesList.length);
    }
  };

  if (!cake) return null;

  // Price Calculation
  let unitPrice = cake.price;
  let servesHint = "3-4 Servings";

  if (isGemCake) {
    unitPrice = cake.price; // ₹1200 for 2 pounds
    servesHint = "2 lb (6-8 Servings)";
  } else if (isDollCake) {
    unitPrice = cake.price; // Fixed price
    servesHint = "Party Size";
  } else if (!isFixedPoundCake) {
    const currentOptionObj =
      options.find((opt) => opt.label === selectedOption) || options[0];
    unitPrice = Math.round(cake.price * (currentOptionObj?.multiplier || 1.0));
    servesHint = currentOptionObj?.serves;
  } else if (isPastry) {
    const currentOptionObj =
      pastryOptions.find((opt) => opt.label === selectedOption) || pastryOptions[0];
    unitPrice = Math.round(cake.price * (currentOptionObj?.multiplier || 1.0));
    servesHint = currentOptionObj?.serves;
  }

  const totalPrice = unitPrice * quantity;

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleAddToCart = () => {
    const chosenSize = isGemCake
      ? "2 lb (Fixed)"
      : isDollCake
        ? "Doll Special"
        : selectedOption;

    const itemToAdd = {
      ...cake,
      key: `${cake.key}-${chosenSize}-${Date.now()}`,
      originalKey: cake.key,
      price: unitPrice,
      selectedWeight: chosenSize,
      cakeMessage: customMessage.trim() || null,
      quantity: quantity,
    };

    setCart((prev) => [...prev, itemToAdd]);

    toast.success(
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>🎂</span>
        <span>
          <strong>{cake.title}</strong> ({chosenSize}) added to bag!
        </span>
      </div>,
      {
        position: "bottom-center",
        autoClose: 1800,
        hideProgressBar: true,
        theme: "dark",
      }
    );

    onClose();
  };

  // WhatsApp Order Link
  const chosenSizeText = isGemCake
    ? "2 Pounds (Fixed Size)"
    : isDollCake
      ? "Special Doll Theme"
      : selectedOption;

  const whatsappText = encodeURIComponent(
    `Namaste Lilly's Bakery! 🍰 I would like to order:\n\n` +
    `• Item: ${cake.title}\n` +
    `• Size / Weight: ${chosenSizeText}\n` +
    `• Quantity: ${quantity}\n` +
    (customMessage.trim()
      ? `• Name / Message on Cake: "${customMessage.trim()}"\n`
      : "") +
    `• Total Amount: ₹${totalPrice}\n\n` +
    `Please confirm delivery time slot and send UPI QR / number. Thank you! 🙏`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=917008198415&text=${whatsappText}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="modal-card-expanded"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="modal-clean-body">
              {/* Hero Image Showcase with Click-to-Open Fullscreen Swipe Lightbox */}
              <div
                className="modal-hero-img-wrap"
                onClick={() => setIsLightboxOpen(true)}
                title="Tap to swipe & see full photos"
              >
                <div className="modal-hero-img-inner">
                  <Image
                    src={imagesList[activeSlide]}
                    alt={`${cake.title} - photo ${activeSlide + 1}`}
                    fill
                    sizes="(max-width: 600px) 100vw, 540px"
                    className="modal-hero-img"
                    priority
                  />

                  {/* Tap to View Fullscreen Badge */}
                  <div className="modal-expand-prompt-badge">
                    <span>🔍 Fullscreen Swipe ({imagesList.length} Photos)</span>
                  </div>
                </div>

                {/* Slideshow Arrows */}
                {hasMultipleImages && (
                  <div className="card-slide-controls" style={{ opacity: 1 }}>
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

                {/* Slideshow Dot Indicators */}
                {hasMultipleImages && (
                  <div className="card-slide-dots">
                    {imagesList.map((_, idx) => (
                      <span
                        key={idx}
                        className={`card-slide-dot ${idx === activeSlide ? "active" : ""
                          }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSlide(idx);
                        }}
                      />
                    ))}
                  </div>
                )}

                {cake.badge && (
                  <div className="modal-badge-chip">
                    <span>{cake.badge}</span>
                  </div>
                )}
              </div>

              {/* Title, Meta & Description */}
              <div className="modal-header-info">
                <div className="modal-meta-line">
                  <span className="veg-badge" style={{ padding: "1px 6px", fontSize: "10px" }}>
                    <span className="veg-icon-box" style={{ width: "10px", height: "10px" }}>
                      <span className="veg-icon-dot" style={{ width: "4px", height: "4px" }}></span>
                    </span>
                    100% Eggless
                  </span>
                  <span>•</span>
                  <span style={{ fontWeight: "700", color: "#F59E0B" }}>★ {cake.rating || "4.9"}</span>
                  <span style={{ color: "var(--text-subtle)" }}>({cake.reviews || 120}+ reviews)</span>
                </div>

                <h2 className="modal-clean-title">{cake.title}</h2>
                <p className="modal-clean-desc">{cake.desc}</p>
              </div>

              {/* Weight / Size Selection (Hidden for Gem Cake & Doll Cake) */}
              {!isFixedPoundCake && (
                <div className="modal-section-clean">
                  <label className="modal-label-clean">
                    {isCupcake ? "Select Pack Size" : "Select Cake Size (2-Tier = 2x)"}
                  </label>
                  <div className="modal-pills-row-clean">
                    {options.map((opt) => (
                      <div
                        key={opt.label}
                        className={`modal-pill-clean ${selectedOption === opt.label ? "selected" : ""
                          }`}
                        onClick={() => setSelectedOption(opt.label)}
                      >
                        <span className="modal-pill-clean-title">{opt.label}</span>
                        <span className="modal-pill-clean-serves">{opt.serves}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fixed Size Indicators for Gem Cake & Doll Cake */}
              {isGemCake && (
                <div className="modal-fixed-size-banner">
                  <span className="fixed-size-icon">🎂</span>
                  <span className="fixed-size-text">
                    <strong>Fixed Size:</strong> 2 Pounds (1.0 kg) Celebration Special
                  </span>
                </div>
              )}

              {isDollCake && (
                <div className="modal-fixed-size-banner">
                  <span className="fixed-size-icon">🎀</span>
                  <span className="fixed-size-text">
                    <strong>Fixed Size:</strong> Handcrafted 3D Princess Doll Cake
                  </span>
                </div>
              )}

              {/* Free Name Plaque (Optional) */}
              {!isCupcake && (
                <div className="modal-section-clean">
                  <label className="modal-label-clean">
                    Name / Message on Cake (Free Chocolate Plaque)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Happy Birthday Rohan! 🎂"
                    value={customMessage}
                    maxLength={40}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="modal-input-clean"
                  />
                </div>
              )}

              {/* Bottom Action Row */}
              <div className="modal-bottom-bar-clean">
                <div className="modal-price-stack">
                  <span className="modal-price-big">₹{totalPrice}</span>
                  <span className="modal-serves-hint">{servesHint}</span>
                </div>

                <div className="modal-actions-right">
                  <div className="modal-stepper-clean">
                    <button
                      className="modal-stepper-btn-clean"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <span className="modal-stepper-num-clean">{quantity}</span>
                    <button
                      className="modal-stepper-btn-clean"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="modal-primary-add-btn"
                    onClick={handleAddToCart}
                  >
                    <span>🛍️</span>
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>

              {/* Secondary WhatsApp Direct Order */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-whatsapp-link-clean"
              >
                <span>💬 Or Order directly on WhatsApp</span>
              </a>

              {/* Trust Line */}
              <div className="modal-trust-line-clean">
                <span>🌿 100% Pure Veg</span>
                <span>•</span>
                <span>⚡ 2-Hr Delivery</span>
                <span>•</span>
                <span>🕯️ Free Birthday Kit</span>
              </div>
            </div>
          </motion.div>

          {/* Full-Screen Swipeable HD Gallery Lightbox Modal */}
          {isLightboxOpen && (
            <div
              className="modal-lightbox-fullscreen"
              onClick={handleCloseLightbox}
            >
              <div
                className="modal-lightbox-inner"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {/* Close Button */}
                <button
                  className="modal-lightbox-close"
                  onClick={handleCloseLightbox}
                  aria-label="Close fullscreen gallery"
                >
                  ✕
                </button>

                {/* Main Swipeable Photo Display */}
                <div className="modal-lightbox-img-holder">
                  <Image
                    src={imagesList[activeSlide]}
                    alt={`${cake.title} photo ${activeSlide + 1}`}
                    fill
                    sizes="100vw"
                    quality={95}
                    className="modal-lightbox-img"
                    priority
                  />

                  {/* Left / Right Nav Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        className="modal-lightbox-arrow-btn left"
                        onClick={handlePrevSlide}
                        aria-label="Previous photo"
                      >
                        ‹
                      </button>
                      <button
                        className="modal-lightbox-arrow-btn right"
                        onClick={handleNextSlide}
                        aria-label="Next photo"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* Lightbox Footer with Info & Thumbnails */}
                <div className="modal-lightbox-footer">
                  <div className="modal-lightbox-meta">
                    <span className="modal-lightbox-title">{cake.title}</span>
                    <span className="modal-lightbox-counter">
                      Photo {activeSlide + 1} of {imagesList.length} • Swipe to browse ↔
                    </span>
                  </div>

                  {/* Thumbnails Row */}
                  {hasMultipleImages && (
                    <div className="modal-lightbox-thumbs">
                      {imagesList.map((imgSrc, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`modal-lightbox-thumb-btn ${idx === activeSlide ? "active" : ""
                            }`}
                          onClick={() => setActiveSlide(idx)}
                        >
                          <Image
                            src={imgSrc}
                            alt="thumb"
                            fill
                            sizes="54px"
                            className="modal-lightbox-thumb-img"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

