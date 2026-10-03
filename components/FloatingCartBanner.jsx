"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";
import { CartState } from "@/app/state/atoms/CartState";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCartBanner() {
  const pathname = usePathname();
  const cart = useRecoilValue(CartState);

  // Don't show on checkout page or if cart is empty
  if (pathname === "/Addtocart" || cart.length === 0) {
    return null;
  }

  const totalQuantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="floating-cart-wrapper"
      >
        <Link href="/Addtocart" className="floating-cart-pill">
          <div className="cart-pill-left">
            <span className="cart-pill-count-badge">{totalQuantity}</span>
            <div className="cart-pill-text-info">
              <span className="cart-pill-title">Items in Bag</span>
              <span className="cart-pill-price">₹{totalPrice}</span>
            </div>
          </div>

          <div className="cart-pill-right">
            <span>View Bag & Checkout</span>
            <span className="cart-arrow-icon">→</span>
          </div>
        </Link>

        <style jsx>{`
          .floating-cart-wrapper {
            position: fixed;
            bottom: 74px; /* Above mobile bottom bar */
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            padding: 0 16px;
            z-index: 998;
            pointer-events: none;
          }

          @media (min-width: 769px) {
            .floating-cart-wrapper {
              bottom: 24px;
            }
          }

          .floating-cart-pill {
            pointer-events: auto;
            max-width: 440px;
            width: 100%;
            background: linear-gradient(135deg, #2A170D 0%, #170C06 100%);
            color: white;
            padding: 10px 16px;
            border-radius: var(--radius-full);
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
            box-shadow: 0 14px 34px -4px rgba(28, 14, 8, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.12);
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .floating-cart-pill:hover {
            transform: translateY(-3px) scale(1.01);
            box-shadow: 0 18px 40px -4px rgba(28, 14, 8, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          }

          .floating-cart-pill:active {
            transform: translateY(0) scale(0.98);
          }

          .cart-pill-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .cart-pill-count-badge {
            background: var(--btn-grad-primary);
            color: white;
            font-family: var(--font-display);
            font-size: 13px;
            font-weight: 800;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow: 0 3px 10px rgba(225, 29, 72, 0.45);
          }

          .cart-pill-text-info {
            display: flex;
            flex-direction: column;
            line-height: 1.15;
          }

          .cart-pill-title {
            font-size: 10px;
            color: #D1C2B7;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-weight: 700;
          }

          .cart-pill-price {
            font-family: var(--font-display);
            font-size: 16px;
            font-weight: 800;
            color: var(--brand-gold);
          }

          .cart-pill-right {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: var(--font-display);
            font-size: 13px;
            font-weight: 700;
            color: #FFFFFF;
            background: var(--btn-grad-primary);
            padding: 8px 16px;
            border-radius: var(--radius-full);
            border: 1px solid rgba(255, 255, 255, 0.22);
            box-shadow: 0 4px 14px rgba(225, 29, 72, 0.35);
            transition: all 0.2s ease;
          }

          .cart-arrow-icon {
            font-size: 14px;
            transition: transform 0.2s ease;
          }

          .floating-cart-pill:hover .cart-arrow-icon {
            transform: translateX(4px);
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
