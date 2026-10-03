"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BakeryLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(20);
  const [loadingText, setLoadingText] = useState("Freshly baking your treats...");

  useEffect(() => {
    // Array of key cake images to preload
    const criticalImages = [
      "/images/cakes/vanila1.jpeg",
      "/images/cakes/pineapple cake.jpeg",
      "/images/cakes/chocolate cake.jpeg",
      "/images/cakes/rasmalai.jpeg",
      "/images/cakes/vanila choco.jpeg",
      "/images/cakes/Doll cake.jpeg",
      "/images/cakes/Choco Gem cake.jpeg",
      "/images/cakes/pastry.jpeg",
    ];

    let loadedCount = 0;
    const totalItems = criticalImages.length + 1;

    const updateProgress = () => {
      loadedCount++;
      const currentPercent = Math.min(
        95,
        Math.round((loadedCount / totalItems) * 100)
      );
      setProgress(currentPercent);

      if (currentPercent < 40) {
        setLoadingText("Preheating the bakery oven... ♨️");
      } else if (currentPercent < 75) {
        setLoadingText("Whipping fresh cream & dark ganache... 🍫");
      } else {
        setLoadingText("Adding the final cherry on top... 🍒");
      }
    };

    criticalImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    const handleWindowLoad = () => {
      updateProgress();
      setTimeout(() => {
        setProgress(100);
        setLoadingText("Ready to celebrate! ✨");
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }, 350);
    };

    if (document.readyState === "complete") {
      handleWindowLoad();
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    // Safety fallback: maximum 2.5 seconds
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener("load", handleWindowLoad);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="bakery-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, y: -10 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bakery-loader-content">
            {/* Animated Cake Emblem */}
            <motion.div
              className="loader-cake-emblem"
              animate={{
                y: [0, -8, 0],
                rotate: [0, -2, 2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="loader-cake-icon">🎂</span>
              <span className="loader-sparkle spark-1">✨</span>
              <span className="loader-sparkle spark-2">🧁</span>
            </motion.div>

            {/* Brand Title */}
            <h2 className="loader-brand-title">Lilly's Bakery</h2>
            <p className="loader-brand-subtitle">
              100% Pure Veg • Artisanal Patisserie
            </p>

            {/* Dynamic Status Text */}
            <p className="loader-status-text">{loadingText}</p>

            {/* Progress Bar */}
            <div className="loader-progress-track">
              <motion.div
                className="loader-progress-bar"
                initial={{ width: "20%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          <style jsx>{`
            .bakery-loader-overlay {
              position: fixed;
              inset: 0;
              background: #FAF8F5;
              background: radial-gradient(
                circle at 50% 40%,
                #FFFBF6 0%,
                #F5EFE8 100%
              );
              z-index: 999999;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px;
            }

            .bakery-loader-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              max-width: 360px;
              width: 100%;
            }

            .loader-cake-emblem {
              position: relative;
              margin-bottom: 16px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }

            .loader-cake-icon {
              font-size: 58px;
              filter: drop-shadow(0 8px 18px rgba(225, 29, 72, 0.25));
            }

            .loader-sparkle {
              position: absolute;
              font-size: 20px;
              animation: floatSparkle 2s ease-in-out infinite alternate;
            }

            .spark-1 {
              top: -6px;
              right: -10px;
              animation-delay: 0.3s;
            }

            .spark-2 {
              bottom: 0px;
              left: -12px;
              font-size: 22px;
              animation-delay: 0.7s;
            }

            @keyframes floatSparkle {
              0% {
                transform: translateY(0) scale(0.9);
                opacity: 0.7;
              }
              100% {
                transform: translateY(-6px) scale(1.15);
                opacity: 1;
              }
            }

            .loader-brand-title {
              font-family: var(--font-serif, "Playfair Display", Georgia, serif);
              font-size: 28px;
              font-weight: 800;
              color: #24140B;
              letter-spacing: -0.5px;
              margin-bottom: 2px;
            }

            .loader-brand-subtitle {
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1.2px;
              color: #D97706;
              margin-bottom: 18px;
            }

            .loader-status-text {
              font-size: 13px;
              color: #6B5B52;
              font-weight: 500;
              margin-bottom: 14px;
              min-height: 20px;
            }

            .loader-progress-track {
              width: 100%;
              max-width: 240px;
              height: 5px;
              background: rgba(38, 21, 13, 0.08);
              border-radius: 9999px;
              overflow: hidden;
              box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
            }

            .loader-progress-bar {
              height: 100%;
              background: linear-gradient(
                90deg,
                #FF3366 0%,
                #E11D48 50%,
                #F59E0B 100%
              );
              border-radius: 9999px;
              box-shadow: 0 0 10px rgba(225, 29, 72, 0.5);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
